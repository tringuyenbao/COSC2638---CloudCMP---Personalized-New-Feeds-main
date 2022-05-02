import '../css/nav.css';
import { React, useState, useContext, useEffect } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Account, AccountContext } from "../cognito/Account";

const StatusNavigationBar = () => {
        const [status, setStatus] = useState(false);
        const { getSession, logout } = useContext(AccountContext);
      
        useEffect(() => {
          getSession().then((session) => {
            console.log("Session: ", session);
            setStatus(true);
          });
        }, []);

        return(
            <Navbar className ="navbar">
                <Navbar.Brand href="/" className = "navbrand">Customized Newsfeed</Navbar.Brand>
                    <Nav className="action-box">
                        {status ? <div><Nav.Link href="/feed">Your Feed</Nav.Link> <Nav.Link href="/user">User</Nav.Link> <button className ="nav-button" onClick={logout}>LogOut</button></div> : <div>
                            <Nav.Link href="/sign-up">Sign up</Nav.Link>
                            <Nav.Link   href="/sign-in">Login</Nav.Link></div>
                        }
                    </Nav>
            </Navbar>
            
       );
}

const NavigationBar =() =>{
    return(
        <Account>
            <StatusNavigationBar/>
        </Account>
    )
}

export default NavigationBar;  
