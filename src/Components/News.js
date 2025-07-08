import React, { Component } from 'react'
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './spinner.js';
import propTypes from "prop-types";

export class News extends Component {
    defaultProps = {
        country: 'us',
        pageSize: 4,
        category: 'general',
    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number,
        category: propTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    apiKey = process.env.REACT_APP_NEWS_API_KEY;
    async componentDidMount() {
        this.fetchNews();
    }
    fetchNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles.slice(0, 4)),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    loadFunc = () => {
        this.setState({ page: this.state.page + 1 }, this.fetchNews);
    }
    render() {
        return (
            <div className='container my=4'>
                <h1 style={{ margin: "35px 0px", textAlign: "center", marginTop: "90px" }}> NewsHub - Top {this.Capitalize(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.loadFunc}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} date={element.publishedAt} author={element.author} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News

