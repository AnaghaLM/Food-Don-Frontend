import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { UserCheck, UserX, Trash2 } from "lucide-react";
import {
  getVolunteersAPI,
  updateVolunteerStatusAPI,
  deleteVolunteerAPI,
} from "../../sevices/Allapi";
import { toast } from "react-toastify";

export default function ManageVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH VOLUNTEERS ================= */
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const reqHeader = { authorization: `Bearer ${token}` };

      const res = await getVolunteersAPI(reqHeader);
      setVolunteers(res.data);
    } catch (err) {
      toast.error("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE STATUS ================= */
  const handleStatusChange = async (id, status) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { authorization: `Bearer ${token}` };

      await updateVolunteerStatusAPI(id, { status }, reqHeader);
      toast.success(`Volunteer ${status}`);
      fetchVolunteers();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = { authorization: `Bearer ${token}` };

      await deleteVolunteerAPI(id, reqHeader);
      toast.success("Volunteer deleted");
      fetchVolunteers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  /* ================= STATUS BADGE ================= */
  const getStatusBadge = (status) => {
    if (status === "Approved")
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          Approved
        </span>
      );
    if (status === "Pending")
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          Pending
        </span>
      );
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        Rejected
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f0]">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8">
        {/* HEADER */}
        <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Manage Volunteers
          </h1>
          <p className="text-white/70 mt-1">
            Approve or reject volunteers
          </p>
        </div>

        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden space-y-4">
          {!loading &&
            volunteers.map((v) => (
              <div
                key={v._id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{v.username}</h3>
                    <p className="text-sm text-gray-500">
                      {v.email}
                    </p>
                  </div>
                  {getStatusBadge(v.userstatus)}
                </div>

                <p className="text-sm text-gray-600">
                  📞 {v.phone || "-"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {v.userstatus === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(v._id, "Approved")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <UserCheck size={14} /> Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(v._id, "Rejected")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                      >
                        <UserX size={14} /> Reject
                      </button>
                    </>
                  )}

                  {v.userstatus === "Approved" && (
                    <button
                      onClick={() =>
                        handleStatusChange(v._id, "Rejected")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  )}

                  {v.userstatus === "Rejected" && (
                    <button
                      onClick={() =>
                        handleStatusChange(v._id, "Approved")
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Re-Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#1a1a1a] text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                volunteers.map((v) => (
                  <tr
                    key={v._id}
                    className="border-b hover:bg-orange-50"
                  >
                    <td className="py-3 px-4 font-medium">
                      {v.username}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {v.email}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {v.phone || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(v.userstatus)}
                    </td>

                    <td className="py-3 px-4 flex justify-center gap-2">
                      {v.userstatus === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(
                                v._id,
                                "Approved"
                              )
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
                          >
                            <UserCheck size={16} /> Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusChange(
                                v._id,
                                "Rejected"
                              )
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1"
                          >
                            <UserX size={16} /> Reject
                          </button>
                        </>
                      )}

                      {v.userstatus !== "Pending" && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              v._id,
                              v.userstatus === "Approved"
                                ? "Rejected"
                                : "Approved"
                            )
                          }
                          className={`px-3 py-1 rounded text-white ${
                            v.userstatus === "Approved"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {v.userstatus === "Approved"
                            ? "Reject"
                            : "Re-Approve"}
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(v._id)}
                        className="bg-gray-800 text-white px-3 py-1 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY / LOADING */}
        {loading && (
          <p className="mt-6 text-center text-gray-500">
            Loading...
          </p>
        )}

        {!loading && volunteers.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No volunteers found
          </p>
        )}
      </main>
    </div>
  );
}
