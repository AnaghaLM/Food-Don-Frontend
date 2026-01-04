import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerSidebar from "../components/VolunteerSidebar";
import { Upload, Image as ImageIcon } from "lucide-react";
import {
  markAsDeliveredAPI,
  getSinglePickupDonationAPI,
} from "../../sevices/Allapi";

export default function DeliveryConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [donation, setDonation] = useState(null);
  const [deliveryImage, setDeliveryImage] = useState(null);
  const [preview, setPreview] = useState("");

  /* ===== FETCH DONATION ===== */
  useEffect(() => {
    fetchDonation();
  }, []);

  const fetchDonation = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const result = await getSinglePickupDonationAPI(id, reqHeader);
      setDonation(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ===== IMAGE HANDLER ===== */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDeliveryImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ===== CONFIRM DELIVERY ===== */
  const handleConfirmDelivery = async () => {
    if (!deliveryImage) return;

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      await markAsDeliveredAPI(id, reqHeader);

      // redirect after completion
      navigate("/volunteer/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      <VolunteerSidebar />

      <main className="flex-1 p-6 min-h-screen">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Delivery Confirmation</h1>
          <p className="text-gray-600">
            Upload delivery proof to complete the task
          </p>
        </div>

        {/* DELIVERY DETAILS */}
        {donation && (
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <p>
              <strong>Drop-off Location:</strong>{" "}
              {donation.dropOffLocation || "Not assigned"}
            </p>

            <p>
              <strong>Delivered From:</strong>{donation.useMail},{donation.location}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Capture a clear photo of delivered food.
            </p>
          </div>
        )}

        {/* IMAGE UPLOAD */}
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="deliveryImage"
          />

          {!preview ? (
            <label
              htmlFor="deliveryImage"
              className="cursor-pointer flex flex-col items-center gap-2 text-gray-500"
            >
              <Upload className="h-8 w-8" />
              <span>Click to upload or take photo</span>
            </label>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={preview}
                alt="Delivery Preview"
                className="w-48 h-48 object-cover rounded-xl"
              />
              <label
                htmlFor="deliveryImage"
                className="text-orange-500 cursor-pointer flex items-center gap-1"
              >
                <ImageIcon className="h-4 w-4" />
                Change Image
              </label>
            </div>
          )}
        </div>

        <button
          onClick={handleConfirmDelivery}
          disabled={!deliveryImage}
          className="bg-green-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          Confirm Delivery
        </button>
      </main>
    </div>
  );
}
