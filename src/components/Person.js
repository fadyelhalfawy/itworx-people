import {Component} from "react";
import "../css/Person.css";
export default class Person extends Component {
    render() {
        const { people } = this.props;
        return (
            <div className={"container"}>
                {people.map(person => (
                    <div className={"person"} key={person.id}>
                        <img src={person.avatar} alt={person.avatar} />
                        <div>
                            <h4>{person.first_name + " " + person.last_name}</h4>
                            <h4>{person.email}</h4>
                        </div>
                    </div>
                ))}

            </div>
        );
    }
}