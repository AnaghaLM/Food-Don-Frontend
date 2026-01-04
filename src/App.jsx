import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LandingPage from "./CommonComponents/LandingPage";
import Auth from "./CommonComponents/Auth";


import DonorDashboard from "./donor/pages/DonorDashboard";
import CreateDonation from "./donor/pages/CreateDonation";
import DonationHistory from "./donor/pages/DonationHistory";
import DonationDetails from "./donor/pages/DonationDetails";
import DonorProfile from "./donor/pages/DonorProfile";


import VolunteerDashboard from "./volunteer/pages/VolunteerDashboard";
import AvailableDonations from "./volunteer/pages/AvailableDonations";
import MyTasks from "./volunteer/pages/MyTasks";
import PickupConfirmation from "./volunteer/pages/PickUpConfirmation";
import DeliveryConfirmation from "./volunteer/pages/DeliveryConfirmation";
import VolunteerProfile from "./volunteer/pages/VolunteerProfile";


import AdminDashboard from "./admin/pages/AdminDashboard";

import ManageVolunteers from "./admin/pages/ManageVolunteers";
import ManageDonations from "./admin/pages/ManageDonations";
import AdminDonationDetails from "./admin/pages/AdminDonationDetails";
import AdminProfile from "./admin/pages/AdminProfile";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />

      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />


        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/create-donation" element={<CreateDonation />} />
        <Route path="/donor/history" element={<DonationHistory />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/donation/:id" element={<DonationDetails />} />

        <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
        <Route path="/volunteer/available" element={<AvailableDonations />} />
        <Route path="/volunteer/tasks" element={<MyTasks />} />
        <Route path="/volunteer/pickup/:id" element={<PickupConfirmation />} />
        <Route path="/volunteer/delivery/:id" element={<DeliveryConfirmation />} />
        <Route path="/volunteer/profile" element={< VolunteerProfile />} />


        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-donations" element={<ManageDonations />} />
        <Route path="/admin/donations/:id" element={<AdminDonationDetails />} />
        <Route path="/admin/manage-volunteers" element={<ManageVolunteers />} />
        <Route path="/admin/profile" element={<AdminProfile />} />

      </Routes>
    </BrowserRouter>


  );
}

export default App;





