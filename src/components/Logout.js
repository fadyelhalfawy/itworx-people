import {Component} from "react";
import auth from "../services/AuthService";

export default class Logout extends Component {

    componentDidMount() {
        auth.logout();
        window.location = "/login";
    }

    render() {
        return null;
    }
};