import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import { Link } from "react-router-dom"
import * as Yup from "yup";
import './charSearch.scss';
import { useMarvelServer } from "../../API/server";
import { useState } from "react";
import Error from '../error/Error';

const searchSchema = Yup.object({
    name: Yup.string()
        .required("This field is required"),
});

export function CharSearch() {
    const { getOneCharByName, clearError, loading, error } = useMarvelServer();
    const [char, setChar] = useState(null)

    const onCharLoaded = (char) => {
        setChar(char)
    }

    function findChar(name) {
        clearError()
        getOneCharByName(name)
            .then(onCharLoaded)

    }

    const errorM = error ? <Error /> : null;
    const result = !char ? null : char.lenght > 0 ? <Success char={char} /> : "The character was not found. Check the name and try again"

    return (
        <div>
            <Formik
                initialValues={{ name: "" }}
                validationSchema={searchSchema}
                onSubmit={({ name }) => {
                    findChar(name)
                }}
            >
                <Form className="char-search">
                    <h3>Or find a character by name:</h3>
                    <div className="char-search__find">
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            className='char-search__input'
                            placeholder='Enter name' />
                        <button disabled={loading} type="submit" className='button button__main' >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <div className="char-search__answer">
                        <FormikErrorMessage name="name" component="div" className="char-search__message char-search__message-error" />
                        {result}
                    </div>
                </Form>
            </Formik>
            {errorM}
        </div>
    );
}

const Success = ( { name, id } ) => {
    return (
        <>
            <p className="char-search__message char-search__message-success">Ther is! Visit {name} page</p>
            <Link to={`/char/${id}`} className='button button__secondary'>
                <div className="inner">to page</div>
            </Link>
        </>
    )
}