"use client";
import { useState } from "react";

export default function Appointment() {
  const [formData, setFormData] = useState({
    aadhaar: "",
    patientType: "OPD",
    department: "Cardiology",
    doctorName: "",
    appointmentDate: "",
    visitReason: "",
    fever: "No",
    cough: "No",
    travelHistory: "",
    chronicDisease: "None",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.aadhaar ||
      !formData.doctorName ||
      !formData.appointmentDate ||
      !formData.visitReason
    ) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    const response = await fetch("/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setMessage(result.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Book Patient Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Aadhaar */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Patient Identification
            </h2>

            <label className="block text-sm font-medium text-gray-600 mb-1">
              Aadhaar Number
            </label>

            <input
              name="aadhaar"
              placeholder="Enter Aadhaar Number"
              required
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Hospital Details */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Hospital Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="label">Patient Type</label>
                <select
                  name="patientType"
                  onChange={handleChange}
                  className="input"
                >
                  <option>OPD</option>
                  <option>IPD</option>
                  <option>Emergency</option>
                  <option>Regular Checkup</option>
                </select>
              </div>

              <div>
                <label className="label">Department</label>
                <select
                  name="department"
                  onChange={handleChange}
                  className="input"
                >
                  <option>Cardiology</option>
                  <option>General Medicine</option>
                  <option>Orthopedics</option>
                  <option>Neurology</option>
                  <option>Pediatrics</option>
                  <option>Gynecology</option>
                  <option>ENT</option>
                  <option>Dermatology</option>
                  <option>Psychiatry</option>
                </select>
              </div>

              <div>
                <label className="label">Doctor Name</label>
                <input
                  name="doctorName"
                  placeholder="Doctor Name"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Appointment Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

            </div>

            <div className="mt-5">
              <label className="label">Visit Reason</label>
              <input
                name="visitReason"
                placeholder="Reason for Visit"
                required
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>

          {/* Health Declaration */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Health Declaration
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="label">Fever</label>
                <select
                  name="fever"
                  onChange={handleChange}
                  className="input"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

              <div>
                <label className="label">Cough</label>
                <select
                  name="cough"
                  onChange={handleChange}
                  className="input"
                >
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>

            </div>

            <div className="mt-5">
              <label className="label">Travel History</label>
              <input
                name="travelHistory"
                placeholder="Recent Travel History"
                onChange={handleChange}
                className="input w-full"
              />
            </div>

            <div className="mt-5">
              <label className="label">Chronic Disease</label>
              <select
                name="chronicDisease"
                onChange={handleChange}
                className="input w-full"
              >
                <option>None</option>
                <option>Diabetes</option>
                <option>BP</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>

        </form>

        {message && (
          <p className="text-center mt-5 text-red-600 font-semibold">
            {message}
          </p>
        )}

      </div>

      <style jsx>{`
        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 4px;
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 8px 10px;
          border-radius: 6px;
          outline: none;
        }

        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>

    </div>
  );
}  7