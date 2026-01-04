import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingHeart,
  faUsers,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { getAllAdminDonationsAPI } from "../../sevices/Allapi";

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { authorization: `Bearer ${token}` };

    const res = await getAllAdminDonationsAPI(reqHeader);
    setDonations(res.data);
  };

  
  const monthMap = {};

  donations.forEach((d) => {
    const date = new Date(d.preparedAt || d.createdAt);
    const month = date.toLocaleString("default", { month: "short" });

    if (!monthMap[month]) {
      monthMap[month] = { month, donations: 0, delivered: 0 };
    }

    monthMap[month].donations += 1;
    if (d.status === "Delivered") {
      monthMap[month].delivered += 1;
    }
  });

  const donationData = Object.values(monthMap);

  
  const statusCount = {
    Available: 0,
    Accepted: 0,
    Picked: 0,
    Delivered: 0,
  };

  donations.forEach((d) => {
    if (statusCount[d.status] !== undefined) {
      statusCount[d.status] += 1;
    }
  });

  const deliveryStatusData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#8b5cf6"];

  return (
    <div className="min-h-screen flex bg-[#f5f3f0]">
      <AdminSidebar />

      <main className="flex-1 p-6 md:p-8">
      
        <div className="bg-[#1a1a1a] text-white p-6 rounded-2xl mb-10 shadow-xl">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-white/70 mt-2">
            Donation & delivery overview
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <StatCard
            icon={faHandHoldingHeart}
            color="bg-orange-500"
            label="Total Donations"
            value={donations.length}
          />

          <StatCard
            icon={faTruckFast}
            color="bg-green-500"
            label="Delivered"
            value={statusCount.Delivered}
          />

        
        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* BAR CHART */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-96">
            <h2 className="font-semibold mb-4">
              Monthly Donations vs Delivered
            </h2>

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="donations" fill="#f97316" />
                <Bar dataKey="delivered" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-96">
            <h2 className="font-semibold mb-4">
              Donation Status Distribution
            </h2>

            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={deliveryStatusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >
                  {deliveryStatusData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}


function StatCard({ icon, color, label, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-5">
      <div className={`p-4 ${color} rounded-xl text-white`}>
        <FontAwesomeIcon icon={icon} className="text-2xl" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>
    </div>
  );
}
