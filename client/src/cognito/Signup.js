import React, { useState } from "react";
import UserPool from "../UserPool";
import "../css/login_signup.css"
import { useHistory } from "react-router";

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="auth-container">
      <form className ="auth-form" onSubmit={onSubmit}>
        <div className = "auth-title"> Sign Up</div>
        <div className = "auth-line"> Sign up to get a customized news feed for you</div>
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
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
