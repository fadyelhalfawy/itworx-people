import http from "./HttpService";
import config from "../config/config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";
http.jwt(getJwt());
async function login(email, password) {
    const {data: jwt} = await http.post(config.authPath, { email, password });

    localStorage.setItem(tokenKey, jwt.token);
}

function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt.token);
}

function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        if (jwt === null) return null;
        else return true;
        // return jwtDecode(jwt); using while the API if correct and return the user.
    }
    catch (e) {
        return null;
    }
}

function getJwt() {
    return localStorage.getItem(tokenKey);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

const auth = {
    login,
    loginWithJwt,
    getCurrentUser,
    logout
}

export default auth;