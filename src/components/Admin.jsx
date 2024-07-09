import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


export function Admin() {

    const [cookie, setcookie, removecookie] = useCookies('adminid');
    let navigate = useNavigate();

    const Formik = useFormik({
        initialValues: {
            AdminId: '',
            Password: ''
        },
        validationSchema: yup.object({
            AdminId: yup.string().required("AdminId is required").min(3, 'AdminId is too sort').max(15, 'AdminId is too long'),
            Password: yup.string().required().matches(/(?=.*[A-Z])\w{3,15}/, "Password should be 3 to 15")
        }),

        onSubmit:(formdata) =>{
            axios.get(`http://127.0.0.1:4040/admin`)
            .then((response) => {
                var admin = response.data.find(admin => admin.AdminId === formdata.AdminId)
                if(admin && admin.Password === formdata.Password){
                    setcookie('adminid', formdata.AdminId);
                    navigate('/home')
                }else{
                    navigate('/invalid');
                }
            })
        }
    })

    return (
        <div className="form-container align-items-center">
            <form onSubmit={Formik.handleSubmit} >
                <h3 className="bi bi-person-fill">Admin Login</h3>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="AdminId" className="form-control" onChange={Formik.handleChange} /></dd>
                    <dd></dd>

                    <dt>Password</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={Formik.handleChange} /></dd>
                </dl>
                <div>
                    <button className="btn btn-dark w-100">Login</button>
                </div>
            </form>
        </div>
    )
}