import http from "../services/HttpService";
import config from "../config/config.json";

export function getPeople() {
    return http.get(config.peoplePath);
}