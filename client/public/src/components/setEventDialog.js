import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { useGetpersonsQuery } from "../slices/personApiSlice";
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "../slices/eventApiSlice";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";

export default function SetEventDialog(props) {

    const [visible, setVisible] = useState(props.visible);
    const [value, setValue] = useState('');

    const str = `עריכת אירוע ${props.eventType}`

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const [deleteEvent, { data: res, isLoading, isError, error }] = useDeleteEventMutation()

    const [updateEvent, { data: updateres, updateisLoading, updateisError, updateerror }] = useUpdateEventMutation()


    const onSubmit = (data1) => {
        let data2 = { ...data1, _id:props.event?._id, date: props.event?.date, eventType: props.eventType }
        props.setVisible(false)
        updateEvent(data2)
    };

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);


    return (
        <>
            <div >
                <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); props.setVisible(false) }} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>שם לקוח : {props.event?.personId?.personname}</h3>
                        <br />
                        <div>
                            <InputText placeholder="מחיר" className="md:w-19rem"
                                {...register("price", {
                                })}
                                defaultValue={props.event?.price}
                            />
                        </div>
                        {errors?.price?.type === "required" && <p>זהו שדה חובה</p>}
                        <br />

                        <div className="card flex justify-content-center">
                            <InputTextarea autoResize value={value}   {...register("coments", {})}  defaultValue={props.event?.coments}
                                onChange={(e) => setValue(e.target.value)} rows={5} cols={30} placeholder="הערות" />
                        </div>
                        <br />
                        <div>
                            <Button type="submit" label="עדכון" icon="pi pi-check" autoFocus />
                        </div>
                    </form>
                    <br />
                    <Button label="מחיקה" icon="pi pi-trash" onClick={()=>{deleteEvent(props.event._id); setVisible(false); props.setVisible(false)}} autoFocus />

                </Dialog>
            </div>
        </>
    )
}
