import {Link, NavLink} from "react-router-dom";
import React from "react";
import image from "../images/115585749-e3c58200-a299-11eb-8ddc-bd057b965631.png";
import person from "../images/2-image.jpg";

const NavBar = ({ user }) => {
    let checkIfUser;

    checkIfUser = user.user !== null;

    return(
        <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <img className={"m-2"} src={image} alt="logo" width="30" height="24" />
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                </form>
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/listingPeople">
                        People
                    </NavLink>
                </div>

            </div>

            <div className="navbar-nav">
                {!checkIfUser && (
                    <React.Fragment>
                        <NavLink className="nav-item nav-link" to="/login">
                            Login
                        </NavLink>

                        <NavLink className="nav-item nav-link" to="/signup">
                            Sign Up
                        </NavLink>
                    </React.Fragment>
                )}

                {checkIfUser && (
                    <React.Fragment>
                        <NavLink className="nav-item nav-link navbar-brand" to="/singlePerson">
                            <div>
                                <img className={"rounded-circle d-inline-block"} src={person} alt="logo" width="45" height="24" />
                                Eve
                            </div>

                        </NavLink>

                        <NavLink className="nav-item nav-link navbar-brand" to="/logout">
                                Logout
                        </NavLink>
                    </React.Fragment>
                )}

            </div>
        </nav>
        </React.Fragment>
    );
}

export default NavBar;