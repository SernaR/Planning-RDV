import React from 'react';
import { Paper, TableHead, TableContainer, TableRow, TableCell, Table, TableBody, Button } from '@material-ui/core';
import moment from 'moment'
import { AGENDA_START, AGENDA_END } from '../services/config';

//faire le switch PA/autre type
//mettre doors dans la config

function fetchDoorsAppointments(appointments) {
    const doors = {
        PA: {},
        PA2: {},
        AE: {},
        PE: {}
    }

    appointments.map( ({number, schedule, duration, door}) => {
        for (let i = 0; i < duration; i++) {
            doors[door][moment(schedule).add((i * 15), 'm').format('HH:mm')] = number
        }
    }) 
    return {doors}
}  

const PlanningTable = ({ appointments = [], onModal, planningIndex, isOtherType }) => { 
    const rows = []
    const { doors } = fetchDoorsAppointments(appointments)
    const now = moment(moment().startOf('day').toDate())

    const handleClick = (number) => {
        if (number) {
            const appointment = appointments.find( appointment => appointment.number === number)
            onModal(appointment, planningIndex)
        }
    }

    for (let i = AGENDA_START; i < AGENDA_END; i++) { 
        const time = now.clone().add((i * 15), 'm').format('HH:mm')
        
        rows.push({
            PA: doors.PA[time],
            PA2: doors.PA2[time],
            AE: doors.AE[time],
            PE: doors.PE[time]   
        })
    }

    return ( 
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        { isOtherType &&
                            <>
                                <TableCell align="center">AE</TableCell>
                                <TableCell align="center">PE</TableCell>
                            </> ||
                            <>
                                <TableCell align="center">PA</TableCell>
                                <TableCell align="center">PA2</TableCell>
                        </> } 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            { isOtherType &&
                                <>
                                    <TableCell align="center">{row.AE}</TableCell>
                                    <TableCell align="center">{row.PE}</TableCell>
                                </> ||
                                <>
                                    <TableCell align="center"><Button onClick={ () => handleClick(row.PA)}>{row.PA}</Button></TableCell>
                                    <TableCell align="center">{row.PA2}</TableCell>
                            </> }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>    
        </TableContainer>
    )
}
 
export default PlanningTable;

