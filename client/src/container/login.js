import React, { Component } from "react";
import Login from "../cognito/Login";
import { Account } from "../cognito/Account";
import Helmet from "react-helmet"

class LogIn extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Log In</title>
                </Helmet>
                <Account>
                    <Login/>
                </Account>
            </div>
        )

    };

};

export default LogIn