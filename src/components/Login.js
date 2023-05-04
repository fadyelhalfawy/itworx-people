import MainForm from "./MainForm";
import auth from "../services/AuthService";
import React from "react";
import Joi from "joi-browser";
export default class Login extends MainForm {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    }

    schema = {
        email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
            .required()
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
                    <h1>Login Form</h1>

                    <form>
                        {this.renderFormInput("email", "Email", 'Email@')}
                        {this.renderFormInput("password", "Password", 'password...', "Password")}

                        {/*{this.renderCheckBox("Remember me", "checkBox")}*/}

                        {/*{this.renderButton("btn-outline-info", "Login", history, "/movies", this.validate())}*/}
                        <button className={"btn btn-outline-info btn-space m-2"}
                                disabled={this.validate()}
                                onClick={this.handleSubmit}>
                            Login
                        </button>

                        {this.renderButton("btn-outline-danger", "Back", history, "/login", false)}
                    </form>
                </section>

            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { data, errors } = this.state;
        try {
            const {location} = this.props;
            await auth.login(data.email, data.password);
            const { state } = location;
            window.location = state ? state.from.pathname : "/";
        }
        catch (e) {
            if (e.response && e.response.status === 400) {
                errors.data = e.response.data;
                this.setState({ errors });
            }
        }

    }
}