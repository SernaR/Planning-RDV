import React from 'react';
import moment from 'moment'
import { Button } from '@material-ui/core';
import { AGENDA_START, AGENDA_END } from '../services/config'

const Agenda = ({ date, appointments = [], onClick }) => {
    const agenda = []
    const forbiddenPositions = appointments.map( ({schedule}) => moment(schedule).format('HH:mm') )  
    
    if( date) {
        const now = moment(moment(date).startOf('day').toDate());

        for (let i = AGENDA_START; i < AGENDA_END; i++) {
            const date = now.clone().add((i * 15), 'm')
            const time = date.format('HH:mm')
            const isForbidden = forbiddenPositions.includes(time)
           
            agenda.push({
                text: isForbidden ? "occuppé" : time,
                isForbidden,
                date
            })
        }
    }

    return ( 
        <ul>
            {agenda.map( (quarter, index) => (
                <li key={index}>
                    <Button
                        disabled={quarter.isForbidden} 
                        onClick={() => onClick("schedule", quarter.date, false)}
                        >{ quarter.text }
                    </Button>
                </li>
            ))}
        </ul> 
     );
}
 
export default Agenda;