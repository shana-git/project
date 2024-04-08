import React, { useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Link, useNavigate } from 'react-router-dom';
import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import {Menu} from 'primereact/menu'
import {  useSelector ,useDispatch } from 'react-redux';
import { removeToken } from '../slices/authSlice';
import apiSlice from '../slices/apiSlice';
import { Button } from '@mui/material';

export default function AppBar(props) {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {isUserLoggedIn} = useSelector((state)=>state.auth)

    const items2=[
        {
            label: 'התנתקות',
            icon: 'pi pi-',
            command: () => {      
                logOut()
        }
        }
    ]
    const items = [
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            command: () => {
                navigate("/adminPage")
            }

        },
        {
            label: 'לקוחות',
            icon: 'pi pi-users',
            command: () => {
                navigate("/customers")
            }
        },
        {
            label: 'הוספת מזכירה',
            icon: 'pi pi-user-plus',
            command: () => {
                navigate("/register")
            }
        },
        {
            label: 'אירועים',
            icon: 'pi pi-calendar',
            items: [
                {
                    label: 'קביעת אירועים',
                    icon: 'pi pi-calendar-plus',
                    command: () => {
                        navigate("/events")
                    }
                },
                {
                    label: 'אירועי השבוע',
                    icon: 'pi pi-bars',
                    command: () => {
                        navigate("/weekEvents")
                    }
                }
            ]
        }



    ];
const logOut=()=>{
    dispatch(apiSlice.util.resetApiState())
    dispatch(removeToken())
    navigate("/")

}
    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    let end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e) => props.setTxt(e.target.value)} />
            {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );
    if (!props.flag)
        end = undefined


    const menuRight=useRef(null)

    const userFullName = localStorage.getItem('username') || '?'
    const start = <Avatar size="medium" label={userFullName.charAt(0)} style={{ backgroundColor: '#6381AC', color: '#fff', fontSize: 18, cursor: 'pointer' }} shape="circle"
        onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup />


    return (
        <>

            <div className="card">
                <Menubar model={isUserLoggedIn && items} end={end} start={start} />
                <Menu model={items2} popup ref={menuRight} id="popup_menu_right" popupAlignment="right"/>
                {!isUserLoggedIn && <h3>יש לבצע כניסה</h3>}
                {!isUserLoggedIn &&  <Button type="submit" icon="pi pi-user " onClick={()=>{navigate('/login')}}>כניסה למערכת</Button>}
            </div>
        </>
    )
}
