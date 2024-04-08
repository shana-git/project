import React from 'react';
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

export default function AppBar(props) {
    const navigate = useNavigate()
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
                        navigate("/adminPage")
                    }
                }
            ]
        },
        

    ];

    // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    let end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" onChange={(e)=>props.setTxt(e.target.value)}/>
            {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );
    if (!props.flag)
        end = undefined

    return (
        <>

            <div className="card">
                <Menubar model={items} end={end} />
            </div>
        </>
    )
}
