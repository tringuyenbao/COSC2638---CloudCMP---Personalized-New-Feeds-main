import React, { Component, useEffect, useContext, useState } from "react";
import { Account, AccountContext } from "../cognito/Account";
import userServices from "../services/user.services";
import interestsService from "../services/interests.service";
import "../css/user.css"
import { Helmet } from "react-helmet";



const InterestButton = (props) => {
    const [clicked, setClicked] = useState(false);
    const click = () =>{
        setClicked(!clicked);
    }
    return(
        <button onClick = {()=> {click(); props.task()}} className= {clicked ?"interest" :"interest-click"} key={props.index}>{props.value}</button>
    )
}

const CUser = () => {
  const { getSession } = useContext(AccountContext);
  const [id, setId] = useState();
  const [info, setInfo] = useState();
  const [interests, setInterests] = useState([]);
  const [availableInterests, setAvailableInterest] = useState([]);
  var removal = [];
  var addition = [];

  const getInfo = (session) =>{
        userServices.getUser(session.idToken.payload['cognito:username']).then( data => {
            setInfo(data.data.email);
            setInterests(data.data.interest);
        })
  }

  const getAvailable = (interest) =>{
        interestsService.getAvailableInterests(interest).then(data => {
            setAvailableInterest(data);
        } )
  }

  const listofremoval = (e) => {
        if(removal.includes(e)){
            removal.splice(removal.indexOf(e),1)
        }
        else{
        removal.push(e);}
  }

  const listofadd = (e) =>{
      if(!interests.includes(e)){
        addition.push(e)}
        console.log(addition)
  }

    const removeInterests = () =>{
        setInterests(interests.filter( interest => !removal.includes(interest)
        ));
    }
    
    const addInterests =()=>{
        setInterests(interests.concat(addition))
    }

    const handleConfirm =  () =>{
        removeInterests();
        window.alert("Are you sure?")
    }

    const handleAdd = () =>{
        addInterests();
        window.alert("Are you sure?")
    }

    const handleSave = () =>{
        userServices.updateInterest(id, interests)
    }

  useEffect(() => { 
    getSession().then((session) => {  
        setId(session.idToken.payload['cognito:username']); 
        getInfo(session);
        getAvailable(interests)
    });
  }, []);

  return (
    <div className="user-container">
        <div className ="user-box">
            <div className = "user-title">User Info</div>
            <div className ="user-info"> 
                <div><b>Email: </b>{info}</div>
                <div className="user-interest">
                    <b>Personal Interests: </b> {interests.map((item, index) => (<InterestButton task = {() =>{listofremoval(item)}} key={index} value={item} />))}
                </div>
                <div className="user-interest">
                </div>
                <div className="user-interest">
                    <b>Available Interests: </b>{availableInterests.map((item, index) => (<InterestButton task = {() =>{listofadd(item)}} key={index} value={item} />)) }
                </div>
                <div>
                    <button className ="button" onClick={() => handleAdd()}>Add</button>
                    <button className ="button" onClick={() => handleConfirm()}>Remove</button>
                    <button className ="button" onClick={() => handleSave()}>Save</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default class User extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>User Page</title>
                </Helmet>
                <Account>
                    <CUser/>
                </Account>
            </div>
        )
    };

};

