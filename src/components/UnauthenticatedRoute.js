import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";


const UnauthenticatedRoute = ({ children, ...remainingProps }) => {
    const auth = useSelector(state => state.firebase.auth.isLoaded)

    
    return (
        <Route
            {...remainingProps}
            render={({ location }) =>
            isLoaded(auth) && isEmpty(auth) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/profile",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
export default UnauthenticatedRoute;