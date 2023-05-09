import {Component} from "react";
import {getPeople} from "../services/PeopleService";
import Person from "./Person";
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
        return (
            <Person people={people}
                    submit={this.showPeople}
                    delete={this.deletePerson}
            />
        );
    }

    showPeople = () => {
        const { history } = this.props;

        return history.replace("/listingPeople/:id");
    }

    deletePerson = () => {
        const { history } = this.props;

        return history.replace("/listingPeople/:id");
    }

}