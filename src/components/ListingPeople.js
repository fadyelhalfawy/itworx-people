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
            <Person   people={people}
                      showPerson={this.showPerson}
                      deletePerson={this.deletePerson}/>
        );
    }

    showPerson = personId => {
        const { history } = this.props;

        return history.replace("/listingPeople/" + personId);
    }
    deletePerson = async personId => {
        const { people } = this.state;
        const {data} = await getPeople();
        if (people.length - 1 === 0) return this.setState({ people: data.data });
        const newPeople = people.filter(person => person.id !== personId);
        this.setState({ people: newPeople });
    }
}