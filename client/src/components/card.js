import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import UpdateDialog from './updatePersonDialg';

export default function PersonCard(props) {
    const header = (
        <img alt="Card" src="./user.jpg" style={{width:'50%'}}/>
    );
    const footer = (
        <>
            <UpdateDialog customer={props.customer}/>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title={props.customer.personname} subTitle={props.customer.personType} footer={footer} header={header} className="md:w-20rem">
            <p className="m-0">
                    {props.customer.email}
                </p>
                <p className="m-0">
                    {props.customer.phone}
                </p>
            </Card>
        </div>
    )
}
        