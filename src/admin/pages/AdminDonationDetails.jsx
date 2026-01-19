import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import {
  getAdminDonationDetailsAPI,
  getSingleDonorAdminAPI,
} from "../../sevices/Allapi";
import { toast } from "react-toastify";
import {
  Package,
  MapPin,
  User,
  Phone,
  Truck,
  Calendar,
  Layers,
} from "lucide-react";

export default function AdminDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donation, setDonation] = useState({});
  const [donor, setDonor] = useState({});

  useEffect(() => {
    fetchDonationDetails();
  }, []);

  useEffect(() => {
    if (donation.userMail) {
      getSingleDonor();
    }
  }, [donation]);

  const fetchDonationDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };

      const res = await getAdminDonationDetailsAPI(id, reqHeader);
      setDonation(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load donation details");
    }
  };

  const getSingleDonor = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const reqBody = donation.userMail;
      const res = await getSingleDonorAdminAPI(reqBody, reqHeader);
      setDonor(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f5f3f0]">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-orange-500 font-medium hover:underline"
        >
          ← Back
        </button>

        {donation && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow overflow-hidden">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6 sm:p-8 border-b">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {donation.title}
                </h1>
                <p className="text-gray-500 mt-1">
                  {donation.foodType || "Food Donation"}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`self-start sm:self-auto px-4 py-1 rounded-full text-sm font-medium ${
                  donation.status === "Available"
                    ? "bg-amber-100 text-amber-700"
                    : donation.status === "Accepted"
                    ? "bg-blue-100 text-blue-700"
                    : donation.status === "Picked"
                    ? "bg-green-100 text-green-700"
                    : donation.status === "Delivered"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {donation.status}
              </span>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 bg-[#fffaf5]">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                  <Layers className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Quantity</p>
                  <p className="font-semibold">{donation.quantity}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                  <Calendar className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Prepared On</p>
                  <p className="font-semibold">
                    {donation.preparedAt
                      ? new Date(donation.preparedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                  <MapPin className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Pickup Location</p>
                  <p className="font-semibold break-words">
                    {donation.location}
                  </p>
                </div>
              </div>
            </div>

            {/* DONOR DETAILS */}
            <div className="p-6 sm:p-8 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Donor Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <User className="text-orange-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Donor</p>
                    <p className="font-medium">
                      {donor?.username || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-orange-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Donor Phone</p>
                    <p className="font-medium">
                      {donor?.phone || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ASSIGNED VOLUNTEER */}
            {donation?.assignedVolunteer && (
              <div className="p-6 sm:p-8 border-t bg-gray-50">
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Truck className="text-orange-500" size={20} />
                  Assigned Volunteer
                </h2>

                <p className="break-words">
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">
                    {donation.assignedVolunteer}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
