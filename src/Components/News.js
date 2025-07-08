import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './spinner.js';
import propTypes from "prop-types";



export class News extends Component {
    deafultProps = {
      country : 'us',
      pageSize : 5,
      category : 'general',
    }
    static propTypes = {
      country: propTypes.string,
      pageSize: propTypes.number,
      category: propTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles:this.articles,
            loading:false,
            page:1
        }
    }
    apiKey = process.env.REACT_APP_NEWS_API_KEY;
    async componentDidMount(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false})
    }
    handleNextClick = async () => {
        if(!(Math.ceil(this.state.totalResults/`${this.props.pageSize}`) < this.state.page + 1)){
            const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();
        
            this.setState({
            articles:parsedData.articles,
            page:this.state.page+1,
            loading:false
            
        
        })
        }
    
    }
    handlePrevClick = async () => {
        const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
      
        this.setState({
            articles:parsedData.articles,
            page:this.state.page - 1,
            loading:false
        })
    }
    Capitalize = (str)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
   

  render() {
    return (
      <div className='container my=4'>
          <h1  style={{margin:"35px 0px",textAlign:"centre",marginTop:"90px"}}> NewsHub - Top {this.Capitalize(this.props.category)} Headlines</h1>
              {this.state.loading && <Spinner/>}
              <div className="row">
                  {!this.loading && this.state.articles && this.state.articles.map((element)=>{
                      return <div className="col-md-4" key={element.url}>
                          <NewsItem title={element.title?element.title:" "} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} date={element.publishedAt} author={element.author}/>
                      </div>
                  })}
              </div>
              <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
                <button type="button" disabled={Math.ceil(this.state.totalResults/`${this.props.pageSize}`) < this.state.page + 1} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>
      </div>
    )
  }
}

export default News
