import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerSidebar from "../components/VolunteerSidebar";
import {
  MapPin,
  Clock,
  ClipboardList,
  Package,
  Truck,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { getMyTasksAPI } from "../../sevices/Allapi";

function MyTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [dummyAllDonation, setDummyAllDonations] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const result = await getMyTasksAPI(reqHeader);
      setTasks(result.data);
      setDummyAllDonations(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterDonations = (cat) => {
    if (cat === "All") {
      setTasks(dummyAllDonation);
    } else {
      setTasks(
        dummyAllDonation.filter(
          (donation) =>
            donation?.status?.trim().toLowerCase() ===
            cat.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCFA]">
      <VolunteerSidebar />

      <main className="flex-1 p-4 sm:p-6">
        {/* HEADER */}
        <div className="mb-6 flex items-center gap-3">
          <ClipboardList className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold">My Tasks</h1>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-gray-500" />
          {["All", "Accepted", "Picked", "Delivered"].map((status) => (
            <button
              key={status}
              onClick={() => filterDonations(status)}
              className="px-4 py-2 rounded-full text-sm border bg-white hover:bg-orange-500 hover:text-white transition"
            >
              {status}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 sm:p-5 rounded-xl shadow"
              >
                {/* TITLE + STATUS */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {task.title}
                  </h3>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm text-white
                      ${
                        task.status === "Accepted"
                          ? "bg-blue-600"
                          : task.status === "Picked"
                          ? "bg-orange-600"
                          : task.status === "Delivered"
                          ? "bg-green-700"
                          : ""
                      }`}
                  >
                    {task.status === "Accepted" && (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    {task.status === "Picked" && (
                      <Package className="h-4 w-4" />
                    )}
                    {task.status === "Delivered" && (
                      <Truck className="h-4 w-4" />
                    )}
                    {task.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p><Package className="inline h-4 w-4 mr-1 text-orange-500"/>
                    {task.quantity}</p>

                  <p>
                    <Clock className="inline h-4 w-4 mr-1 text-orange-500" />
                    {task.pickupTime
                      ? new Date(task.pickupTime).toLocaleString("en-IN")
                      : "Pickup time not assigned"}
                  </p>

                  <p className="break-words">
                    <MapPin className="inline h-4 w-4 mr-1 text-green-500" />
                    {task.location}
                  </p>

                  <p className="break-words">
                    <MapPin className="inline h-4 w-4 mr-1 text-red-500" />
                    {task.dropOffLocation || "Drop-off not assigned"}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                {task.status === "Accepted" && (
                  <button
                    onClick={() =>
                      navigate(`/volunteer/pickup/${task._id}`)
                    }
                    className="mt-4 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Mark as Picked
                  </button>
                )}

                {task.status === "Picked" && (
                  <button
                    onClick={() =>
                      navigate(`/volunteer/delivery/${task._id}`)
                    }
                    className="mt-4 w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Complete Delivery
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No tasks found
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyTasks;
