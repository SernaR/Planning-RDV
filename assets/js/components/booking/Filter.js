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

const Filter = ({ filters = {}, onFilter, askedDate, onChangeDate, children }) => {
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
                                <TextField
                                    size="small"
                                    label="Fournisseur"
                                    name="supplier"
                                    value={filters.supplier}
                                    onChange={onFilter}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={filters.warehouse}
                                    name="warehouse"
                                    onChange={onFilter}
                                    label="Type article"
                                    >
                                    {WAREHOUSES.map ((warehouse, index) => <MenuItem key={index} value={warehouse}>{ warehouse }</MenuItem>)}  
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Picker 
                                    label="Date demandée" 
                                    onChange={onChangeDate} 
                                    name="askedDate" 
                                    value={askedDate}/>
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