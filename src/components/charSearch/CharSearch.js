import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom"
import * as Yup from "yup";
import './charSearch.scss';
import { useMarvelServer } from "../../API/server";

const searchSchema = Yup.object({
    name: Yup.string()
        .required("This field is required"),
});

export function CharSearch() {
    const { getOneCharByName } = useMarvelServer()
    return (
        <Formik
            initialValues={{ name: "" }}
            validationSchema={searchSchema}
            onSubmit={({ name }, { setSubmitting, setErrors, setStatus }) => {
                setErrors({});
                setStatus({})
                getOneCharByName(name)
                    .then((data) => {
                        setStatus({ success: `There is! Visit ${name} page?`, id: data.id })
                    })
                    .catch(() => setErrors({ name: "The character was not found. Check the name and try again" }))
                    .finally(() => setSubmitting(false))
            }}
        >
            {({ isSubmitting, status, errors }) => (<Form className="char-search">
                <h3>Or find a character by name:</h3>
                <div className="char-search__find">
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        className='char-search__input'
                        placeholder='Enter name' />
                    <button disabled={isSubmitting} type="submit" className='button button__main' >
                        <div className="inner">find</div>
                    </button>
                </div>
                <div className="char-search__answer">
                    <ErrorMessage name="name" component="div" className="char-search__message char-search__message-error" />
                    {!errors.name && status?.success && (
                        <>
                            <p className="char-search__message char-search__message-success">{status.success}</p>
                            <Link to={`/char/${status.id}`} className='button button__secondary'>
                                <div className="inner">to page</div>
                            </Link>
                        </>
                    )}
                </div>
            </Form>)}
        </Formik>
    );
}