import Error from "../components/error/Error";
import { Link } from "react-router-dom";

export function Page404() {
    return (
        <div>
            <Error />
            <p>Page doesnt exist</p>
            <Link to="/">Back to main page</Link>
        </div>
    );
}