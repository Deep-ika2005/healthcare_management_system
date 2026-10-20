import pool from "@/lib/db";
import crypto from "crypto";

export async function POST(req) {
  const connection = await pool.getConnection();

  try {
    const data = await req.json();
    await connection.beginTransaction();

    // 1️⃣ CHECK PATIENT
    const [patients] = await connection.execute(
      "SELECT id FROM patients WHERE aadhaar = ?",
      [data.aadhaar]
    );

    if (patients.length === 0) {
      await connection.rollback();
      return Response.json(
        { message: "Patient not registered" },
        { status: 400 }
      );
    }

    const patientId = patients[0].id;

    // 2️⃣ GENERATE HASH (VERY IMPORTANT)
    const appointmentData = JSON.stringify({
      aadhaar: data.aadhaar,
      patientType: data.patientType,
      department: data.department,
      doctorName: data.doctorName,
      appointmentDate: data.appointmentDate,
      visitReason: data.visitReason,
      fever: data.fever,
      cough: data.cough,
      travelHistory: data.travelHistory,
      chronicDisease: data.chronicDisease,
    });

    const frontendHash = crypto
      .createHash("sha256")
      .update(appointmentData)
      .digest("hex");

    // 3️⃣ INSERT APPOINTMENT
    await connection.execute(
      `INSERT INTO appointments (
        patient_id,
        patient_type,
        department,
        doctor_name,
        appointment_date,
        visit_reason,
        fever,
        cough,
        travel_history,
        chronic_disease,
        frontend_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        patientId,
        data.patientType,
        data.department,
        data.doctorName,
        data.appointmentDate,
        data.visitReason,
        data.fever,
        data.cough,
        data.travelHistory,
        data.chronicDisease,
        frontendHash,
      ]
    );

    // 4️⃣ BLOCKCHAIN SIMULATION
    const [rows] = await connection.execute(
      `SELECT * FROM blockchain ORDER BY block_index DESC LIMIT 1`
    );

    let previousHash = "0";
    let blockIndex = 1;

    if (rows.length > 0) {
      previousHash = rows[0].current_hash;
      blockIndex = rows[0].block_index + 1;
    }

    const timestamp = new Date();

    const blockString =
      blockIndex + timestamp.toISOString() + frontendHash + previousHash;

    const currentHash = crypto
      .createHash("sha256")
      .update(blockString)
      .digest("hex");

    await connection.execute(
      `INSERT INTO blockchain
       (block_index, timestamp, patient_hash, previous_hash, current_hash)
       VALUES (?, ?, ?, ?, ?)`,
      [blockIndex, timestamp, frontendHash, previousHash, currentHash]
    );

    await connection.commit();

    return Response.json({
      message: "Appointment Booked & Stored in Blockchain",
      blockIndex,
      blockchainHash: currentHash,
      appointmentHash: frontendHash,
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  } finally {
    connection.release();
  }
}