import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useGetEventByDateQuery } from "../slices/eventApiSlice";
import AddEventDialog from "./addEventDialog";
import SetEventDialog from "./setEventDialog";


const Day = (props) => {
    const [heb, setHeb] = useState()

    /*הוספה*/
    const [moorning, setMoorning] = useState(false)
    const [night, setNight] = useState(false)
    const [day, setDay] = useState(false)
    const [shabbat, setShabbat] = useState(false)
    const [kidush, setKidush] = useState(false)

    /*עדכון*/
    const [moorningflag, setMoorningFlag] = useState(false)
    const [nightflag, setNightFlag] = useState(false)
    const [dayflag, setDayFlag] = useState(false)
    const [shabbatflag, setShabbatFlag] = useState(false)
    const [kidushflag, setKidushFlag] = useState(false)

    let date = new Date(props.year, props.month, props.day)

    const hebDate = date.getDay() 

    date = date.toISOString()
    const compareDate=new Date(props.date.getFullYear(),props.date.getMonth(),props.date.getDate()+1).toISOString().split("T")[0]
    const { data: events, isLoading, isError, error } = useGetEventByDateQuery(date.split("T")[0])

    const findEventInDay=(type)=>{
       return events?.filter(e => e.eventType == type)[0]
    }
    
    useEffect(() => {
        axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date}&g2h=1&strict=1`).then((response) => {
            setHeb(response.data);
        });
    }, [date]);

    return (
        <>
            <div className="ourday" style={{ border: date.split("T")[0]==compareDate ? '2px solid #8284f5' : '1px solid #dcdfe1 '}}>
                <div>
                    <h4>{heb && `${heb?.heDateParts.d} ${heb?.heDateParts.m} `}</h4>
                    {heb ? hebDate == 0 ? 
                    <div>{heb.events}</div> : <div>{heb.events.slice(0, heb.events.length - 1)}</div>
                     : null}
                </div>
                <div className="footer">
                    {heb ? hebDate == 0 ?
                        <div>
                            <Button tooltip="קידוש" tooltipOptions={{ position: "top" }} style={{ background: findEventInDay("קידוש") ? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay("קידוש") ? setKidush(true) : setKidushFlag(true) }} outlined={false} icon={(options) => <img alt="dropdown icon" src="./goblet.png" {...options.iconProps} />} disabled={findEventInDay('ערב')} rounded text />
                            <Button tooltip="שבת" tooltipOptions={{ position: "top" }} style={{ background:findEventInDay("שבת") ? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay("שבת") ? setShabbat(true) : setShabbatFlag(true) }} icon={(options) => <img alt="dropdown icon" src="./candles.png" {...options.iconProps} />} disabled={findEventInDay('ערב')} rounded text />
                            <Button tooltip="מוצ''ש" tooltipOptions={{ position: "top" }} style={{ background: findEventInDay("ערב") ? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay("ערב") ? setNight(true) : setNightFlag(true) }} icon="pi pi-moon" disabled={findEventInDay('קידוש') || findEventInDay('שבת')} rounded text />
                        </div>
                        :
                        <div>
                            <Button icon="pi pi-sun" tooltip="בוקר" tooltipOptions={{ position: "top" }} style={{ background: findEventInDay("בוקר") ? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay("בוקר") ? setMoorning(true) : setMoorningFlag(true) }} disabled={findEventInDay('יום שלם')} rounded text />
                            <Button icon="pi pi-moon" tooltip="ערב" tooltipOptions={{ position: "top" }} style={{ background:findEventInDay("ערב")? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay( "ערב") ? setNight(true) : setNightFlag(true) }} disabled={findEventInDay('יום שלם')} rounded text />
                            <Button icon={(options) => <img alt="dropdown icon" src="./day-and-night.png" {...options.iconProps} />} tooltip="יום שלם" tooltipOptions={{ position: "top" }} style={{ background: findEventInDay("יום שלם") ? '#a6b4ee' : 'none' }} onClick={() => { !findEventInDay("יום שלם") ? setDay(true) : setDayFlag(true) }} disabled={findEventInDay('ערב') || findEventInDay('בוקר')} rounded text />
                        </div> : <></>
                    }

                </div>
            </div>

            {moorning && <AddEventDialog setVisible={setMoorning} eventType="בוקר" date={date} visible={true} />}
            {night && <AddEventDialog setVisible={setNight} eventType="ערב" date={date} visible={true} />}
            {day && <AddEventDialog setVisible={setDay} eventType="יום שלם" date={date} visible={true} />}
            {kidush && <AddEventDialog setVisible={setKidush} eventType="קידוש" date={date} visible={true} />}
            {shabbat && <AddEventDialog setVisible={setShabbat} eventType="שבת" date={date} visible={true} />}


            {moorningflag && <SetEventDialog setVisible={setMoorningFlag} eventType="בוקר" date={date} visible={true} event={events?.filter(e => e.eventType == 'בוקר')[0]} />}
            {nightflag && <SetEventDialog setVisible={setNightFlag} eventType="ערב" date={date} visible={true} event={events?.filter(e => e.eventType == 'ערב')[0]} />}
            {dayflag && <SetEventDialog setVisible={setDayFlag} eventType="יום שלם" date={date} visible={true} event={events?.filter(e => e.eventType == 'יום שלם')[0]} />}
            {shabbatflag && <SetEventDialog setVisible={setShabbatFlag} eventType="שבת" date={date} visible={true} event={events?.filter(e => e.eventType == 'שבת')[0]} />}
            {kidushflag && <SetEventDialog setVisible={setKidushFlag} eventType="קידוש" date={date} visible={true} event={events?.filter(e => e.eventType == 'קידוש')[0]} />}

        </>
    )
}


export default Day