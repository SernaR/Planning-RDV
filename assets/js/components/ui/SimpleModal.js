import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function SimpleModal({ title, children, open, onClose }) {
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annuler
          </Button>
          <Button onClick={onClose} color="primary" autoFocus>
            Déplacer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}