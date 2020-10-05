import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, Grid, IconButton, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

export default function Modal({ title, children, open, onClose, onCancel, onPostpone }) {
  const classes = useStyles();
  return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={'sm'}
        fullWidth
      >
        <DialogTitle>
          <Grid container item xs={12} className={classes.title}> 
            <Typography variant="h5" component="h3">{title}</Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {children} 
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Annuler le RDV
          </Button>
          <Button onClick={onPostpone} color="primary" autoFocus>
            Déplacer le RDV
          </Button>
        </DialogActions>
      </Dialog>
  );
}