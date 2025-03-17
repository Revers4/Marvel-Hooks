import CharInfo from "../charInfo/CharInfo";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import { useState } from 'react';
import decoration from '../../resources/img/vision.png';


export default function MainPage() {
    const [selectedId, setSelectedId] = useState(null)

    const ChangeId = (selectedId) => {
        setSelectedId(selectedId)
    }


    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList setSelectedId={ChangeId} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo selectedId={selectedId} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
}