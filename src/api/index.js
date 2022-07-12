export const getAllServicesEndpoint = () => `${process.env.REACT_APP_API_URL}/`;

export const getServiceInfoEndpoint = (serviceId) =>
  `${process.env.REACT_APP_API_URL}/getcomments/${serviceId}`;

export const getProfileEndpoint = () => `${process.env.REACT_APP_API_URL}/user`;

export const getUserServices = () =>
  `${process.env.REACT_APP_API_URL}/services/user`;

export const submitCommentsEndpoint = (serviceId) =>
  `${process.env.REACT_APP_API_URL}/comments/${serviceId}`;

export const getMyServicesEndpoint = () =>
  `${process.env.REACT_APP_API_URL}/services/user`;

export const setStatusEndpoint = (serviceId) =>
  `${process.env.REACT_APP_API_URL}/services/${serviceId}`;

export const profileEndpoint = () => `${process.env.REACT_APP_API_URL}/users`;

export const avatarURL = (avatar) =>
  `${process.env.REACT_APP_API_URL}/profilePictures/${avatar}`;

export const registerNewServiceEndpoint = () =>
  `${process.env.REACT_APP_API_URL}/services`;

export const loginEndpoint = () => `${process.env.REACT_APP_API_URL}/login`;
