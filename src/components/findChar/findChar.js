import './findChar.scss';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

const FindChar = () => {
    
    const [char, setChar] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const {getCharByName, loading} = useMarvelService();
    const found = char && char.name ?
        <div className="found">
            There is! Visit <Link to={`/chars/${char.name}`}>
            {char.name}
                    </Link>  page?
        </div> : 
        <div className="not-found">
            The character was not found. Check the name and try again
        </div>
        
    const onCharLoaded = (char) => {
        setChar(char)}
    const handleChange = (event) => {
        setTrigger(false);
    }
    const spiner = loading ? <Spinner /> : null
    const content = !loading && trigger ?  found : null
    return (
        <Formik initialValues={{
            name:''
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                .required('This field is required')
        })}
        onSubmit={value => {
           (getCharByName(value.name)).then(onCharLoaded)
            setTrigger(true)
        }}
        >
            {({values}) => (<Form className="form">
                <h2>Or find character by name:</h2>
                <div class="grid_container">
                    <Field
                    label='Ваше имя'
                    id="name"
                    name="name"
                    type="text"
                    placeHolder="Enter name"
                    />
                    <button 
                    class="button button__main" 
                    type="submit"
                    disabled={loading}>
                        <div className="inner">Find</div>
                    </button>
                </div>
                <ErrorMessage className="error" name='name'component='div'/>
                {spiner}
                {values.name ? content : null}
            </Form>)}
        </Formik>
    )
}



// const CustomInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//       <>
//         <label htmlFor={props.id || props.name}>{label}</label>
//         <input {...field} {...props} />
//         {meta.touched && meta.error ? (
//           <div className="error">{meta.error}</div>
//         ) : null}
//       </>
//     );
//   };
  
//   const FindChar = () => {
//     const [char, setChar] = useState([]);
//         const [trigger, setTrigger] = useState(false);
//         const {getCharByName, loading} = useMarvelService();
//         const found = char && char.name ?
//             <div className="found">
//                 There is! Visit <Link to={`/chars/${char.name}`}>
//                 {char.name}
//                         </Link>  page?
//             </div> : 
//             <div className="not-found">
//                 The character was not found. Check the name and try again
//             </div>
            
//         const onCharLoaded = (char) => {
//             setChar(char)}
//         const handleChange = (event) => {
//             const { name, value } = event.target;
//             setFieldValue(name, value);
//             setTrigger(false);
//         }
//         const spiner = loading ? <Spinner /> : null
//         const content = !loading && trigger ?  found : null
  
//     return (
//       <Formik
//         initialValues={{
//           name: "",
//         }}
//         validationSchema={Yup.object({
//           name: Yup.string().required("This field is required"),
//         })}
//         onSubmit={(value) => {
//           getCharByName(value.name).then(onCharLoaded);
//           setTrigger(true);
//         }}
//       >
//         {({ values }) => (
//           <Form className="form">
//             <h2>Or find character by name:</h2>
//             <div class="grid_container">
//               <CustomInput
//                 label="Enter name"
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={values.name}
//                 onChange={handleChange}
//               />
//               <button class="button button__main" type="submit">
//                 <div className="inner">Find</div>
//               </button>
//             </div>
//             <ErrorMessage className="error" name="name" component="div" />
//             {spiner}
//             {content}
//           </Form>
//         )}
//       </Formik>
//     );
//   };

export default FindChar;