import React, { Component } from "react";
import Signup from "../cognito/Signup";
import { Account } from "../cognito/Account";
import { Helmet } from "react-helmet";

export default class SignUp extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Sign Up</title>
                </Helmet>
                <Account>
                    <Signup />
                </Account>
            </div>
        )

    };

};

