import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionActions, Button, Divider } from '@material-ui/core';

import Appointment from '../Appointment';
import { STATUT } from '../../services/config'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    //fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function SimpleAccordion({ appointments, onCancel, onPostpone }) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      {appointments.map( (appointment, index) => 
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Rendez-vous n° {appointment.number} 
            </Typography>
            <Typography className={classes.secondaryHeading}>
              statut: { STATUT[appointment.status] }
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Appointment  content={appointment}/>
          </AccordionDetails>
          <Divider />
        {appointment.status === 0 && <AccordionActions>
          <Button size="small" color="secondary" onClick={() => onCancel(appointment.id, index)}>Annuler le RDV</Button>
          <Button size="small" color="primary" onClick={() => onPostpone(appointment.id)}>
            Déplacer le RDV
          </Button>
        </AccordionActions>}
        </Accordion>)}
    </div>
  );
}