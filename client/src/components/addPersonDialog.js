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
import { useCreatePersonMutation, useUpdatePersonMutation } from "../slices/personApiSlice";

export default function AddPersonDialog() {

    const [selectedCity, setSelectedCity] = useState(null);

    const cities = [{ name: 'חבר' }, { name: 'שותף' }, { name: 'אורח' }];

    const [visible, setVisible] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [CreateCustomer, { data: res, isLoading, isError, error }] = useCreatePersonMutation()

    const onSubmit = (data1) => {
        if (!data1.personType)
            data1.personType = "אורח"
        CreateCustomer(data1)
    };


    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-user-plus" rounded outlined aria-label="Filter" onClick={() => setVisible(true)} />
            <Dialog header="יצירת לקוח" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <div>
                        <i className="pi pi-user"></i>
                        <InputText placeholder="שם "
                            {...register("name", {
                            })} 
                        />
                    </div>
                    <br /> */}
                    <div>
                        <i className="pi pi-user"></i>
                        <InputText placeholder="שם משתמש ייחודי"
                            {...register("personname", {
                                required: true,
                            })} 
                        />
                    </div>

                    <br />


                    <div>
                        <i className="pi pi-phone"></i>
                        <InputText placeholder="טלפון"
                            {...register("phone", {
                                required: true,
                            })}
                        />
                    </div>
                    {errors?.phone?.type === "required" && <p>זהו שדה חובה</p>}


                    <br />

                    <div>
                        <i className="pi pi-at"></i>
                        <InputText placeholder="מייל"
                            {...register("email", {
                            })}

                        />
                    </div>

                    <div className="card flex justify-content-center">
                        <i className="pi pi-check"></i>
                        <Dropdown value={selectedCity} options={cities} optionLabel="name"
                            placeholder="Select a role" className="w-full md:w-16rem"
                            {...register("personType", {
                            })}
                            onChange={(e) => setSelectedCity(e.value)}
                        />
                    </div>

                    <div>
                        <Button type="submit" label="הוסף" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                    </div>


                </form>

            </Dialog>
        </div>
    )
}
