import DonorSidebar from "../components/DonorSidebar";
import { Link } from "react-router-dom";
import { Plus, Package, CheckCircle } from "lucide-react";
import { getDashBoardFoodAPI } from "../../sevices/Allapi";
import { useState } from "react";
import { useEffect } from "react";

export default function DonorDashboard() {



  useEffect(() => {
   
  getDashBoardFoods()
  }, [])
  
  const [dashboardFood,setDashboardFood]=useState([])

  console.log(dashboardFood)

  const getDashBoardFoods = async () => {

     const token = sessionStorage.getItem("token");

      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
    try {
      const res = await getDashBoardFoodAPI(reqHeader)
      setDashboardFood(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }


  

  const totalDonations =dashboardFood.length;
  const availableCount = dashboardFood.filter(d => d.status === "Available").length;
  const deliveredCount =dashboardFood.filter(d => d.status === "Delivered").length;

  return (
    <div className="min-h-screen flex w-full bg-[#FDFCFA] text-[#1a1a1a] ">
      <DonorSidebar />

      <main className="flex-1 p-6 md:p-10">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold ">
              Donor Dashboard
            </h1>
            <p className="text-[#6b6b6b] mt-1">
              Manage your donations and track their progress.
            </p>
          </div>

          <Link
            to="/donor/create-donation"
            className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-3 rounded-full shadow-lg transition-all font-medium"
          >
            <Plus className="h-5 w-5" />
            Create Donation
          </Link>
        </div>

        {/* SUMMARY — DonationDetails STYLE */}
        <div className="mb-8 bg-[#f5f3f0]/50 p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* TOTAL */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Donations</p>
              <p className="font-semibold text-lg">{totalDonations}</p>
            </div>
          </div>

          {/* AVAILABLE */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="font-semibold text-lg">{availableCount}</p>
            </div>
          </div>

          {/* DELIVERED */}
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="font-semibold text-lg">{deliveredCount}</p>
            </div>
          </div>

        </div>

        {/* RECENT DONATIONS HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold">
            Recent Donations
          </h3>
          <Link
            to="/donor/history"
            className="text-sm font-medium text-[#f97316] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* CARDS — MA’AM STYLE LOGIC */}
        <div className="grid gap-4">
          {dashboardFood.length > 0 ? (

            dashboardFood.map((donation) => (

              <div
                
                className="bg-white border border-[#f5f3f0] rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <div className="md:flex">

                  <img
                    src={`http://localhost:3000/uploads/${donation.image}`}

                     
                    alt="food"
                    className="w-full md:w-48 h-40 object-cover"
                  />

                  <div className="p-4 flex-1">
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold">
                      {donation.title}
                    </h3>

                    <p className="text-sm text-[#6b6b6b] mt-1">
                      Quantity: {donation.quantity}
                    </p>

                    <p className="text-sm text-[#6b6b6b] mt-1">
                      Pickup: {donation.location}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${
                          donation.status === "pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : donation.status === "delivered"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
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
              </div>

            ))

          ) : (
            <p className="text-center text-[#6b6b6b] bg-white p-10 rounded-2xl border">
              No donations yet.
            </p>
          )}
        </div>

      </main>
    </div>
  );
}
