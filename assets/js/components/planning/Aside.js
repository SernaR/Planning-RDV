import React from 'react';
import { Paper, TableContainer, TableRow, TableCell, Table, TableBody, Select, MenuItem, makeStyles, FormControl } from '@material-ui/core';
import moment from 'moment'
import { AGENDA_START, AGENDA_END, WAREHOUSES } from '../../services/config';

const useStyles = makeStyles( theme => ({
    warehouse: {
        textAlign: 'center',
      },
      head: {
          textAlign: 'center',
          padding: 0,
          marginBottom: 3
      },
      row: {
        height: 33
      }
  }))

const Aside = ({ onChangeType, type }) => { 
    const classes = useStyles()

    const rows = []
    const now = moment(moment().startOf('day').toDate())

    for (let i = AGENDA_START; i < AGENDA_END; i++) { 
        const time = now.clone().add((i * 15), 'm').format('HH:mm')
        rows.push(time)
    }

    return ( <>
        <FormControl size="small" fullWidth variant="outlined" className={classes.head}>
            <Select
                className={classes.warehouse}
                value={type}
                onChange={onChangeType}
                >
                {WAREHOUSES.map ((warehouse, index) => <MenuItem key={index} value={warehouse}>Quai { warehouse }</MenuItem>)}  
            </Select>
       </FormControl>
        <TableContainer component={Paper}>
            <Table> 
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}className={classes.row}>
                            <TableCell 
                            align="center" 
                            size="small">{ row }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>    
        </TableContainer>    
    </>)
}
 
export default Aside;
