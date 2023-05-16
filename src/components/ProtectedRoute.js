import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({ path, user, component: Component, ...rest }) => {
    let checkIfUser;

    checkIfUser = user.user !== null;

    return(
        <Route
            { ...rest }
            render={ props => {
                if (!checkIfUser) return <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }} />;

                return Component ? <Component { ...props }/> : null;
            }}
        />
    )
}

export default ProtectedRoute;