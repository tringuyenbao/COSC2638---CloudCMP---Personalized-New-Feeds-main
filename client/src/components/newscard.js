import React, { Component } from 'react';
import '../css/news.css';
import shareimg from '../assets/images/share.png';
import ImagesLoaded from 'react-images-loaded';

class NewsCard extends Component {
  
    formatDate(date) {
      var time = new Date(date);
      var year = time.getFullYear();
      var day = time.getDate();
      var hour = time.getHours();
      var minute = time.getMinutes();
      var month = time.getMonth() + 1;
      var composedTime = day + '/' + month + '/' + year + ' | ' + hour + ':' + (minute < 10 ? '0' + minute : minute);
      return composedTime;
    }
  
    share(){
      console.log("clicked")
      if (navigator.share) {
        navigator.share({
            title: 'Summarize: The News App',
            text: 'Check out this news website',
            url: 'https://souravdey777.github.io/News-Bucket/',
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    }
    handleOnAlways = instance => {};
 
    handleOnProgress = (instance, image) => {};
    
    handleOnFail = instance => {};
    
    handleDone = instance => {};
 
    render() {
      return (
        <div className="Article">
        <a className="a" href={this.props.articles.url}>
            <div>
              {this.props.articles.urlToImage ? <img className="img" src={this.props.articles.urlToImage} alt={this.props.articles.title} title={this.props.articles.title} /> : null}
            </div>
            <div>
              {this.props.articles.title ? <div className="Header">{this.props.articles.title}</div> : null}
              {this.props.articles.author ? <div className="author">{this.props.articles.author}</div> : null}
              {this.props.articles.description ? <div className="description">{this.props.articles.description}</div> : null}
              
              
            </div>
        </a>
        <div className={"articlefooter"}>
        <img onClick={this.share} src={shareimg} alt="Share it"/>
          {this.props.articles.publishedAt ? <div className={"publishedAt"}>
              {this.formatDate(this.props.articles.publishedAt)}</div> : null}
              
        </div>
        </div>
      );
    }
  }

export default NewsCard;