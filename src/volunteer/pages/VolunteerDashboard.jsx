import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VolunteerSidebar from "../components/VolunteerSidebar";
import {
  ClipboardList,
  Package,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { getRecentFoodAPI } from "../../sevices/Allapi";

export default function VolunteerDashboard() {
  const [recentFood, setRecentFood] = useState([]);

  // 🔐 Logged-in volunteer
  const user = JSON.parse(sessionStorage.getItem("users"));

  /* ================= FETCH RECENT TASKS ================= */
  useEffect(() => {
    if (user?.userstatus === "Approved") {
      fetchRecentTasks();
    } else {
      // clear data if user is not approved
      setRecentFood([]);
    }
  }, [user?.userstatus]);

  const fetchRecentTasks = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const res = await getRecentFoodAPI(reqHeader);
      setRecentFood(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      {/* SIDEBAR ALWAYS VISIBLE */}
      <VolunteerSidebar />

      <main className="flex-1 p-6 min-h-screen">
        {/* ================= NOT LOGGED IN ================= */}
        {!user && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-600">Please login again</p>
          </div>
        )}

        {/* ================= PENDING ================= */}
        {user?.userstatus === "Pending" && (
          <div className="h-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
              <h2 className="text-xl font-bold text-orange-600 mb-2">
                Waiting for Approval ⏳
              </h2>
              <p className="text-gray-600">
                Your volunteer account is under review by the admin.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                You can browse available donations, but actions are disabled.
              </p>
            </div>
          </div>
        )}

        {/* ================= REJECTED ================= */}
        {user?.userstatus === "Rejected" && (
          <div className="h-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
              <h2 className="text-xl font-bold text-red-600 mb-2">
                Account Rejected 🚫
              </h2>
              <p className="text-gray-600">
                Your account has been rejected by the admin.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                Please contact support for more details.
              </p>
            </div>
          </div>
        )}

        {/* ================= APPROVED DASHBOARD ================= */}
        {user?.userstatus === "Approved" && (
          <>
            {/* HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold">
                  Volunteer Dashboard
                </h1>
              </div>
              <p className="text-gray-600 ml-14">
                View your assigned food pickups and deliveries
              </p>
            </div>

            {/* TASK HEADER */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Tasks</h2>

              <Link
                to="/volunteer/available"
                className="text-orange-500 text-sm font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* TASK LIST */}
            <div className="space-y-5">
              {recentFood?.length > 0 ? (
                recentFood.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                      {/* LEFT */}
                      <div className="flex items-start gap-5">
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <Package className="h-6 w-6 text-orange-500" />
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">
                            {task.title}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {task.userMail}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-orange-400" />
                              {task.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-orange-400" />
                              {task.preparedAt?.split("T")[0]}
                            </span>

                            <span className="flex items-center gap-1">
                              <Package className="h-4 w-4 text-orange-400" />
                              {task.quantity}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div>
                        <span
                          className={`font-semibold text-sm
                            ${
                              task.status === "Accepted"
                                ? "text-blue-600"
                                : task.status === "Picked"
                                ? "text-orange-600"
                                : task.status === "Delivered"
                                ? "text-green-600"
                                : "text-gray-600"
                            }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No tasks assigned yet
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
