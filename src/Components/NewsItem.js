import React, { Component } from 'react';

export class NewsBox extends Component {
   
  render() {
    let {title, description,imageUrl, newsUrl,source,date,author} = this.props
    return (
      <div className='my-3'>
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{left: '50%', zIndex: '1'}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small class="text-body-secondary">By {author} at {new Date(date).toGMTString()}</small></p>
          <a  href={newsUrl}  target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsBox
