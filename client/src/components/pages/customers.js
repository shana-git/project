import { useGetpersonsQuery } from "../../slices/personApiSlice"
import AppBar from "../appBar"
import PersonCard from "../card"
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Button } from 'primereact/button';
import AddPersonDialog from "../addPersonDialog";
import { useState } from "react";


const Customer = () => {
    const [txt,setTxt]=useState("")
    const { data: customers, isLoading,isError, error } = useGetpersonsQuery()
    if (isLoading) return <h1>loading</h1>
    if (isError) return <h1>error</h1>


    return (
        <>
            <AppBar  flag={true} setTxt={setTxt}/>
            <AddPersonDialog/>
            {customers.map(customer =>customer.personname.includes(txt) && <PersonCard customer={customer}/>)}
        </>
    )
}

export default Customer