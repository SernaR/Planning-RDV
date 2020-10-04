import React, { useCallback, useMemo } from 'react';
import { Paper, TableHead, TableContainer, TableRow, TableCell, Table, TableBody, makeStyles } from '@material-ui/core';
import moment from 'moment'
import { AGENDA_START, AGENDA_END } from '../../services/config';

function fetchDoorsAppointments(appointments) { 
    const doors = {
        PA: {},
        AE: {},
        PE: {}
    }

    appointments.map( ({number, schedule, duration, door}) => {
        doors[door][moment(schedule).format('HH:mm')] = {}
        doors[door][moment(schedule).format('HH:mm')].number = number   
        doors[door][moment(schedule).format('HH:mm')].duration = duration 
    })
    
    return {doors}
} 

function fetchRows(doors, type){
    const now = moment(moment().startOf('day').toDate())
    const rows = []
    let duration = 0 //a renomer

    for (let i = AGENDA_START; i < AGENDA_END; i++) { 
        const time = now.clone().add((i * 15), 'm').format('HH:mm')
        const appointment = doors[type][time]

        if(appointment) {
            duration = appointment.duration
            rows.push({
                number: appointment.number,
                duration: appointment.duration
            }) 
        }else {
            duration--
            if(duration <= 0) {
                rows.push({
                number: '',
                duration: 1 
                })
            } else {
                rows.push({})
            }
        }
    }
    return rows
}

const useStyles = makeStyles( theme => ({
    head_container: {
        height: 44
    },
    head:{
        fontWeight: 'bold', 
        textTransform: 'uppercase'
    },
    row: {
        height: 33
    },
    cell: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
        cursor: 'pointer',
        '&:hover': { 
            backgroundColor: theme.palette.secondary.dark, 
        },
    }
}))

const PlanningTable = React.memo(({ appointments = [], onModal, planningIndex, type, day }) => {
    const classes = useStyles()
    const { doors } = useMemo(() => fetchDoorsAppointments(appointments), [appointments])
    const rows = fetchRows(doors, type)

    const handleClick = (number) => {
        if (number) {
            const appointment = appointments.find( appointment => appointment.number === number)
            onModal(appointment, planningIndex)
        }
    }
   
    return ( 
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className={classes.head_container}> 
                        <TableCell 
                            align="center" 
                            size="small" 
                            className={classes.head}
                            >{ day }
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {rows.map((row, index) => (
                        <TableRow key={index} className={classes.row}>
                            { row.number && 
                                <TableCell 
                                    className={ row.number ? classes.cell : ''}
                                    align="center" 
                                    size="small" 
                                    onClick={ () => handleClick(row.number)}
                                    rowSpan={row.duration}
                                    >{row.number}
                                </TableCell> 
                            || null }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>    
        </TableContainer>
    )
})
 
export default PlanningTable;

