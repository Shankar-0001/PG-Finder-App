import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useFormik } from "formik";
// import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import "./login.css";

export function LoginPage() {


    // const [userDetails]= useState({UserId:'admin', Password:'Admin@1'});
    const [cookie, setcookie, removecookie] = useCookies('userid')
    let navigate = useNavigate();



    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validationSchema: yup.object({
            UserName: yup.string().required("UserName Required").min(3, "Name too short").max(10, "Name too long"),
            Password: yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{3,15}/, "Password 3 to 15 atleast one uppercase letter")

        }),
        onSubmit: (formdata) => {
            axios.get('http://127.0.0.1:4040/users')
                .then((response) => {
                    var user = response.data.find(user => user.UserId === formdata.UserName)
                    if (user && user.Password === formdata.Password) {
                        setcookie('userid', formdata.UserName);
                        navigate('/home')
                    } else {
                        navigate('/invalid');
                    }
                })
        }
    })

    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit} >
                <h2>User Login</h2>
                <dl>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName" className="form-control" /></dd>
                    <dd className="text-danger"> {formik.errors.UserName} </dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control" /></dd>
                    <dd className="text-danger"> {formik.errors.Password} </dd>
                </dl>
                <button className="btn btn-success w-100">Login</button>
                <div>
                        <Link to="/signup" className="btn btn-outline-dark mt-2 w-100">New User Register</Link>
                </div>
            </form>
        </div>
    )
}
