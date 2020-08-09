import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'

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
            value={value}
            onChange={date => onChange(name, date)}
            error={error}
            minDate={moment().add(1, 'd')}
            maxDate={moment().add(15, 'd')}
            format='DD/MM/YYYY'
        />
    );
}

export default Picker;