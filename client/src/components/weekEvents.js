
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { useGetEventsByWeekQuery } from '../slices/eventApiSlice';
import AppBar from './appBar';
// import { eventservice } from './service/eventservice';
import { Checkbox } from "primereact/checkbox";

export default function WeekEvents() {

    const { data: events, isLoading, isError, error } = useGetEventsByWeekQuery()
    events && console.log(events);
    const dt = useRef(null);

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const cols = [
        { field: 'date', header: 'יום' },
        { field: 'personId.personname', header: 'שם ' },
        { field: 'eventType', header: 'סוג אירוע' },
        { field: 'speakers', header: 'הגברה' },
        { field: 'price', header: 'מחיר' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    // const exportPdf = () => {
    //     import('jspdf').then((jsPDF) => {
    //         import('jspdf-autotable').then(() => {
    //             const doc = new jsPDF.default(0, 0);

    //             doc.autoTable(exportColumns, events);
    //             doc.save('events.pdf');
    //         });
    //     });
    // };

    // const exportExcel = () => {
    //     import('xlsx').then((xlsx) => {
    //         const worksheet = xlsx.utils.json_to_sheet(events);
    //         const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //         const excelBuffer = xlsx.write(workbook, {
    //             bookType: 'xlsx',
    //             type: 'array'
    //         });

    //         saveAsExcelFile(excelBuffer, 'events');
    //     });
    // };

    // const saveAsExcelFile = (buffer, fileName) => {
    //     import('file-saver').then((module) => {
    //         if (module && module.default) {
    //             let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    //             let EXCEL_EXTENSION = '.xlsx';
    //             const data = new Blob([buffer], {
    //                 type: EXCEL_TYPE
    //             });

    //             module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    //         }
    //     });
    // };

    const header = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
            {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
            {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
        </div>
    );
    const getDay = (event) => {
        return days[new Date(event.date).getDay()];
    }
    const checkedTemplate = (event) => {
        return <Checkbox disabled checked={event.speakers}></Checkbox>
    }
    return (

        <>
            <AppBar />
            <div className="card">
                <h1>אירועי השבוע</h1>
                <Tooltip target=".export-buttons>button" position="bottom"  />

                <DataTable  ref={dt} value={events} showGridlines header={header} tableStyle={{ minWidth: '50rem' }}>
                    {cols.map((col, index) => (
                        col.field == "date" ? <Column  field={col.field} className="cul" key={index} body={getDay} header={col.header} /> :
                            col.field == "speakers" ? <Column field={col.field} className="cul" key={index} body={checkedTemplate} header={col.header} />
                            : <Column className="cul"  key={index} field={col.field} header={col.header} />
                    ))}
                </DataTable>
            </div>
        </>
    );
}
