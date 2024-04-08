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

    const [date, setDate] = useState(props.date?.split("T")[0])

    const [value, setValue] = useState();


    const toast = useRef(null);

    const selectedPersonTemplate = (option, props) => {
        if (option) {
            setId(option._id)
            setType(option.personType)
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
            console.log(formik.values);
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
        let updatedPay;
        if (props.eventType === "בוקר") {
            updatedPay = type === "חבר" ? 900 : type === "שותף" ? 500 : 1200;
        } else if (props.eventType === "ערב" || props.eventType === "מוצש") {
            updatedPay = type === "חבר" ? 1500 : type === "שותף" ? 600 : 2200;
        } else if (props.eventType === "יום שלם") {
            updatedPay = type === "חבר" ? 3000 : type === "שותף" ? 2000 : 3500;
        } else if (props.eventType === "שבת") {
            updatedPay = type === "חבר" ? 2500 : type === "שותף" ? 2000 : 3200;
        } else if (props.eventType === "קידוש") {
            updatedPay = type === "חבר" ? 250 : type === "שותף" ? 250 : 2000;
        }

        updatedPay += formik.values.speakers ? 200 : 0;

        if (formik.values.price !== updatedPay) {
            formik.setFieldValue('price', updatedPay);
        }
    };

    const handleCheckboxChange = (e) => {
        formik.setFieldValue('speakers', e.checked);
        let updatedPay = formik.values.price;
        if (e.checked) {
            updatedPay += 200;
        }
        else
            updatedPay -= 200;

        formik.setFieldValue('price', updatedPay);
    };

    useEffect(() => {
        if (type) {
            price();
        }
    }, [type])

    return (
        <>
            <div >
                <Dialog header={str} visible={visible} style={{ width: '50vw' }} onHide={() => { setVisible(false); props.setVisible(false) }} >
                    <AddPersonDialog />
                    <form onSubmit={formik.handleSubmit}>
                        <Toast ref={toast} />
                        <span className="p-float-label md:w-12rm">
                            <Dropdown
                                className="w-full md:w-15rm"
                                name="personname"
                                value={formik.values.personname}
                                options={customers}
                                optionLabel="personname"
                                placeholder="בחר לקוח"
                                showClear filter valueTemplate={selectedPersonTemplate} itemTemplate={eventOptionTemplate}
                                onChange={(e) => {
                                    formik.setFieldValue('personname', e.value);
                                }}
                            />
                            <i className="pi pi-dollar" style={{ marginRight: "7px" }} />
                        </span>
                        {getFormErrorMessage("personname")}

                        <br />
                        <div className="card flex justify-content-center">
                            <Checkbox
                                checked={formik.values.speakers}
                                onChange={handleCheckboxChange}
                                value={"הגברה"}></Checkbox>
                            <label htmlFor="ingredient1" className="ml-2" >  הגברה </label>
                        </div>
                        <br />
                        {getFormErrorMessage("speakers")}


                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                defaultValue={formik.values.price}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('price') })}
                                onBlur={(e) => {
                                    console.log('price value', e.target.value);
                                    formik.setFieldValue('price', e.target.value);
                                }}
                            />
                            <label htmlFor="value">מחיר</label>
                            <i className="pi pi-dollar" style={{ marginRight: "7px" }} />
                        </span>
                        {getFormErrorMessage("price")}


                        <br />
                        <br />
                        <br />

                        <span className="p-float-label p-input-icon-right">                         
                             <InputTextarea
                            value={formik.values.comment}
                            onChange={(e) => {
                                formik.setFieldValue('comment', e.target.value);
                            }} />
                            <i className="pi pi-dollar" style={{ marginRight: "7px" }} />
                        </span>

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
