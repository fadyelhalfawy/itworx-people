import React, {useState} from "react";
import Joi from "joi-browser";
import MainForm from "./MainForm";
import {getPeople, getPerson, saveUpdate} from "../services/PeopleService";
import {FaGithub} from "react-icons/fa";
import "../css/SinglePerson.css";
import person from "../services/TestData";
import {
    displayGetPersonNotification,
    displayLoginNotification,
    displayUpdateNotification
} from "../services/HttpService";

class PersonForm extends MainForm {
    state = {
        data: {
            first_name: "",
            last_name: "",
            email: "",
            avatar: ""},
        people: {},
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
        await this.populatePeople();
        await this.populatePerson();
    }

    render() {
        const {name, job, image, text} = person[0];

        return (
            <React.Fragment>
                <section className={"container"}>
                    <div className={"title"}>
                        <h2>
                            Person Information
                        </h2>
                        <div className={"underline"}></div>
                    </div>
                    <article className={"choice"}>

                        <div className={"img-container"}>
                            <img src={image} alt={name} className={"person-img"} />
                            <span className={"quote-icon"}>
                            <FaGithub />
                        </span>
                        </div>

                        <h2 className={"author"}>{name}</h2>
                        <h3 className={"job"}>{job}</h3>
                        <p className={"info"}>{text}</p>
                    </article>
                </section>

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

    async populatePeople() {
        const { history } = this.props;
        try {
            const { data } = await getPeople();

            this.setState({ people: data.data });
        }
        catch (e) {
            if (e.response && e.response.status === 404)
                history.replace("/notfound");
        }
    }
    async populatePerson() {
        const { people } = this.state;
        const { history, match } = this.props;
        try {
            const personId = match.params.id;

            if (personId === "new") return;
            const {data} = await getPerson();
            displayGetPersonNotification();
            console.log(data.data);
            const body = { ...people[match.params.id - 7] };

            this.setState({ data: this.mapToViewModel(body) });
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
        const body = { ...person };
        this.setState({ data: this.mapToViewModel(body) });
        console.log(body);
        displayUpdateNotification();
        return history.replace("/listingPeople");
    };
}
export default PersonForm;