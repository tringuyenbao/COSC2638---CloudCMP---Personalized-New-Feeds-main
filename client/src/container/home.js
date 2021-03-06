import React, { Component } from 'react';
import NewsCard from '../components/newscard';
import axios from 'axios';
import StackGrid from "react-stack-grid";
import ClassNames from "../css/home.css";
import ReactLoading from "react-loading";

import { reactLocalStorage } from 'reactjs-localstorage';
import NoNetwork from '../assets/images/NoNetwork.png';
import ConditionBar from '../components/condtionbar';
import { Helmet } from 'react-helmet';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            error: false,
            toquery: '',
            forCategory: '',
            forCountry: 'country=us',
            query: '',
            CategoryValue: 'general',
            CountryValue: '',
            loadingcheck: true,
            API_KEY: "e9671d328640462a87a3de5fa12107d9"
        };
    }
    
    getNews = () => {
        axios
          .get(`https://newsapi.org/v2/top-headlines?${this.state.forCountry}${this.state.toquery}${this.state.forCategory}&pageSize=40&apiKey=${this.state.API_KEY}`)
          .then(response => {
            const articles = response.data.articles;
            //console.log(articles);
            this.setState({ articles: articles, loadingcheck: true }, () => {
              reactLocalStorage.remove('backupdata');
              reactLocalStorage.remove('forCountry');
              reactLocalStorage.remove('forCategory');
              reactLocalStorage.remove('toquery');
              reactLocalStorage.remove('CountryValue');
              reactLocalStorage.remove('CategoryValue');
              reactLocalStorage.remove('query');
              reactLocalStorage.setObject('backupdata', articles);
              reactLocalStorage.setObject('forCountry', this.state.forCountry);
              reactLocalStorage.setObject('forCategory', this.state.forCategory);
              reactLocalStorage.setObject('toquery', this.state.toquery);
              reactLocalStorage.setObject('CountryValue', this.state.CountryValue);
              reactLocalStorage.setObject('CategoryValue', this.state.CategoryValue);
              reactLocalStorage.setObject('query', this.state.query);
            });
          })
          .catch(error => {
            //console.log(error);
            this.setState({
              error: error,
              loadingcheck: true,
              articles: reactLocalStorage.getObject('backupdata'),
              forCountry: reactLocalStorage.getObject('forCountry'),
              forCategory: reactLocalStorage.getObject('forCategory'),
              toquery: reactLocalStorage.getObject('toquery'),
              CategoryValue: reactLocalStorage.getObject('CategoryValue'),
              CountryValue: reactLocalStorage.getObject('CountryValue'),
              query: reactLocalStorage.getObject('query')
            });
          });
      }
    componentDidMount() {
        this.getNews();
    }
    handleChange = (event) => {
        if (this.state.error) {
          alert('Connect to the Network')
        }
        else {
          this.setState({ loadingcheck: false });
          this.setState({ query: event.target.value }, () => {
            //console.log(this.state.query);
            this.setState({ toquery: `&q=${this.state.query}` }, () => {
              //console.log(this.state.toquery);
              this.getNews();
            });
          });
    
          if (this.state.query === '') {
            this.setState({ toquery: '' }, () => {
              //console.log(this.state.url);
              this.getNews();
            });
          }
        }
      }

      handleCategoryDropdownChange = (event) => {
        if (this.state.error) {
          alert('Connect to the Network')
        }
        else {
          this.setState({ loadingcheck: false });
          //console.log(event.target.value);
          this.setState({ CategoryValue: event.target.value }, () => {
            //console.log(this.state.CategoryValue);
            this.setState({ forCategory: `&category=${this.state.CategoryValue}` }, () => {
              //console.log(this.state.forCategory);
              this.getNews();
            });
          });
        }
      }
    
      handleCountryDropdownChange = (event) => {
        if (this.state.error) {
          alert('Connect to the Network')
        }
        else {
          this.setState({ loadingcheck: false });
          //console.log(event.target.value);
          this.setState({ CountryValue: event.target.value }, () => {
            //console.log(this.state.CountryValue);
            this.setState({ forCountry: `country=${this.state.CountryValue}` }, () => {
              //console.log(this.state.forCountry);
              this.getNews();
                });
            });
            }
        }
    
    
    render() {
        const articleState = this.state.articles;
        let result = this.state.error ? <p className={ClassNames.loadingpage}><img className={ClassNames.NoNetworkimage} src={NoNetwork} alt='Summerize' />News can't be loaded</p> : <div className={ClassNames.loadingpage}>Loading...<br /><ReactLoading type="bubbles" color="#777" /></div>;
        if (articleState && articleState.length > 1 && this.state.loadingcheck) {

        result = <StackGrid
            columnWidth={300}
            monitorImagesLoaded={true}>
            {this.state.articles.map((arg,i) => {
            return <NewsCard key={i} articles={arg} />;
            })}
        </StackGrid>
        }
        else if (articleState.length === 0 && this.state.query !== '') {
        result = <p className={ClassNames.loadingpage}>No Search Result Found</p>
        }
        return (
        <div className="body">
          <Helmet>
                    <title>Customized Newsfeed</title>
            </Helmet>
            <ConditionBar
            selectedValueCountry={this.state.CountryValue}
            handleChangeCountry={this.handleCountryDropdownChange}
            selectedValueCategory={this.state.CategoryValue}
            handleCategoryChange={this.handleCategoryDropdownChange}
            value={this.state.query}
            handleChange={this.handleChange} />
            {result}
        </div>
    );
  }
}


export default Home;