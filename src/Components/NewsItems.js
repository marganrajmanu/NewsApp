import React from 'react'

const NewsItems = (props) => {
    let { title, description, imageURL, URL, source, date, author } = props;
    return (
        <div className="card my-4">
            <span className="position-absolute top-0 translate-middle badge rounded-pill text-bg-info" style={{ left: '88%', zIndex: '1' }}>
                {source}
            </span>
            <img src={imageURL} className="card-img-top" alt={imageURL} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                    {description}
                </p>
                <a href={URL} className="btn btn-primary">
                    Read More
                </a>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
            </div>
        </div>
    )
}
export default NewsItems;