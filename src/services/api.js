import axios from '../ultils/axios_customize';

export const callRegister = (fullName, email, password, phone) => {
   return axios.post('/api/v1/user/register', {
      fullName,
      email,
      password,
      phone,
   });
};

export const callLogin = (username, password) => {
   return axios.post('/api/v1/auth/login', {
      username,
      password,
   });
};

export const callFetchAccount = () => {
   return axios.get('/api/v1/auth/account');
};

export const callFetchAllUsers = () => {
   return axios.get('/api/v1/users/all');
};

export const callFetchUsersQuery = (query) => {
   return axios.get(`/api/v1/users?${query}`);
};

export const callFetchCommentsQuery = (query) => {
   return axios.get(`/api/v1/comments?${query}`);
};

export const callFetchListUser = (query) => {
   return axios.get(`/api/v1/user?${query}`);
};

export const callLogout = () => {
   return axios.post('/api/v1/auth/logout');
};

export const callCreateUser = (user) => {
   const { name, email, password, age, gender, address, role } = user;
   return axios.post('/api/v1/users', {
      name: name,
      email: email,
      password: password,
      age: age,
      gender: gender,
      address: address,
      role: role,
   });
};

export const callUpdateUser = (data) => {
   return axios.patch('/api/v1/users', data);
};

export const callDeleteUser = (userId) => {
   return axios.delete(`/api/v1/users/${userId}`);
};

//api/v1/tracks
export const callDeleteTrack = (trackId) => {
   return axios.delete(`/api/v1/tracks/${trackId}`);
};

export const callFetchAllTracks = () => {
   return axios.get('/api/v1/tracks');
};

export const callFetchTracksQuery = (query) => {
   return axios.get(`/api/v1/tracks?${query}`);
};
//http://localhost:8000/api/v1/tracks?current=1&pageSize=10

//http://localhost:8000/api/v1/tracks

// export const callChangeUserPassword = (email, oldpass, newpass) => {
//    return axios.post('/api/v1/users/change-password', {
//       email,
//       oldpass,
//       newpass,
//    });
// };

// export const callBulkCreateUser = (data) => {
//    return axios.post('/api/v1/users/bulk-create', data);
// };
