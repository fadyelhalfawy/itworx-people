import Axios from "axios";

function setJwt(jwt) {
    Axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    patch: Axios.patch,
    delete: Axios.delete,
    jtw: setJwt
};
export default http;