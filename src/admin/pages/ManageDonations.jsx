import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Eye, Save } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getAllAdminDonationsAPI,
  setDropOffLocationAPI,
} from "../../sevices/Allapi";
import { toast } from "react-toastify";

export default function ManageDonations() {
  const [donations, setDonations] = useState([]);
  const [dropOffInputs, setDropOffInputs] = useState({});
  console.log(donations)

 
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      const res = await getAllAdminDonationsAPI(reqHeader);
      setDonations(res.data);
    } catch (err) {
      toast.error("Failed to load donations");
    }
  };


  const handleSaveDropOff = async (id, status) => {
    if (status !== "Available") return;

    const dropOffLocation = dropOffInputs[id];

    if (!dropOffLocation || !dropOffLocation.trim()) {
      toast.warning("Enter drop-off location");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      await setDropOffLocationAPI(
        id,
        { dropOffLocation },
        reqHeader
      );

      toast.success("Drop-off location saved");
      fetchDonations();
      setDropOffInputs("");
    } catch (error) {
      toast.error("Failed to save drop-off location");
    }
  };

  
  const getStatusBadge = (status) => {
    switch (status) {
      case "Available":
        return "bg-amber-100 text-amber-700";
      case "Accepted":
        return "bg-blue-100 text-blue-700";
      case "Picked":
        return "bg-green-100 text-green-700";
      case "Delivered":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f0]">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Manage Donations
        </h1>

       
        <div className="md:hidden space-y-4">
          {donations.map((d) => {
            const isAvailable = d.status === "Available";

            return (
              <div
                key={d._id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{d.title}</h3>
                    <p className="text-sm text-gray-500">
                      {d.userMail
 || "—"}

                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      d.status
                    )}`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="text-sm">
                  <span className="font-medium">Quantity:</span>{" "}
                  {d.quantity}
                </p>

                <textarea
                  rows={2}
                  placeholder="Enter drop-off location"
                  value={
                    dropOffInputs[d._id] ??
                    d.dropOffLocation ??
                    ""
                  }
                  onChange={(e) =>
                    setDropOffInputs({
                      ...dropOffInputs,
                      [d._id]: e.target.value,
                    })
                  }
                  disabled={!isAvailable}
                  className={`w-full border rounded-lg px-3 py-2 text-sm resize-none ${
                    !isAvailable
                      ? "bg-gray-100 cursor-not-allowed"
                      : "focus:ring-2 focus:ring-orange-400"
                  }`}
                />

                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      handleSaveDropOff(d._id, d.status)
                    }
                    disabled={!isAvailable}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${
                      isAvailable
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Save size={14} />
                    Save
                  </button>

                  <Link to={`/admin/donations/${d._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                      <Eye size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

     
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-[900px] w-full bg-white rounded-xl shadow">
            <thead className="bg-[#1a1a1a] text-white">
              <tr>
                <th className="p-3 text-left">Food</th>
                <th className="p-3 text-left">Donor</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Drop-off Location</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">View</th>
              </tr>
            </thead>

            <tbody>
              {donations.map((d) => {
                const isAvailable = d.status === "Available";

                return (
                  <tr
                    key={d._id}
                    className="border-b hover:bg-orange-50 align-top"
                  >
                    <td className="p-3">{d.title}</td>
                  <td className="p-3">
  {d.userMail || "—"}
</td>
                    <td className="p-3">{d.quantity}</td>

                    <td className="p-3">
                      <textarea
                        rows={2}
                        value={
                          dropOffInputs[d._id] ??
                          d.dropOffLocation ??
                          ""
                        }
                        onChange={(e) =>
                          setDropOffInputs({
                            ...dropOffInputs,
                            [d._id]: e.target.value,
                          })
                        }
                        disabled={!isAvailable}
                        className={`w-full border rounded-lg px-2 py-2 text-sm resize-none ${
                          !isAvailable
                            ? "bg-gray-100 cursor-not-allowed"
                            : "focus:ring-2 focus:ring-orange-400"
                        }`}
                      />

                      <button
                        onClick={() =>
                          handleSaveDropOff(d._id, d.status)
                        }
                        disabled={!isAvailable}
                        className={`mt-2 flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                          isAvailable
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <Save size={14} />
                        Save
                      </button>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          d.status
                        )}`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td className="p-3 text-center">
                      <Link to={`/admin/donations/${d._id}`}>
                        <button className="bg-blue-500 text-white px-3 py-2 rounded-lg">
                          <Eye size={16} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {donations.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No donations found
          </p>
        )}
      </main>
    </div>
  );
}
