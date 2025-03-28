import { Helmet } from "react-helmet";
import Error from "../error/Error";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div>
            <Helmet>
                <meta name="description" content="Error 404 - Page not found. Return to the Marvel Information Portal homepage." />
                <title>Error 404 | Marvel Information Portal</title>
            </Helmet>
            <Error />
            <p>Page doesnt exist</p>
            <Link to="/">Back to main page</Link>
        </div>
    );
}