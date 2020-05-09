import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {UserListPage} from "./pages/UserListPage";
import {CreatePage} from "./pages/CreatePage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/list" exact>
                    <UserListPage/>
                </Route>

                <Route path="/create" exact>
                    <CreatePage/>
                </Route>

                <Redirect to="/list"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}