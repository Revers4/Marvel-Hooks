import './singleComic.scss';
import { useParams, Link  } from "react-router-dom";
import { useMarvelServer } from '../../API/server';
import { useEffect, useState } from 'react';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';

const SingleComic = () => {
    const [comic, setComic] = useState({})
    const { loading, error, getOneComic, clearError } = useMarvelServer()
    const { comicId } = useParams()

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const getComic = () => {
        clearError()

        getOneComic(comicId)
        .then(onComicLoaded)
    }

    useEffect(() => {
        getComic()
    }, [comicId]);

    const spinner = loading ? <Spinner /> : null,
    content = !(loading || error || !comic) ? <View comic={comic} /> : null,
    errorMessage = error ? <Error /> : null

    return (
        <div className="single-comic">
            {content}
            {spinner}
            {errorMessage}
        </div>
    )
}

const View = ({ comic }) => {
    let { price, thumbnail, title, pages, description } = comic

    price === 0 ? price = "NOT AVAILABLE" : price = price + "$"

    return (
        <>
        <img src={thumbnail} alt="x-men" className="single-comic__img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
            <p className="single-comic__descr">{pages} pages</p>
            <p className="single-comic__descr">Language: en-us</p>
            <div className="single-comic__price">{price}</div>
        </div>
        <Link to="/comics" className="single-comic__back">Back to all</Link>
    </>
    )
}

export default SingleComic;