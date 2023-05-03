import {Component} from "react";
import "../css/Person.css";
export default class Person extends Component {
    render() {
        const { people, submit } = this.props;
        return (
            <div className={"people"}>
                {people.map(person => (
                    <div className={"person"} key={person.id}>
                        <img src={person.avatar} alt={person.avatar}/>
                        <div>
                            <h4>{person.first_name + " " + person.last_name}</h4>
                            <h4>{person.email}</h4>
                            <button className={"btn btn-outline-info btn-space"} onClick={submit}>Read More</button>
                        </div>
                    </div>
                ))}

            </div>
        );
    }
}