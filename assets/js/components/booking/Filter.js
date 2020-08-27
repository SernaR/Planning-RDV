import React from 'react';
import { makeStyles, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TextField, Select, MenuItem } from '@material-ui/core'
import Picker from '../form/DatePicker'
import { WAREHOUSES } from '../../services/config'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
}));

const Filter = ({ filters, onChangeWarehouse, onChangeSupplier, onChangeBooking, askedDate, onChangeDate, children }) => {
    const classes = useStyles()    
    
    return ( 
        <Paper className={classes.paper}>
        <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Filter</TableCell>
                            <TableCell>
                                <Picker 
                                    label="Date demandée" 
                                    onChange={onChangeDate} 
                                    name="askedDate" 
                                    value={askedDate}/>
                            </TableCell>
                            <TableCell>
                                <TextField
                                    label="Booking"
                                    name="booking"
                                    value={filters.booking}
                                    onChange={onChangeBooking}
                                    variant="outlined"
                                />
                            </TableCell>
                            
                            <TableCell>
                                <TextField
                                    label="Fournisseur"
                                    name="supplier"
                                    value={filters.supplier}
                                    onChange={onChangeSupplier}
                                    variant="outlined"
                                />
                            </TableCell>
                            
                            <TableCell>
                                <Select
                                    variant="outlined"
                                    value={filters.warehouse}
                                    name="warehouse"
                                    onChange={onChangeWarehouse}
                                    >
                                    {WAREHOUSES.map ((warehouse, index) => <MenuItem key={index} value={warehouse}>{ warehouse }</MenuItem>)}  
                                </Select>
                            </TableCell>
                            <TableCell>
                                {children}
                            </TableCell>
                        </TableRow>  
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
 
export default Filter;