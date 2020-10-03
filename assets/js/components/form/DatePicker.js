import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { DELIVERY_WINDOW } from '../../services/config'

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
            format='DD/MM/YYYY'
        />
    );
}

export default Picker;