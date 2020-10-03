import React from 'react';
import { makeStyles, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TableHead, Button } from '@material-ui/core';
import moment from 'moment'

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

const BookingTable = ({items, selected, onClick, onSelectAll}) => {
    const classes = useStyles()
    const isSelected = (id) => selected.indexOf(id) !== -1

    return ( 
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button onClick={onSelectAll}>tous</Button>

                                </TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Booking</TableCell>
                                <TableCell>Commande</TableCell>
                                <TableCell>Nb Colis</TableCell>
                                <TableCell>Fournisseur</TableCell>
                                <TableCell>Type article</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map( (item) => 
                                <TableRow
                                    hover
                                    onClick={ () => onClick(item['@id'], item.quantity, item.warehouse) }
                                    key={item.number}
                                >
                                    <TableCell>
                                        <Checkbox checked={isSelected(item['@id'])}/>
                                    </TableCell>
                                    <TableCell>{moment(item.incotermDate).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell>{item.booking}</TableCell>
                                    <TableCell>{item.number}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.supplier}</TableCell>
                                    <TableCell>{item.warehouse}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
     );
}
 
export default BookingTable;