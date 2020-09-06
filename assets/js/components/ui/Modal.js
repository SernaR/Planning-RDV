import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

export default function Modal({ title, children, open, onClose, onCancel, onPostpone }) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>
          <Grid container item xs={12} className={classes.title}> 
            <div>{title}</div>
            <Button onClick={onClose}><CloseIcon /></Button>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {children}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Annuler le RDV
          </Button>
          <Button onClick={onPostpone} color="primary" autoFocus>
            Déplacer le RDV
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}