import http from "./HttpService";
import config from "../config/config.json";

export function signUp(user) {
    return http.post(config.registerPath, {
        email: user.email,
        password: user.password
    });
}
export function createUser(user) {
    return http.post(config.addUserPath, {
        name: user.name,
        job: user.job
    });
}