import React from 'react';
import { makeStyles, Paper, TextField, Select, MenuItem, Button, Grid } from '@material-ui/core'
import Picker from '../form/DatePicker'
import { WAREHOUSES } from '../../services/config'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1),

    },
    centerField: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    }
}));

const Filter = ({ filters, onChangeWarehouse, onChangeSupplier, onChangeBooking, askedDate, onChangeDate, onNext, isNext }) => {
    const classes = useStyles()    
    
    return ( 
        <Paper className={classes.root}>
            <Grid container justify="space-around" alignItems="center" spacing={2}>
                <Grid item>     
                    <Select
                        value={filters.warehouse}
                        name="warehouse"
                        onChange={onChangeWarehouse}
                        >
                        {WAREHOUSES.map ((warehouse, index) => <MenuItem key={index} value={warehouse}>{ warehouse }</MenuItem>)}  
                    </Select>
                </Grid>
                <Grid item>
                    <Picker 
                        label="Date demandée" 
                        onChange={onChangeDate} 
                        name="askedDate" 
                        value={askedDate}/>
                    <TextField
                        className={classes.centerField}
                        size='small'
                        label="Fournisseur"
                        name="supplier"
                        value={filters.supplier}
                        onChange={onChangeSupplier}
                        variant="outlined"
                    />
                    <TextField
                        size='small'
                        label="Booking"
                        name="booking"
                        value={filters.booking}
                        onChange={onChangeBooking}
                        variant="outlined"
                    /> 
                </Grid>
                <Grid item>
                    <Button 
                        color='primary' 
                        variant="contained"
                        disabled={!isNext}
                        onClick={ onNext }
                        >Suivant
                    </Button>     
                </Grid>
            </Grid>    
        </Paper>
    );
}
 
export default Filter;