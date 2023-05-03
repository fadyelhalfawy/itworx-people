import {Component} from "react";

export class NotFound extends Component {
    render() {
        return (
            <h1>{this.getName()}</h1>
        );
    }

    getName = () => {
        return "Not Found";
    }
}