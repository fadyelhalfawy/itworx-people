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
import CreateUser from "./components/CreateUser";

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
                        <ProtectedRoute path={"/logout"} user={user} component={Logout} />
                        <ProtectedRoute path={"/listingPeople/:id"} user={user} component={PersonForm}/>
                        <ProtectedRoute path={"/listingPeople"} user={user} component={ListingPeople}/>
                        <ProtectedRoute path={"/singlePerson"} user={user} component={SinglePerson}/>
                        <Route path={"/signup"} component={CreateUser} />
                        <Route path={"/not-found"} component={NotFound} />
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
