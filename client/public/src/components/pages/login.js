
import React, { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useForm } from "react-hook-form";
import { Button } from 'primereact/button';
import { useLoginMutation, useRegisterMutation } from '../../slices/authApiSlice';
import {setToken} from '../../slices/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
const dispatch=useDispatch()
const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [loginFunc, { isError, error, isSuccess, data,isLoading }] = useLoginMutation()


    useEffect(()=>{
        if(isSuccess){
            dispatch(setToken(data))
            navigate("/adminPage")
        }
        
    })
    const onSubmit = (data1) => {
        loginFunc(data1)
    };



    return (
        <>
        {isLoading && <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
            <h1>כניסת משתמשים</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <i className="pi pi-user"></i>
                    <InputText placeholder="שם משתמש"
                        {...register("username", {
                            required: true,
                        })}
                    />
                </div>
                {errors?.username?.type === "required" && <p>זהו שדה חובה</p>}

                <br />
                <div>
                    <i className="pi pi-lock"></i>
                    <InputText placeholder="סיסמה"
                        {...register("password", {
                            required: true,
                        })}
                    />
                </div>
                {errors?.password?.type === "required" && <p>זהו שדה חובה</p>}

                <br />
                <Button type="submit" icon="pi pi-user "> כניסה  </Button>
            </form>


        </>
    )
}

export default Login









