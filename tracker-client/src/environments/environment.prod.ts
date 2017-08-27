const baseUrl =  "https://devtracker.herokuapp.com";
export const environment = {
  production: true,
  baseUrl : baseUrl,
  login : baseUrl + "/api/auth/login",
  users : baseUrl + "/api/users",
  locations : baseUrl + "/api/locations"
};
