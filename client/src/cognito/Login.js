import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { authenticate } = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in!", data);
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to login", err);
      });
  };

  return (
        <div className="auth-container">
      <form className ="auth-form" onSubmit={onSubmit}>
        <div className = "auth-title"> Log In</div>
        <div className = "auth-line"> Log In to see a customized news feed for you</div>
        <div className ="form-group">
          <label>Email: </label>
          <input
            type ="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className ="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
