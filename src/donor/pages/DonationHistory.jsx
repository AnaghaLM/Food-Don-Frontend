import React, { useEffect, useState } from "react";
import DonorSidebar from "../components/DonorSidebar";
import { Clock, CheckCircle, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllDonationsAPI } from "../../sevices/Allapi";
import {  Utensils } from "lucide-react";

function DonationHistory() {

  
  const [donations, setDonations] = useState([]);


  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      const result = await getAllDonationsAPI(reqHeader);
      console.log(result)
      setDonations(result.data)




      

    } catch (err) {
      console.log("Donation fetch error:", err);
      setDonations([]);
    }
  };

  // ---------------- DERIVED DATA ----------------
  const deliveredCount = donations.filter(d => d.status === "Delivered").length;
  const availableCount = donations.filter(d => d.status === "Available").length;

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      <DonorSidebar />

      <div className="flex-1">

        {/* HEADER */}
        <div className="bg-[#1a1a1a] text-white px-6 py-12 md:px-10">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#f97316]/20 text-[#f97316] text-sm font-medium mb-4">
              Your Contributions
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Donation <span className="text-[#f97316]">History</span>
            </h1>
            <p className="text-white/70 max-w-xl">
              Track all your past donations and their current status.
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="bg-[#f5f3f0] px-6 py-8 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f97316]">
                {donations.length}
              </div>
              <div className="text-sm text-[#6b6b6b]">Total Donations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#22c55e]">
                {deliveredCount}
              </div>
              <div className="text-sm text-[#6b6b6b]">Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#eab308]">
                {availableCount}
              </div>
              <div className="text-sm text-[#6b6b6b]">Available</div>
            </div>
          </div>
        </div>

        {/* DONATION CARDS */}
        <div className="px-6 py-10 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">

            {donations.length > 0 ? (
              donations.map((donation) => (
                <div
                  key={donation._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
                >

                  {/* IMAGE / ICON */}
                  <div className="h-44 bg-[#f5f3f0] overflow-hidden">

                    {donation.image ? (
                      <img
                        src={`http://localhost:3000/uploads/${donation.image}`}
                        alt="donation"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-[#f97316]/40" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <h2 className="font-bold text-lg text-[#1a1a1a] mb-1">
                      {donation.title}
                    </h2>

                    <p className="text-[#6b6b6b] text-sm mb-2 flex items-center gap-2">
  <Utensils className="w-4 h-4 text-[#f97316]" />
  <span className="font-medium text-[#1a1a1a]">
    {donation.quantity}
  </span>
</p>

                   <p className="text-[#6b6b6b] text-sm flex items-center gap-2">
  <Clock className="w-4 h-4 text-[#f97316]" />
  <span>
   
    {donation.preparedAt
      ? new Date(donation.preparedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })
      : "N/A"}
  </span>
</p>


                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                          donation.status === "Delivered"
                            ? "bg-[#22c55e]/10 text-[#22c55e]"
                            : donation.status === "Picked"
                            ? "bg-blue-500/10 text-blue-500"
                            : donation.status === "Expired"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-[#eab308]/10 text-[#eab308]"
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {donation.status}
                      </span>

                      <Link to={`/donor/donation/${donation._id}`}>
                        <button className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]">
                          View details 
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No donations found</p>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default DonationHistory;
