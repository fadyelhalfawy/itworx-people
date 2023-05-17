import { Component} from "react";
import React from "react";
import {deletePersonId, getPeople} from "../services/PeopleService";
import Person from "./Person";
import {displayDeleteNotification, displayNotification} from "../services/HttpService";
import "../css/ListingPeople.css";
export default class ListingPeople extends Component {
    state = {
        people: []
    };
    async componentDidMount() {
        const { data } = await getPeople();
        const people = [...data.data];
        this.setState({ people });
    }
    render() {
        const { people } = this.state;
        displayNotification();
        return (
            <React.Fragment>
                <section className={"container"}>
                    <div className={"d-flex justify-content-between"}>
                        <h2 className={"user"}>User Management</h2>
                        <button className={"btn btn-outline-primary btn-space m-2 rounded-4"} onClick={this.goToAddUser}>
                            ADD USER +
                        </button>
                    </div>
                </section>
                <Person   people={people}
                          showPerson={this.showPerson}
                          updatePerson={this.getPerson}
                          deletePerson={this.deletePerson}/>

            </React.Fragment>
        );
    }

    showPerson =  () => {
        const { history } = this.props;

        return history.replace("/singlePerson");
    }
    getPerson = personId => {
        const { history } = this.props;

        return history.replace("/listingPeople/" + personId);
    }
    deletePerson = async personId => {
        const { people } = this.state;
        await deletePersonId();
        displayDeleteNotification();
        const {data} = await getPeople();
        if (people.length - 1 === 0) return this.setState({ people: data.data });
        const newPeople = people.filter(person => person.id !== personId);
        this.setState({ people: newPeople });
    }

    goToAddUser = () => {
        const { history } = this.props;

        return history.replace("/addUser");
    }
}