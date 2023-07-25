import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import Loader from './Loader/Loader'
import NewsItems from './NewsItems';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    useEffect(() => {
        document.title = `${props.category} - News`;
        d();
        // eslint-disable-next-line
    }, [])

    const d = async () => {
        props.setProgress(0);
        const pageUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=18`;
        const data = await fetch(pageUrl);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    const fetchMore = async () => {
        props.setProgress(0);
        setPage(page + 1);
        const pageUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=18`;
        const data = await fetch(pageUrl);
        const parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    return (
        <>
            <div className="container">
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMore}
                    hasMore={articles.length !== totalResults}
                    loader={<Loader />}
                    endMessage={<p>No more data to load.</p>}
                >
                    <div className="container" style={{ marginTop: '50px' }}>
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems source={element.source.name} URL={element.url} title={element.title} description={element.description} imageURL={element.urlToImage} date={element.publishedAt} author={element.author} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}
News.defaultProps = {
    country: "in",
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
}
export default News;