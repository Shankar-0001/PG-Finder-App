
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export function SignUp() {

    let navigate = useNavigate();
    const [error, setError] = useState('');
    const [usererror, setUserError] = useState('');
    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName: '',
            Password: 0,
            Email: ''
        },
        validationSchema: yup.object({
            UserId: yup.string().required('UserId Required').min(3, 'UserId is too sort.').max(15, 'UserId is too long.'),
            UserName: yup.string().required('UserName Required').min(3, 'UserName is too sort.').max(15, 'UserName is too long.'),
            Password: yup.string().required("Password Required").matches(/(?=.*[A-Z])\w{3,15}/, "Password 3 to 15 atleast one uppercase letter"),
            Email: yup.string().required('Please enter a valid email')
        }),
        onSubmit: (user) => {
            axios.post(`http://127.0.0.1:4040/register-users`, user)
                .then(() => {
                    swal({
                        title: "Registered Successfully!",
                        icon: "success",
                    });
                    navigate('/')
                })
        }
    })

    function VerifyUserId(e) {
        axios.get(`http://127.0.0.1:4040/users`)
            .then(response => {
                for (var user of response.data) {
                    if (user.UserId === e.target.value) {
                        setError('UserId taken - Try Another');
                        setUserError('text-danger')
                        break;
                    } else {
                        setError('Available')
                        setUserError('text-success')
                    }
                }
            })
    }


    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <h5> <span className="bi bi-person"></span> Create User Account</h5>
                <dl>
                    <dt>Create UserId</dt>
                    <dd><input type="text" className="form-control" name='UserId' onChange={formik.handleChange} onKeyUp={VerifyUserId} /></dd>
                    <dd className={usererror} style={{ color: "red" }}> {error}</dd>

                    <dt>Create UserName</dt>
                    <dd><input type="text" className="form-control" name='UserName' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.UserName}</dd>

                    <dt>Create Password</dt>
                    <dd><input type="password" className="form-control" name='Password' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.Password}</dd>

                    <dt>Enter your Email</dt>
                    <dd><input type="email" className="form-control" name='Email' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.Email}</dd>
                </dl>
                <button className="w-100 form-control bg-success">SignUp</button>
                <div>
                    <Link to='/' className='btn btn-outline-dark mt-2 w-100 form-control'> Existing User Login</Link>
                </div>
            </form>
        </div>
    )
}