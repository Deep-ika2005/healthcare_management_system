import pool from "../../../lib/db";
export async function POST(req) {
  const connection = await pool.getConnection();

  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const dob = formData.get("dob");
    const gender = formData.get("gender");
    const mobile = formData.get("mobile");
    const email = formData.get("email");
    const address = formData.get("address");
    const aadhaar = formData.get("aadhaar");
    const photo = formData.get("photo");

    // Aadhaar validation
    const aadhaarRegex = /^[0-9]{12}$/;

    if (!aadhaarRegex.test(aadhaar)) {
      return Response.json(
        { message: "Invalid Aadhaar Number (Must be 12 digits)" },
        { status: 400 }
      );
    }

    // Photo upload
    let photoBase64 = "";

    if (photo) {
      const photoBuffer = Buffer.from(await photo.arrayBuffer());
      photoBase64 = photoBuffer.toString("base64");
    }

    // Insert into database
    await connection.execute(
      `INSERT INTO patients (
        full_name,
        dob,
        gender,
        mobile,
        email,
        address,
        aadhaar,
        photo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        dob,
        gender,
        mobile,
        email,
        address,
        aadhaar,
        photoBase64,
      ]
    );

    return Response.json({
      message: "Patient Registered Successfully",
    });

  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return Response.json(
        { message: "Duplicate Aadhaar! Already Registered." },
        { status: 400 }
      );
    }

    console.error(err);
    return Response.json(
      { message: "Server Error" },
      { status: 500 }
    );

  } finally {
    connection.release();
  }
}