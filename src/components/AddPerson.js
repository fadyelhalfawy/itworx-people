import React from "react";
import Joi from "joi-browser";
import {createUser} from "../services/UserService";
import MainForm from "./MainForm";
import {displayAddUserNotification,} from "../services/HttpService";
import RenderIn3Seconds from "./RenderIn3Seconds";

export default class AddPerson extends MainForm {

    state = {
        data: {name: "", job: ""},
        errors: {}
    }

    schema = {
        name: Joi
            .string()
            .required()
            .label('Name'),

        job: Joi
            .string()
            .required()
            .label('Job')
    };

    render() {
        const { history } = this.props;

        return (
            <React.Fragment>
                <section>
                    <h1>Adding New User...</h1>

                    <form>
                        {this.renderFormInput("name", "Name", "Your-Name")}
                        {this.renderFormInput("job", "Job", "Your-Job")}

                        {this.renderCheckBox("Agree with all conditions", "checkBox-2")}

                        <button className={"btn btn-outline-info btn-space m-2"}
                                disabled={this.validate()}
                                onClick={this.handleSubmit}>
                            Add User
                        </button>
                        {this.renderButton("btn-outline-danger", "Back", history, "/listingPeople", false)}
                    </form>


                </section>

            </React.Fragment>
        );
    }

    doSubmit = async () => {
        const { data, errors } = this.state;

        try {
            await createUser(data);
            displayAddUserNotification();
            RenderIn3Seconds();
            window.location = "/listingPeople";
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