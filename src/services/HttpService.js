import Axios from "axios";
import { toast } from "react-toastify";

Axios.interceptors.response.use(null, error => {
    const expectedError = error.response
        && error.response.status >= 400
        && error.response.status < 500;

    if (expectedError){
        toast.error("An unexpected error occurred..(Wrong username or password)");
    }

    return Promise.reject(error);
});

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