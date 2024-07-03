
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

export function LoginPage() {


    const [userDetails]= useState({UserId:'admin', Password:'admin@1'});

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
        onSubmit: (user) => {
            if(user.UserName === userDetails.UserId && user.Password === userDetails.Password){
                navigate('/')
            }else{
                navigate('/invalid');
            }
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
                    <Link to='/signup'>SignUp Account</Link>
                </div>
            </form>
        </div>
    )
}
