"use client";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    aadhaar: "",
    photo: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "aadhaar") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 12) {
        setFormData({ ...formData, aadhaar: numericValue });
      }
      return;
    }

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setMessage("Only JPG or PNG images allowed.");
        e.target.value = "";
        return;
      }

      if (file.size > maxSize) {
        setMessage("File size must be less than 2MB.");
        e.target.value = "";
        return;
      }

      setMessage("");
      setFormData({ ...formData, [name]: file });

    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aadhaarRegex = /^[0-9]{12}$/;

    if (!aadhaarRegex.test(formData.aadhaar)) {
      setMessage("Aadhaar number must be exactly 12 digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">

      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-2xl p-10 w-full max-w-3xl">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Patient Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Basic Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="label">Full Name</label>
                <input
                  name="fullName"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Gender</label>
                <select
                  name="gender"
                  required
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="label">Mobile Number</label>
                <input
                  name="mobile"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Email ID</label>
                <input
                  name="email"
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Address</label>
                <input
                  name="address"
                  required
                  onChange={handleChange}
                  className="input"
                />
              </div>

            </div>
          </div>

          {/* Aadhaar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Aadhaar Information
            </h2>

            <div>
              <label className="label">Aadhaar Number</label>
              <input
                name="aadhaar"
                placeholder="Enter 12 digit Aadhaar"
                value={formData.aadhaar}
                required
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>

          {/* Photo */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Upload Photo
            </h2>

            <div>
              <label className="label">Patient Photo</label>
              <input
                type="file"
                name="photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="fileInput"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:scale-105 transition"
          >
            {loading ? "Registering..." : "Register Patient"}
          </button>

        </form>

        {message && (
          <p
            className={`mt-6 text-center font-semibold ${
              message.includes("Successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      <style jsx>{`
        .label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #374151;
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 10px;
          border-radius: 8px;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }

        .fileInput {
          border: 1px dashed #9ca3af;
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          background: white;
        }
      `}</style>

    </div>
  );
}