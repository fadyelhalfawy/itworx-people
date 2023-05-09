import React from "react";
import Joi from "joi-browser";
import MainForm from "./MainForm";
import {getPeople, getPerson, saveUpdate} from "../services/PeopleService";

class PersonForm extends MainForm {
    state = {
        data: {
            first_name: "",
            last_name: "",
            email: "",
            avatar: ""},
        errors: {}
    }

    schema = {
        id: Joi.number(),

        first_name: Joi
            .string()
            .required()
            .label('First Name'),

        last_name: Joi
            .string()
            .required()
            .label('Last Name'),

        email: Joi
            .string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
            .label('Email'),

        avatar: Joi
            .any()
            .required()
            .label('Image')
    };

    async componentDidMount() {
        await this.populatePerson();
    }

    render() {
        return (
            <React.Fragment>
                <section>
                    <h1>Person Form</h1>

                    <form>
                        {this.renderFormInput("first_name", "First Name", 'First Name')}
                        {this.renderFormInput("last_name", "Last Name", 'Last Name')}
                        {this.renderFormInput("email", "Email", "Email@")}
                        {this.renderFormInput("avatar", "Image", "Avatar")}

                        <button className={"btn btn-outline-info btn-space m-2"}
                                disabled={this.validate()}
                                onClick={this.handleSubmit}>
                            Save
                        </button>
                    </form>
                </section>
            </React.Fragment>
        );
    }
    async populatePerson() {
        const { history, match } = this.props;
        try {
            const personId = match.params.id;
            if (personId === "new") return;
            const {data} = await getPerson();
            console.log(data.data);
            this.setState({ data: this.mapToViewModel(data.data) });
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    };

    mapToViewModel(person) {
        return {
            id: person.id,
            first_name: person.first_name,
            last_name: person.last_name,
            email: person.email,
            avatar: person.avatar
        };
    }

    doSubmit = async () => {
        const { data: person } = this.state;
        const { history } = this.props;

        await saveUpdate(person);
        return history.replace("/listingPeople");
    };
}
export default PersonForm;