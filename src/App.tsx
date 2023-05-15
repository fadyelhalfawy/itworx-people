import React, {Component} from 'react';
import SinglePerson from "./components/SinglePerson";
import ListingPeople from "./components/ListingPeople";
import {NotFound} from "./components/NotFound";
// @ts-ignore
import {Redirect, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonForm from "./components/PersonForm";
import NavBar from "./components/NavBar";
import auth from "./services/AuthService";
import Logout from "./components/Logout";

export class App extends Component {
    state = {
        user: ""
    }

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const user = this.state;
        return (
            <React.Fragment>

            <NavBar user={user} />

                <main>
                    <Switch>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/logout"} component={Logout} />
                        <Route path={"/listingPeople/:id"} component={PersonForm}/>
                        <Route path={"/listingPeople"} component={ListingPeople} />
                        <Route path={"/singlePerson"} component={SinglePerson} />
                        <Route path={"/not-found"} to={NotFound} />
                        <Redirect from={"/"} exact to={"/listingPeople"}/>
                        <Redirect to={"/not-found"}/>
                    </Switch>

                    <ToastContainer />

                </main>

                </React.Fragment>
        );
    }

}

export default App;
