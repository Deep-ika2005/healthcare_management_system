import pool from "../../../lib/db";

export async function GET() {
  try {
    const [rows] = await pool.execute("SELECT 1 + 1 AS result");
    return Response.json({ message: "Database Connected", result: rows[0].result });
  } catch (error) {
    return Response.json({ message: "Database Connection Failed" }, { status: 500 });
  }
}