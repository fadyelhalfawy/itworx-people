import http from "../services/HttpService";
import config from "../config/config.json";

export function getPeople() {
    return http.get(config.peoplePath);
}

export function getPerson() {
    return http.get(config.personPath);
}
export function saveUpdate(person) {
    console.log(person);
    if (person.id){
        const body = { ...person };
        delete body.id;
        return http.put(config.personPath, body);
    }

    return http.post(config.peoplePath, person);
}