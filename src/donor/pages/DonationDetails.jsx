import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DonorSidebar from "../components/DonorSidebar";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  CheckCircle,
  Image as ImageIcon,
  Edit,
  XCircle,
} from "lucide-react";
import {
  deleteDonationAPI,
  getADonationAPI,
  updateDonationAPI,
} from "../../sevices/Allapi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState({});

  useEffect(() => {
    fetchDonation();
  }, []);

  const fetchDonation = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { authorization: `Bearer ${token}` };

    try {
      const result = await getADonationAPI(id, reqHeader);
      setDonation(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateDonation = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { authorization: `Bearer ${token}` };

    const reqBody = new FormData();
    for (const key in selectedDonation) {
      reqBody.append(key, selectedDonation[key]);
    }

    try {
      const res = await updateDonationAPI(
        selectedDonation._id,
        reqBody,
        reqHeader
      );
      if (res.status == 200) {
        toast.success("Donation updated successfully");
        setShowEditModal(false);
        setSelectedDonation(null);
        fetchDonation();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDonation = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { authorization: `Bearer ${token}` };

    try {
      const res = await deleteDonationAPI(id, reqHeader);
      if (res.status == 200) {
        toast.success("Deleted Successfully");
        navigate("/donor/history");
      } else {
        toast.error("Deletion Failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      <DonorSidebar />

      <div className="flex-1">
        {/* HEADER */}
        <div className="bg-[#1a1a1a] text-white px-6 py-12 md:px-10">
          <div className="max-w-4xl">
            <Link
              to="/donor/history"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold">
              Donation <span className="text-[#f97316]">Details</span>
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-10 md:px-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* TITLE, STATUS & ACTIONS */}
            <div className="p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{donation.title}</h2>
                  <p className="text-gray-600 mt-2">
                    {donation.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      donation.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    <CheckCircle className="inline w-4 h-4 mr-1" />
                    {donation.status}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDonation(donation);
                        setShowEditModal(true);
                      }}
                      className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full border border-[#f97316] text-[#f97316]"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    {donation.status !== "Delivered" && (
                      <button
                        onClick={() => deleteDonation(donation._id)}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full border border-red-500 text-red-500"
                      >
                        <XCircle className="w-4 h-4" />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="p-6 bg-[#f5f3f0]/50 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* QUANTITY */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-semibold">{donation.quantity}</p>
                </div>
              </div>

              {/* PREPARED ON */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prepared On</p>
                  <p className="font-semibold">
                    {donation.preparedAt
                      ? new Date(donation.preparedAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* DONOR LOCATION */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Donor Location</p>
                  <p className="font-semibold">{donation.location}</p>
                </div>
              </div>

              {/* EXPIRED AT */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expired At</p>
                  <p className="font-semibold">
                    {donation.expiredAt
                      ? new Date(donation.expiredAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGE */}
<div className="p-6 border-t">
  <h3 className="font-bold mb-3">Donation Image</h3>

  <div className="flex justify-center">
    {donation.image ? (
      
      <img
        src={`http://localhost:3000/uploads/${donation.image}`}
        alt="donation"
        className="
          max-w-[540px]
          max-h-[500px]
          w-auto
          h-auto
          rounded-xl
          object-contain
          shadow-sm
        "
      />
    ) : (
      <div className="w-72 h-72 bg-[#f5f3f0] rounded-xl flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
    )}
  </div>
</div>





        {/* MAP */}
<div className="p-6 border-t">
  <h3 className="text-lg font-bold mb-4">Pickup Location</h3>

  <div className="max-w-3xl mx-auto aspect-[16/9] rounded-xl overflow-hidden border">
    <iframe
      title="Pickup Location"
      loading="lazy"
      className="w-full h-full border-0"
      src={`https://www.google.com/maps?q=${encodeURIComponent(
        donation.location
      )}&output=embed`}
    />
  </div>

  <p className="text-sm text-[#6b6b6b] mt-2 text-center">
    {donation.location}
  </p>
</div>


          </div>
        </div>
      </div>

    {showEditModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-xl relative">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowEditModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-[#f97316] mb-6">
        Edit Donation
      </h2>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* FOOD TITLE */}
        <input
          type="text"
          defaultValue={selectedDonation.title}
          placeholder="Food Title"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
          onChange={(e) =>
            setSelectedDonation({
              ...selectedDonation,
              title: e.target.value,
            })
          }
        />

        {/* QUANTITY */}
        <input
          type="text"
          defaultValue={selectedDonation.quantity}
          placeholder="Quantity (e.g. 10 plates)"
          className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
          onChange={(e) =>
            setSelectedDonation({
              ...selectedDonation,
              quantity: e.target.value,
            })
          }
        />

        {/* PREPARED AT */}
        <input
          type="datetime-local"
          defaultValue={
            selectedDonation.preparedAt
              ? selectedDonation.preparedAt.slice(0, 16)
              : ""
          }
          className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
          onChange={(e) =>
            setSelectedDonation({
              ...selectedDonation,
              preparedAt: e.target.value,
            })
          }
        />

        {/* EXPIRED AT */}
        <input
          type="datetime-local"
          defaultValue={
            selectedDonation.expiredAt
              ? selectedDonation.expiredAt.slice(0, 16)
              : ""
          }
          className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
          onChange={(e) =>
            setSelectedDonation({
              ...selectedDonation,
              expiredAt: e.target.value,
            })
          }
        />
      </div>

      {/* LOCATION */}
      <textarea
        defaultValue={selectedDonation.location}
        placeholder="Pickup Location"
        className="border p-2 rounded-lg w-full mt-4 focus:ring-2 focus:ring-orange-400"
        rows="2"
        onChange={(e) =>
          setSelectedDonation({
            ...selectedDonation,
            location: e.target.value,
          })
        }
      />

      {/* DESCRIPTION */}
      <textarea
        defaultValue={selectedDonation.description}
        placeholder="Food Description"
        className="border p-2 rounded-lg w-full mt-4 focus:ring-2 focus:ring-orange-400"
        rows="4"
        onChange={(e) =>
          setSelectedDonation({
            ...selectedDonation,
            description: e.target.value,
          })
        }
      />

      {/* IMAGE */}
      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={(e) =>
          setSelectedDonation({
            ...selectedDonation,
            image: e.target.files[0],
          })
        }
      />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => setShowEditModal(false)}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 rounded-lg bg-[#f97316] hover:bg-[#ea580c] text-white font-medium"
          onClick={updateDonation}
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default DonationDetails;
