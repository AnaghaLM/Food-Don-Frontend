import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerSidebar from "../components/VolunteerSidebar";
import {
  Package,
  MapPin,
  Clock,
  Utensils,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import {
  getAvailableDonationsAPI,
  acceptDonationAPI,
} from "../../sevices/Allapi";

function AvailableDonations() {
  const navigate = useNavigate();

  /* ===== STATES ===== */
  const [searchKey, setSearchKey] = useState("");
  const [allDonations, setAllDonations] = useState([]);


  const user = JSON.parse(sessionStorage.getItem("users"));


  useEffect(() => {
    fetchAvailableDonations();
  }, [searchKey]);

  const fetchAvailableDonations = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const result = await getAvailableDonationsAPI(searchKey, reqHeader);
      setAllDonations(result.data);
    } catch (err) {
      console.error(err);
    }
  };

 
  const handleAcceptDonation = async (donationId) => {
    // 🔴 GUARD: only approved can accept
    if (user?.userstatus !== "Approved") {
      alert("Your account is not approved yet");
      return;
    }

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      await acceptDonationAPI(donationId, reqHeader);
      fetchAvailableDonations();
      navigate("/volunteer/tasks");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <VolunteerSidebar />

      <main className="flex-1 p-6 bg-[#fafafa] min-h-screen">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Available <span className="text-orange-500">Donations</span>
          </h1>
          <p className="text-gray-600">
            Find nearby food donations
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </div>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white">
            <Filter className="h-5 w-5" />
            Filter
          </button>
        </div>

        {/* DONATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDonations?.length > 0 ? (
            allDonations.map((donation) => {
              const hoursLeft =
                (new Date(donation.expiredAt) - new Date()) / 3600000;

              return (
                <div
                  key={donation._id}
                  className="bg-white p-5 rounded-xl shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-500 p-2 rounded-lg">
                      <Utensils className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold">{donation.title}</h3>
                  </div>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p><Package className="inline h-4 w-4" /> {donation.quantity}</p>
                    <p><MapPin className="inline h-4 w-4" /> {donation.location}</p>
                    <p><MapPin className="inline h-4 w-4" /> {donation.dropOffLocation}</p>
                    <p><Clock className="inline h-4 w-4" /> Expires in {Math.ceil(hoursLeft)} hrs</p>
                  </div>

                  {/* 🔑 BUTTON LOGIC */}
                  <button
                    onClick={() => handleAcceptDonation(donation._id)}
                    disabled={user?.userstatus !== "Approved"}
                    className={`mt-4 w-full py-3 rounded-xl flex items-center justify-center gap-2
                      ${
                        user?.userstatus === "Approved"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                  >
                    Accept Donation
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No donations found
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AvailableDonations;
