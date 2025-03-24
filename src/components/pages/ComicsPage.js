import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

export default function ComicsPage() {
    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    );
}