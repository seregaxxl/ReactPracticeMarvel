import './findChar.scss';
import useMarvelService from '../../services/MarvelService';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from 'yup';

const FindChar = () => {
    return (
        <Formik initialValues={{
            name:''
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .required(' Name is required')
        })}
        onSubmit={values => console.log(JSON.stringify(values, null, 2))}
        >
            <Form className="form">
                <h2>Or find character by name:</h2>
                <div class="grid_container">
                    <input
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                    placeHolder="Enter name"
                    />
                    <button class="button button__main" type="submit">
                        <div className="inner">Find</div>
                    </button>
                </div>
                
            </Form>
        </Formik>
    )
}

export default FindChar;