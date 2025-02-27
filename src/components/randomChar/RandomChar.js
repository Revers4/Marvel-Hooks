import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useMarvelServer } from '../../API/server';
import Spinner from "../spinner/Spinner"
import { useState, useEffect } from 'react';
import Error from '../error/Error';


const RandomChar = () => {
    const [char, setChar] = useState({})
    const { loading, error, getOneChar, clearError } = useMarvelServer()

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const getRandomChar = () =>{
        clearError()
        const charId = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;

        getOneChar(charId)
        .then(onCharLoaded)
    };

    useEffect(() =>{
        getRandomChar()
    },[])

        const spinner = loading ? <Spinner /> : null,
            content = !(loading || error || !char) ? <View char={char} /> : null,
            errorMessage = error ? <Error /> : null

        return (
            <div className="randomchar">
                {spinner}
                {content}
                {errorMessage}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={getRandomChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
}

const View = ({ char }) => {
    let { name, description, detail, wiki, thumbnail } = char
    let style = {'objectFit': 'cover'}

    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        style = {'objectFit': 'contain'} 
    }

    if (typeof description == "string" && description.length === 0) { description = "Unfortunately, there is no description" }
    if (typeof description == "string" && description.length > 160) { description = description.slice(0, 157) + "..." }

    return (
        <div className="randomchar__block">
            <img style={style} src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={detail} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;