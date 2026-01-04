import React, { createContext, useState } from "react";

export const DonorProfileUpdateContext = createContext();
export const VolunteerProfileUpdateContext = createContext();
export const AdminProfileUpdateContext = createContext();

function Context({ children }) {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [volunteerProfileUpdated, setVolunteerProfileUpdated] = useState(false);
  const [adminProfileUpdated, setAdminProfileUpdated] = useState(false);

  return (
    <DonorProfileUpdateContext.Provider
      value={{ profileUpdated, setProfileUpdated }}
    >
      <VolunteerProfileUpdateContext.Provider
        value={{ volunteerProfileUpdated, setVolunteerProfileUpdated }}
      >
        <AdminProfileUpdateContext.Provider
          value={{ adminProfileUpdated, setAdminProfileUpdated }}
        >
          {children}
        </AdminProfileUpdateContext.Provider>
      </VolunteerProfileUpdateContext.Provider>
    </DonorProfileUpdateContext.Provider>
  );
}

export default Context;
