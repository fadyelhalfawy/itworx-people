import React from "react";
import Joi from "joi-browser";
import {signUp} from "../services/UserService";
import MainForm from "./MainForm";
import auth from "../services/AuthService";

export default class CreateUser extends MainForm {
    state = {
        data: {email: "", password: ""},
        errors: {}
    }

    schema = {
        email: Joi
            .string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
            .label('Email'),

        password: Joi
            .string()
            .required()
            .min(5)
            .label('Password')
    };

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <section>
                    <h1>Signup here!</h1>

                    <form>
                        {this.renderFormInput("email", "Email", "Your-Email")}
                        {this.renderFormInput("password", "Password", "Password...", "password")}

                        {this.renderCheckBox("Agree with all conditions", "checkBox-2")}

                        <button className={"btn btn-outline-info btn-space m-2"}
                                disabled={this.validate()}
                                onClick={this.handleSubmit}>
                            Signup
                        </button>

                        {this.renderButton("btn-outline-danger", "Back", history, "/login", false)}
                    </form>
                </section>

            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { data, errors } = this.state;
        const {history} = this.props;

        try {
            const jwt = await signUp(data);
            auth.loginWithJwt(jwt);
            history.replace("/login");
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                const error = { ...errors };
                error.email = e.response.data;
                this.setState({ errors: error});
            }
        }

    }
}