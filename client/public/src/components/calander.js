import { useState } from "react";
import Day from "./day";
import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const Calendar = (props) => {

  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [days, setDays] = useState([])

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    let count = 1
    while (date.getMonth() === month) {
      days.push(++count);
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


  const renderDaysInRows = () => {
    const rows = [];
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    let currentRow = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentRow.push(null);
    }

    for (let i = 0; i < daysInMonth.length; i++) {
      currentRow.push(daysInMonth[i]);

      if (currentRow.length === 7) {
        rows.push(currentRow);
        currentRow = [];
      }
    }


    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  }

  

  useEffect(() => {
    setDays(getDaysInMonth(month, year))
    // ProductService.getProductsMini().then(data => setProducts(data));
  }, []);

  useEffect(() => {
    setMonth(props.date.getMonth())
    setYear(props.date.getFullYear())
  }, [props.date]);
  console.log(month);


  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>ראשון</Th>
            <Th>שני</Th>
            <Th>שלישי</Th>
            <Th>רביעי</Th>
            <Th>חמישי</Th>
            <Th>שישי</Th>
            <Th>שבת</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renderDaysInRows().map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((day, dayIndex) => (
                <Td key={dayIndex} className="td">
                  {day && <div className="day-cell">
                    <Day day={day} month={month} year={year} date={props.date}/>
                  </div>}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>


    </>
  )
}

export default Calendar