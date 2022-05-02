
import { Account, AccountContext } from "../cognito/Account";
import userServices from "../services/user.services";
import React, { Component, useEffect, useContext, useState } from "react";
import axios from 'axios';
import NewsCard from '../components/newscard';
import StackGrid from "react-stack-grid";
import Helmet from "react-helmet"

const CFeed = () => {
    const { getSession } = useContext(AccountContext);
    const [interests, setInterests] = useState(["none", "no"]);
    const [articles, setArticles] = useState(["none","no"])

    const getInfo = (session) =>{
        userServices.getUser(session.idToken.payload['cognito:username']).then( data => {
            setInterests(data.data.interest);
        })
    }

    const InterestsToQuery = () =>{
        console.log(interests)
        let query = interests.toString().toLowerCase().replaceAll(",", " OR ")
        console.log(query)
        return query;
    }

    const query = InterestsToQuery()

    const getNews = () => {
            axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=40&apiKey=e9671d328640462a87a3de5fa12107d9`,  {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }})
              .then(response => {
                setArticles(response.data.articles)
          })
    }

    useEffect(() => { 
        getSession().then((session) => {  
            getInfo(session);
            getNews();
        });
        
      }, []);

return(
        <div className="body">
            <StackGrid
            columnWidth={300}
            monitorImagesLoaded={true}>
            {articles.map((arg,i) => {
            return <NewsCard key={i} articles={arg} />;
            })}
            </StackGrid>
        </div>
    );
};

export default class Feed extends Component {
    render() {
        
        return (
            <div>
                <Helmet>
                    <title>Your Personalized Feed</title>
                </Helmet>
                <Account>
                    <CFeed/>
                </Account>
            </div>
        )
    };

};


