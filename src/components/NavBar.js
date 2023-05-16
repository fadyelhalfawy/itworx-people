import {NavLink} from "react-router-dom";
import Link from "react-router-dom/Link";
import React from "react";

const NavBar = ({ user }) => {
    let checkIfUser;

    checkIfUser = user.user !== null;

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-info">
            <Link className="navbar-brand" to="/">People Listing...</Link>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/listingPeople">
                        People
                    </NavLink>

                    <NavLink className="nav-item nav-link" to="/addPerson">
                        Add Person
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
                        <NavLink className="nav-item nav-link" to="/singlePerson">
                            Eve
                        </NavLink>

                        <NavLink className="nav-item nav-link" to="/logout">
                            Logout
                        </NavLink>
                    </React.Fragment>
                )}

            </div>
        </nav>
    );
}

export default NavBar;