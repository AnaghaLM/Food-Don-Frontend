import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerSidebar from "../components/VolunteerSidebar";
import { Upload, Image as ImageIcon } from "lucide-react";
import { markAsPickedAPI } from "../../sevices/Allapi";
import { getSinglePickupDonationAPI } from "../../sevices/Allapi";


export default function PickUpConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [donation, setDonation] = useState(null);

  const [pickupImage, setPickupImage] = useState(null);
  const [preview, setPreview] = useState("");




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


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPickupImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ CORRECT PICKUP LOGIC
  const handleConfirmPickup = async () => {
    if (!pickupImage) return;

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      // 🔹 Update status → Picked
      await markAsPickedAPI(id, reqHeader);

      // 🔹 Go to delivery page
      navigate(`/volunteer/delivery/${id}`);
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
          <h1 className="text-2xl font-bold">Pickup Confirmation</h1>
          <p className="text-gray-600">
            Upload pickup proof before confirming
          </p>
        </div>

       {donation && (
  <div className="bg-white p-6 rounded-2xl shadow mb-6">
    <p>
      <strong>Donor:</strong> {donation.userMail}
    </p>
    <p>
      <strong>Pickup Address:</strong> {donation.location}
    </p>
    <p className="text-sm text-gray-500 mt-2">
      Verify quantity and upload pickup image.
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
            id="pickupImage"
          />

          {!preview ? (
            <label
              htmlFor="pickupImage"
              className="cursor-pointer flex flex-col items-center gap-2 text-gray-500"
            >
              <Upload className="h-8 w-8" />
              <span>Click to upload or take photo</span>
            </label>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <img
                src={preview}
                alt="Pickup Preview"
                className="w-48 h-48 object-cover rounded-xl"
              />
              <label
                htmlFor="pickupImage"
                className="text-orange-500 cursor-pointer flex items-center gap-1"
              >
                <ImageIcon className="h-4 w-4" />
                Change Image
              </label>
            </div>
          )}
        </div>

        <button
          onClick={handleConfirmPickup}
          disabled={!pickupImage}
          className="bg-green-500 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          Confirm Pickup
        </button>
      </main>
    </div>
  );
}
