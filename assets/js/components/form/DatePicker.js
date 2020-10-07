import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { DELIVERY_WINDOW } from '../../services/config'

function disableWeekends(date) {
    return date.day() === 0 || date.day() === 6;
}

function Picker({ label, onChange, name, value=null, error }) {
    
    return (
        <DatePicker
            size='small'
            label={label}
            inputVariant="outlined"
            value={value}
            onChange={date => onChange(name, date, true)}
            error={error}
            minDate={ DELIVERY_WINDOW.min }
            maxDate={ DELIVERY_WINDOW.max }
            shouldDisableDate={disableWeekends}
            format='DD/MM/YYYY'
        />
    );
}

export default Picker;