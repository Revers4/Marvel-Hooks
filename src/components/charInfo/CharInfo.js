import './charInfo.scss';
import { useEffect, useState } from 'react';
import Spinner from "../spinner/Spinner"
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';
import { useMarvelServer } from '../../API/server';

const CharInfo = ({ selectedId }) => {
    const [char, setChar] = useState(null)

    const { loading, error, getOneChar, clearError } = useMarvelServer();

    const onCharLoaded = (char) => { setChar(char) }

    const getChar = () => {
        if (!selectedId) {
            return;
        }
        if (error) { clearError() }

        getOneChar(selectedId)
            .then(onCharLoaded)
    };

    useEffect(() => {
        getChar()
    }, [selectedId])

    const content = !(loading || error || !char) ? <View char={char} /> : null,
        spinner = loading && char ? <Spinner /> : null,
        errorMessage = error ? <Error /> : null,
        skeleton = loading || char || error ? null : <Skeleton />

    return (
        <div className="char__info">
            {content}
            {skeleton}
            {spinner}
            {errorMessage}
        </div>
    )
}

const View = ({ char }) => {

    let { name, description, detail, thumbnail, wiki, comics } = char

    let style = { 'objectFit': 'cover' }

    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = { 'objectFit': 'contain' }
    }


    return (
        <>
            <div className="char__basics">
                <img style={style} src={thumbnail} alt="abyss" />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={detail} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? (
                    comics.map((comic, index) => (
                        <li key={index} className="char__comics-item">
                            {comic.name}
                        </li>
                    ))
                ) : (
                    <li className="char__comics-item">Unfortunately, there are no comics</li>
                )}
            </ul>
        </>
    )
}

export default CharInfo;