import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useUpdatePersonMutation } from "../slices/personApiSlice";

export default function UpdateDialog(props) {

    const [selectedCity, setSelectedCity] = useState(null);

    const cities = [{ name: 'חבר' }, { name: 'שותף' }, { name: 'אורח' }];

    const [visible, setVisible] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [updatePerson, { data:res, isLoading, isError, error }] = useUpdatePersonMutation()

    const onSubmit = (data1) => {
        isError &&  console.log(JSON.stringify(error));
    
        if(!data1.personType )
           data1.personType=props.customer.personType
        const data2={...data1 , _id:props.customer._id}
        updatePerson(data2)
        console.log("update")
       
    };


    return (
        <div className="card flex justify-content-center">
            <Button label="עדכון" icon="pi pi-user-edit" onClick={() => setVisible(true)} />
            <Dialog header="עריכת משתמש" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <i className="pi pi-user"></i>
                        <InputText placeholder="שם משתמש"
                            {...register("personname", {
                            })}
                            defaultValue={props.customer.personname}
                        />
                    </div>
                    <br />           
                    <div>
                        <i className="pi pi-phone"></i>
                        <InputText placeholder="טלפון"
                            {...register("phone", {
                                required: true,
                            })}
                            defaultValue={props.customer.phone}
                        />
                    </div>
                    {errors?.phone?.type === "required" && <p>זהו שדה חובה</p>}
                    <br />
                    <div>
                        <i className="pi pi-at"></i>
                        <InputText placeholder="מייל"
                            {...register("email", {
                            })}
                            defaultValue={props.customer.email}

                        />
                    </div>

                    <div className="card flex justify-content-center">
                        <i className="pi pi-check"></i>
                        <Dropdown value={selectedCity} options={cities} optionLabel="name"
                            placeholder="Select a role" className="w-full md:w-16rem"
                            {...register("personType", {
                            })}
                            onChange={(e) => setSelectedCity(e.value)}
                            defaultValue={props.customer.role}
                        />
                    </div>

                    <div>
                        <Button type="submit" label="עדכן" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                    </div>


                </form>

            </Dialog>
        </div>
    )
}
