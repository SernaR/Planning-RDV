import React from 'react';
import { makeStyles, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Checkbox, TableHead } from '@material-ui/core';

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

const BookingTable = ({items, selected, onClick}) => {
    const classes = useStyles()
    const isSelected = (id) => selected.indexOf(id) !== -1

    return ( 
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
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