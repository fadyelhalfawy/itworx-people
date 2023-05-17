import Axios from "axios";
import { toast } from "react-toastify";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (expectedError) toast.error("An unexpected error occurred..");

    return Promise.reject(error);
});

export const displayNotification = () => toast.success("Logged In or Signed Up Successful");
export const displayLoginNotification = () => toast.success("Logged In Successful");

export const displayUpdateNotification = () => toast.success("Update User Successful");

export const displayDeleteNotification = () => toast.error("Delete User Successful");

export const displayGetPersonNotification = () => toast.success("Get Person Successful");
export const displayLogOutNotification = () => toast.success("Logged Out Successful");

export const displayAddUserNotification = () => toast.success("User Add Successful");

function setJwt(jwt) {
    Axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    patch: Axios.patch,
    delete: Axios.delete,
    jwt: setJwt
};
export default http;