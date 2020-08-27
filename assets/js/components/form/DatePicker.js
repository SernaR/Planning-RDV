import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import { DELIVERY_WINDOW } from '../../services/config'

const useStyles = makeStyles((theme) => ({
  root: {
      width: '90%',
      margin: theme.spacing(1),
    },
  }))

function Picker({ label, minDate, maxDate, onChange, name, value=null, error }) {
    const classes = useStyles();    
    
    return (
        <DatePicker
            className={classes.root}
            //variant="static"
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