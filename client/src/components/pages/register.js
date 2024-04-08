
import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import {useRegisterMutation } from '../../slices/authApiSlice';
import {setToken} from '../../slices/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast'
import AppBar from '../appBar';



const Register = () => {
    const toast = React.useRef(null);

const dispatch=useDispatch()
const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [registerFunc, { isError, error, isSuccess, data,isLoading }] = useRegisterMutation()

    const formik = useFormik({
        initialValues: {
            username: '',
            password:'',
            email:'',
            phone:''
        },
        validate: (data) => {
            let errors = {};

            if (!data.username) {
                errors.username = 'זהו שדה חובה';
            }

            if (!data.password) {
                errors.password = 'זהו שדה חובה';
            }
            if(!data.email.includes('@')) {
                errors.email ='מייל לא תקין';
            }

            return errors;
        },
        onSubmit: (data) => {
            registerFunc(data)
            formik.resetForm();
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    useEffect(()=>{
        if(isSuccess){
            dispatch(setToken(data))
            navigate("/login")
        }
        if (isError)
        {
            toast.current.show({ severity: 'error', summary:'שגיאה', detail: 'יש להכניס שם משתמש ייחודי' });
        }
}, [isSuccess,isError])
        

    return (
        <>
        <AppBar/>
        {isLoading && <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
            <h1>הוספת מזכירה</h1>
            <br />
        <br />

        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
            
                <Toast ref={toast} />
                <span className="p-float-label p-input-icon-right">
                    <InputText
                        id="username"
                        name="username"
                        value={formik.values.personame}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value);
                        }}
                    />
                    <label htmlFor="value">שם</label>
                    <i className="pi pi-user" style={{ marginRight: "7px" }} />
                </span>
                {getFormErrorMessage('username')}

                <br/>
                <span className="p-float-label p-input-icon-right">
                <Password
                    inputId="password"
                    name="password"
                    rows={5}
                    cols={30}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                    value={formik.values.password}
                    feedback={false}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                    toggleMask 
                />
                <label htmlFor="value">סיסמה</label>
                </span>
                {getFormErrorMessage('password')}


                <br/>
                <span className="p-float-label p-input-icon-right">
                    <InputText
                        id="email"
                        name="email"
                        value={formik.values.personame}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                        onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                        }}
                    />
                    <label htmlFor="value">מייל</label>
                    <i className="pi pi-at" style={{ marginRight: "7px" }} />
                </span>
                {getFormErrorMessage('email')}

                <br/>
                <span className="p-float-label p-input-icon-right">
                    <InputText
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('phone') })}
                        onChange={(e) => {
                            formik.setFieldValue('phone', e.target.value);
                        }}
                    />
                    <label htmlFor="value">טלפון</label>
                    <i className="pi pi-phone" style={{ marginRight: "7px" }} />
                </span>
                {getFormErrorMessage('phone')}


                <Button label="הוספה" type="submit" icon="pi pi-check" />
            </form>
        </div>
        </>
    )
}

export default Register









