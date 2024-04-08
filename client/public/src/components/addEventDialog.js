import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useForm } from "react-hook-form";
import { InputNumber } from 'primereact/inputnumber';
import { useGetpersonsQuery } from "../slices/personApiSlice";
import { useCreateEventMutation } from "../slices/eventApiSlice";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from "primereact/inputtextarea";
import AddPersonDialog from "./addPersonDialog";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

export default function AddEventDialog(props) {

    const [visible, setVisible] = useState(props.visible);

    const [selectedPerson, setselectedPerson] = useState(null);

    const str = `הוספת אירוע ${props.eventType}`

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { data: customers, customerisLoading, customerisError, customererror } = useGetpersonsQuery()

    const [CreateEvent, { data: res, isLoading, isError, error }] = useCreateEventMutation()

    const [id, setId] = useState('')
    const [type, setType] = useState('')
    const [pay, setPay] = useState()
    const [final, seFinal] = useState(0)

    const [date, setDate] = useState(props.date?.split("T")[0])

    const [value, setValue] = useState();

    const [checked, setChecked] = useState(false);

    const toast = useRef(null);

    const selectedPersonTemplate = (option, props) => {
        if (option) {
            setId(option._id)
            setType(option.personType)
            price();
            return (
                <div className="flex align-items-center">
                    <div>{option.personname}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const eventOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.personname}</div>
            </div>
        );
    };

    // const show = (data) => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: `${data.city.name}` });
    // };

    const formik = useFormik({
        initialValues: {
            personname: '', 
            price: '', 
            speakers: false,
            comment: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.personname) {
                errors.personname = 'זהו שדה חובה';
            }
            if (!data.price) {
                errors.price = 'זהו שדה חובה';
            }

            return errors;
        },
        onSubmit: (data1) => {
            let data2 = { ...data1, personId: id, date: date, eventType: props.eventType }
            CreateEvent(data2)
            props.setVisible(false)
            formik.resetForm()
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const price = () => {
        if (props.eventType == "בוקר") {
            type == "חבר" ? setPay(900) : type == "שותף" ? setPay(500) : setPay(1200)
        }
        else if (props.eventType == "ערב" || props.eventType == "מוצש") {
            type == "חבר" ? setPay(1500) : type == "שותף" ? setPay(600) : setPay(2200)
        }
        else if (props.eventType == "יום שלם ") {
            type == "חבר" ? setPay(3000) : type == "שותף" ? setPay(2000) : setPay(3500)
        }
        else if (props.eventType == "שבת") {
            type == "חבר" ? setPay(2500) : type == "שותף" ? setPay(2000) : setPay(3200)
        }
        else if (props.eventType == "קידוש") {
            type == "חבר" ? setPay(250) : type == "שותף" ? setPay(250) : setPay(2000)
        }
        // if(formik.values.speakers)
        // {
        // if(!checked)
        // console.log("aaaaaaaaa");
        //      setPay(pay+200)
        //  }

    }
    // const addSpeaker=()=>{
    //     console.log("add");
    //     console.log(pay);
    //     if(!checked)
    //     {
    //        console.log("if");
    //        setPay(pay+200)
    //      }
    // }


    // useEffect(() => {
    //     if (checked) {
    //         console.log("aaaa");
    //         seFinal(pay+200);
    //         setPay(final);
    //         console.log(pay);
    //     }
    // }, [checked])


    return (
        <>
            <div >
                <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); props.setVisible(false) }} >
                    <AddPersonDialog />
                    <form onSubmit={formik.handleSubmit}>
                        <Toast ref={toast} />
                        <Dropdown
                            className="w-full md:w-15rm"
                            name="personname"
                            value={formik.values.personname}
                            options={customers}
                            optionLabel="personname"
                            placeholder="בחר לקוח"
                            showClear filter valueTemplate={selectedPersonTemplate} itemTemplate={eventOptionTemplate}
                            onChange={(e) => {
                                { formik.setFieldValue('personname', e.value); }
                            }}
                        />
                        {getFormErrorMessage("personname")}

                        <br />
                        <div className="card flex justify-content-center">
                            <Checkbox
                                checked={checked}
                                placeholder="מחיר "
                                onChange={(e) => {
                                    {formik.setFieldValue('speakers', e.checked); }
                                }}
                                // onClick={()=>{
                                //     setChecked(!checked);
                                //     setPay(pay+200);
                                // }} 
                                
                                value={"הגברה"}></Checkbox>
                            <label htmlFor="ingredient1" className="ml-2" >  הגברה </label>
                        </div>
                        <br />
                        {getFormErrorMessage("speakers")}


                        <div>
                            <InputNumber
                                value={pay}
                                onChange={(e) => {
                                    formik.setFieldValue('price', e.value);
                                }}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                            />
                            {/* <InputText placeholder="מחיר" className="md:w-19rem" type="Number"
                                {...register("price", {
                                    required: true,
                                },
                                )}
                                defaultValue={pay}
                            /> */}
                        </div>
                        {getFormErrorMessage("price")}

                        {/* {errors?.price?.type === "required" && <p>זהו שדה חובה</p>} */}

                        <br />


                        <div className="card flex justify-content-center">
                            <InputTextarea autoResize value={value}   {...register("coments", {})}
                                onChange={(e) => setValue(e.target.value)} rows={5} cols={30} placeholder="הערות" />
                        </div>
                        <br />
                        <div>
                            <Button type="submit" label="הוסף" icon="pi pi-check" autoFocus />
                        </div>
                    </form>
                </Dialog>
            </div>

        </>
        
    )
}
