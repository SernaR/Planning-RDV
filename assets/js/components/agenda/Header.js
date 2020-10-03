import React from 'react';
import { makeStyles, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TextField, Select, MenuItem, Button, Grid, Chip, Typography } from '@material-ui/core'
import Picker from '../form/DatePicker'
import { WAREHOUSES } from '../../services/config'
import moment from 'moment'

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

const Header = ({stepBack, totalQuantity, date, isSchecduleFilled}) => {
    const classes = useStyles() 
    const summary = date ? 
        <Chip label={`RDV le ${date.format('DD-MM-YY à HH:mm')}, ${totalQuantity} colis`} variant="outlined" color="primary"/> 
        : 
        <Chip label="Choisissez un créneau"/>

    return ( 
        <Paper className={classes.root}>
            <Grid container justify="space-around" alignItems="center" spacing={2}>
                <Grid item>     
                    <Button 
                        color='secondary' 
                        onClick={stepBack}
                        >Précedent
                    </Button>
                </Grid>
                <Grid item>
                    {summary}
                </Grid>
                <Grid item>
                    <Button 
                        disabled={!isSchecduleFilled}
                        variant="contained"
                        color='primary'
                        type="submit"
                        >Confirmer
                    </Button>
                </Grid>
            </Grid>    
        </Paper>
    );

}
 
export default Header;