import './singleChar.scss';
import { useParams } from "react-router-dom";
import { useMarvelServer } from '../../API/server';
import { useEffect, useState } from 'react';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import AppBanner from '../appBanner/AppBanner';

const SingleCharPage = () => {
    const [char, setChar] = useState(null)
    const { loading, error, getOneChar, clearError } = useMarvelServer()
    const { charId } = useParams()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    useEffect(() => {
        clearError()

        getOneChar(charId)
            .then(onCharLoaded)
    }, [charId]);

    const spinner = loading ? <Spinner /> : null,
        content = !(loading || error || !char) ? <View char={char} /> : null,
        errorMessage = error ? <Error /> : null

    return (
        <>
            <AppBanner />
            <div className="single-char">
                {content}
                {spinner}
                {errorMessage}
            </div>
        </>
    )
}

const View = ({ char }) => {
    let { name, thumbnail } = char
    let description = char.description || "Unfortunately, there is no description";

    return (
        <>
            <img src={thumbnail} alt="x-men" className="single-char__img"/>
            <div className="single-char__info">
                <h2 className='single-char__name'>{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </>
    )
}

export default SingleCharPage;