import React, {Component} from 'react';
import SinglePerson from "./components/SinglePerson";
import ListingPeople from "./components/ListingPeople";
import {NotFound} from "./components/NotFound";
// @ts-ignore
import {Redirect, Switch, Route} from "react-router-dom";

export class App extends Component {
    render() {
        return (
                <main>
                    <Switch>
                        <Route path={"/listingPeople"} component={ListingPeople}/>
                        <Route path={"/singlePerson"} component={SinglePerson} />
                        <Route path={"/not-found"} to={NotFound} />
                        <Redirect from={"/"} exact to={"/listingPeople"}/>
                        <Redirect to={"/not-found"}/>
                    </Switch>

                </main>

        );
    }

}

export default App;
