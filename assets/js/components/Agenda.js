import React from 'react';
import moment from 'moment'
import { Button } from '@material-ui/core';
import { AGENDA_START, AGENDA_END } from '../services/config'


const Agenda = ({ date, onClick }) => {
    const agenda = []
    let forbiddenPositions = []
    let now
    
    if( date) {
        now = moment(moment(date).startOf('day').toDate());

        for (let i = AGENDA_START; i < AGENDA_END; i++) {
            agenda.push(now.clone().add((i * 15), 'm'))
        }
    }

    return ( 
        <ul>
            {agenda.map( (quarter, index) =><li key={index}><Button onClick={() => onClick("schedule", quarter, false)}>{index} - {quarter.format('HH:mm')}</Button></li>)}
        </ul> 
     );
}
 
export default Agenda;