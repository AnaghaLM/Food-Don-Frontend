import React, { useState } from "react";
import DonorSidebar from "../components/DonorSidebar";
import { addDonationAPI } from "../../sevices/Allapi";
import { toast } from "react-toastify";

function CreateDonation() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    preparedAt: "",
    expiredAt: "",
    image: null,
    location: "",
  });

  const [preview, setPreview] = useState("");

  const handleAddDonation = async () => {
    const {
      title,
      description,
      quantity,
      preparedAt,
      expiredAt,
      image,
      location,
    } = formData;

    if (
      !title ||
      !description ||
      !quantity ||
      !preparedAt ||
      !expiredAt ||
      !image ||
      !location
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData();
    reqBody.append("title", title);
    reqBody.append("description", description);
    reqBody.append("quantity", quantity);
    reqBody.append("preparedAt", preparedAt);
    reqBody.append("expiredAt", expiredAt);
    reqBody.append("image", image);
    reqBody.append("location", location);

    try {
      const result = await addDonationAPI(reqBody, reqHeader);

      if (result.status === 200) {
        toast.success("Donation added successfully");

        setFormData({
          title: "",
          description: "",
          quantity: "",
          preparedAt: "",
          expiredAt: "",
          image: null,
          location: "",
        });

        setPreview("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };



  const formatAMPM = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};


  return (
    <div className="flex min-h-screen relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/veg.jpg')" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10"></div>

      <DonorSidebar />

      <div className="relative flex-1 p-6">
        <div className="bg-orange-500 text-white p-6 rounded-b-3xl mb-6 shadow-lg">
          <h1 className="text-3xl font-bold">Create Donation</h1>
        </div>

        <div className="bg-white/90 backdrop-blur shadow-xl p-6 rounded-xl max-w-lg mx-auto border border-white/40">

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mb-4 w-full border rounded p-2"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mb-4 w-full border rounded p-2"
          />

          {/* Quantity */}
          <input
            type="text"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            className="mb-4 w-full border rounded p-2"
          />

          {/* Location */}
          <textarea
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="mb-4 w-full border rounded p-2"
          />

      <input
  type="datetime-local"
  value={formData.preparedAt}
  onChange={(e) =>
    setFormData({ ...formData, preparedAt: e.target.value })
  }
  className="mb-1 w-full border rounded p-2"
/>

{formData.preparedAt && (
  <p className="text-sm text-gray-600 mb-4">
    Selected: {formatAMPM(formData.preparedAt)}
  </p>
)}


         <input
  type="datetime-local"
  value={formData.expiredAt}
  onChange={(e) =>
    setFormData({ ...formData, expiredAt: e.target.value })
  }
  className="mb-1 w-full border rounded p-2"
/>

{formData.expiredAt && (
  <p className="text-sm text-gray-600 mb-4">
    Selected: {formatAMPM(formData.expiredAt)}
  </p>
)}


          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.files[0] });
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="mb-4 w-full"
          />
{preview && (
  <div className="flex justify-center">
    <img
      src={preview}
      alt="preview"
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
  </div>
)}

          <button
            onClick={handleAddDonation}
            className=" mt-2 bg-orange-600 text-white p-3 rounded w-full font-semibold"
          >
            Submit Donation
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDonation;
