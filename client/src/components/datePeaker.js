
import { useState } from "react";
import { ReactJewishDatePicker, BasicJewishDay } from "react-jewish-datepicker";
require("react-jewish-datepicker/dist/index.css");

export default function DatePeaker(props) {
  return (
    <ReactJewishDatePicker
      value={props.date}
      isHebrew
      onClick={(day) => {
        props.setDate(day.date);
      }}
    />
  );
}
