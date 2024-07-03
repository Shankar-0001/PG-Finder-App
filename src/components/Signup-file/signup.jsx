
import { Link } from 'react-router-dom'
import './signup.css'
import { useFormik } from 'formik';
import * as yup from 'yup';

export function SignUp() {


    const formik = useFormik({
        initialValues: {
            UserId:'',
            UserName: '',
            Password: 0,
            UserEmail: ''
        },
        validationSchema: yup.object({
            UserId: yup.string().required('UserId Required').min(3, 'UserId is too sort.').max(15, 'UserId is too long.'),
            UserName: yup.string().required('UserName Required').min(3, 'UserName is too sort.').max(15, 'UserName is too long.'),
            Password: yup.string().required('Password Required').matches(/(?=.*[A-Z])\w{4,15}/, "Password should Axyz@1"),
            Email: yup.string().required('Please enter a valid email')
        }),
        onSubmit:(values)=>{
            alert(JSON.stringify(values));
        }
    })


    return (
        <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
                <h5> <span className="bi bi-person"></span> Create User Account</h5>
                <dl>
                    <dt>Create UserId</dt>
                    <dd><input type="text" placeholder="Enter your UserId" className="form-control" name='UserId' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.UserId}</dd>
                    
                    <dt>Create UserName</dt>
                    <dd><input type="text" placeholder="Enter your Name" className="form-control" name='UserName' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.UserName}</dd>
                    <dt>Create Password</dt>
                    <dd><input type="passwrod" placeholder="Enter your password" className="form-control" name='Password' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.Password}</dd>
                    <dt>Enter your Email</dt>
                    <dd><input type="email" placeholder="email@gmail.com" className="form-control" name='Email' onChange={formik.handleChange} /></dd>
                    <dd className='text-danger'>{formik.errors.Email}</dd>
                </dl>
                <button className="w-100 form-control bg-success">SignUp</button>
                <div>
                    <Link to='/login'>Login</Link>
                </div>
            </form>
        </div>
    )
}