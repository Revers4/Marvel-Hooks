import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/Page404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage />}/>
                            <Route path="/comics" element={<ComicsPage />}/>
                            <Route path="/comics/:comicId" element={<SingleComicPage />}/>
                            <Route path="/char/:charId" element={<SingleCharPage />}/>
                            <Route path="*" element={<Page404 />}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;