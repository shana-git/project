import AppBar from "../appBar"
import Calendar from "../calander"
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import DatePeaker from "../datePeaker";
import { useState } from "react";

const Events = () => {
  const [date,setDate2]=useState(new Date())
    return (
        <>
            <AppBar/>
            <div className="flex align-items-center">
            <Card className="cal">
            <DatePeaker date={date} setDate={setDate2}/>
            <Divider layout="vertical" style={{backgroundColor:"red"}}/>
                <Calendar date={date} />             
            </Card>
            </div>
        </>
    )
}

export default Events