import commonAPI from "./Commonapi";
import SERVER_URL from "./Serverurl";


 export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
 }

 export const loginAPI=async(reqBody)=>{
     return await commonAPI('POST',`${SERVER_URL}/login`,reqBody)
}

export const googleloginAPI = async (loginData) => {
  return await commonAPI('POST',`${SERVER_URL}/google-login`, loginData)
}

export const addDonationAPI = async (reqBody, reqHeader) => {
  return await commonAPI(  "POST", `${SERVER_URL}/add-donation`,reqBody,reqHeader);
};
  

export const getAllDonationsAPI = async (reqHeader)=>{
     return await commonAPI('GET',`${SERVER_URL}/get-all-donations`,{},reqHeader)
}
export const getADonationAPI = async (id,reqHeader)=>{
     return await commonAPI('GET',`${SERVER_URL}/get-singledonation/${id}`,{},reqHeader)
}

export const getDashBoardFoodAPI = async(reqHeader)=>{
     return await commonAPI('GET',`${SERVER_URL}/get-dashBoard-food`,{},reqHeader)
}

export const updateDonationAPI = async(id,reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${SERVER_URL}/update-donation/${id}`,reqBody,reqHeader)
}

    
export const deleteDonationAPI = async(id,reqHeader)=>{
     return await commonAPI('DELETE',`${SERVER_URL}/delete-donation/${id}`,{},reqHeader)
}


export const updateDonorAPI = async(reqBody,reqHeader)=>{
     return await commonAPI('PUT',`${SERVER_URL}/update-donor`,reqBody,reqHeader)
}

//volunteer

export const getRecentFoodAPI= async(reqHeader)=>{
     return await commonAPI('GET',`${SERVER_URL}/get-recent`,{},reqHeader)
}

export const getAvailableDonationsAPI= async(searchKey,reqHeader)=>{
     return await commonAPI('GET',`${SERVER_URL}/get-available?search=${searchKey}`,{},reqHeader)
}






export const updateVolunteerAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/update-volunteer`, reqBody, reqHeader);
};



export const acceptDonationAPI = async (id, reqHeader) => {
  return await commonAPI("PUT",`${SERVER_URL}/accept-donation/${id}`,{},reqHeader );
    };


export const getMyTasksAPI = async (reqHeader) => {
  return await commonAPI( "GET", `${SERVER_URL}/my-tasks`,  {},reqHeader );
   
 };




export const markAsPickedAPI = async (id, reqHeader) => {
  return await commonAPI( "PUT", `${SERVER_URL}/mark-picked/${id}`, {}, reqHeader );
  }; 
   

  export const getSinglePickupDonationAPI = async (id, reqHeader) => {
  return await commonAPI(  "GET",`${SERVER_URL}/donation/${id}` ,{},reqHeader  );
  
};

   
   
 



export const markAsDeliveredAPI = async (id, reqHeader) => {
  return await commonAPI( "PUT",`${SERVER_URL}/mark-delivered/${id}`,  {}, reqHeader  );
   };
    

   
   //admin



   export const updateAdminAPI = async (reqBody, reqHeader) => {
  return await commonAPI("PUT", `${SERVER_URL}/update-admin`, reqBody, reqHeader);
};



// GET VOLUNTEERS
export const getVolunteersAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin-volunteers`,
    "",
    reqHeader
  );
};

// UPDATE STATUS
export const updateVolunteerStatusAPI = async (id, reqBody, reqHeader) => {
  return await commonAPI(
    "PUT",
    `${SERVER_URL}/update-volunteer-status/${id}`,
    reqBody,
    reqHeader
  );
};


export const deleteVolunteerAPI = async (id, reqHeader) => {
  return await commonAPI(
    "DELETE",
    `${SERVER_URL}/admin-delete-volunteers/${id}`,
    "",
    reqHeader
  );
};



export const getAllAdminDonationsAPI = async (reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/get-all-admin-donation`,
    {},
    reqHeader
  );
};




export const getAdminDonationDetailsAPI = async (id, reqHeader) => {
  return await commonAPI(
    "GET",
    `${SERVER_URL}/admin-donation/${id}`,
    {},
    reqHeader
  );
};





export const getSingleDonorAdminAPI = async (reqBody,reqHeader) => {
     return await commonAPI("GET",`${SERVER_URL}/getadminSingleDonor?email=${reqBody}`,{},reqHeader );
};




export const setDropOffLocationAPI = (id, reqBody, reqHeader) => {
  return commonAPI(
    "PUT",
    `${SERVER_URL}/admin/set-dropoff/${id}`,
    reqBody,
    reqHeader
  );
};
