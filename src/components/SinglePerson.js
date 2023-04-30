import {useState} from "react";
import person from "../services/TestData";
import { FaGithub } from "react-icons/fa";
import "../css/SinglePerson.css";

const SinglePerson = () => {
    const [index, setIndex] = useState(0);
    const {name, job, image, text} = person[index];

    return (
            <section className={"container"}>
                <div className={"title"}>
                    <h2>
                        Person
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
    );
}
export default SinglePerson;