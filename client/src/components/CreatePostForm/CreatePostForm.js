import './CreatePostForm.scss';
import {Formik, Form , Field, ErrorMessage} from "formik";
import {Button} from '../Button/Button';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreatePostForm = () => {

    const navigate = useNavigate();

    const initialValues={
        title: "",
        postText:"",
        username:""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required("Required"),
        postText: Yup.string().required("Required"),
        username: Yup.string().min(3).max(15).required("Required"),
    })
    const resetFormFields=()=>{
        document.getElementsByClassName("create-post-form")[0].reset();
    }
    const onSubmitHandler = async (values) => {
        await axios.post("http://localhost:3001/posts", values).then(
            (response) => {
                alert("Post created successfully");
                resetFormFields();
                navigate("/");
            }
        )
    }
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={validationSchema}>
                <Form className='create-post-form'>
                    <Field id="input-create-post" name="title" placeholder="Post Title"/>
                    <ErrorMessage name="title" component="span" className="error"/>
                    <Field id="input-create-post" name="postText" placeholder="What's happening?" type="textarea"/>
                    <ErrorMessage name="title" component="span" className="error"/>
                    <Field id="input-create-post" name="username" placeholder="Enter username"/>
                    <ErrorMessage name="title" component="span" className="error"/>

                    <Button type="submit" title="Post" onSubmit={onSubmitHandler}/>
                </Form>

            </Formik>
        </>
    );
}