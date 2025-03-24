import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import { useMarvelServer } from '../../API/server';
import { TransitionGroup, CSSTransition } from "react-transition-group"
import setContent from '../../utils/setContent';

const CharList = ({ setSelectedId }) => {
    const [state, setState] = useState({
        chars: [],
        offset: 0,
        end: false
    })
    const [newItemLoading, setNewItemLoading] = useState(false)

    const {  getAllChar, clearError, process, setProcess } = useMarvelServer();

    useEffect(() => {
        getSomeChars(offset, true)
    }, [])

    async function onCharsLoaded(newData) {
        let ended = newData.length < 9;

        setState((prev) => ({
            ...prev,
            chars: [...prev.chars, ...newData],
            offset: prev.offset + 9,
            end: ended
        }));
        setNewItemLoading(false)
    }

    function getSomeChars(offset, init) {
        clearError()
        init ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllChar(offset)
            .then(onCharsLoaded)
            .then(() => setProcess("confirmed"))
    }

    const refArr = useRef([]);
    function handleClick(id) {
        refArr.current.forEach(ref => ref.classList.remove("char__item_selected"));
        refArr.current[id].classList.add("char__item_selected");
        refArr.current[id].focus();
    }

    function charsListItems(arr) {
        const items = arr.map((char, index) => {
            let style = { objectFit: "cover" };
            const time = 500

            if (
                char.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                style = { objectFit: "contain" };
            }

            return (
                <CSSTransition
                    key={index}
                    timeout={time}
                    classNames="char__item">
                    <li
                        onClick={() => {
                            setSelectedId(char.id);
                            handleClick(index);
                        }}
                        ref={(elem) => refArr.current[index] = elem}
                        key={index}
                        className="char__item"
                    >
                        <img style={style} src={char.thumbnail} alt="abyss" />
                        <div className="char__name">{char.name}</div>
                    </li>
                </CSSTransition>
            );
        })
        return (
            <TransitionGroup component="ul" className="char__grid">
                {items}
            </TransitionGroup>
        )
    }

    const { chars, offset, end } = state

    return (
        <div className="char__list">
            {setContent(process, () => charsListItems(chars), newItemLoading)}
            <button style={{ "display": end ? "none" : "block" }} disabled={newItemLoading} onClick={() => getSomeChars(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


export default CharList;