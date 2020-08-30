import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment'

function fetchData(orders) {
  if( !orders) return { suppliers: [], quantity: 0}
  
  return {
    suppliers: [ ...new Set(orders.map(order => order.supplier)) ],
    quantity: orders.reduce(((acc, current) => acc + current.quantity), 0)
  }
}  

export default function SimpleModal({ content, open, onClose }) {
  
  const { suppliers, quantity } = fetchData(content.orders)
  
  const fetchOrders = suppliers.map( (supplier, index) => {
    const orders = content.orders.filter( order => order.supplier === supplier)
    return <div key={index}>     
      Fournisseur : { supplier } 
      <ul>
        { orders.map( order => <li key={order.number}>EP {order.number} : {order.quantity} colis</li>) }
      </ul>
    </div>
  })

  const duration = moment.duration(content.duration * 15, 'minutes').humanize()
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>Rendez-vous n° {content.number}</DialogTitle>
        <DialogContent>
          <div> 
            planifié le {moment(content.schedule).format(' DD-MM-YY à HH:mm')}
            <ul>
              <li>{quantity} colis, quai {content.door}</li>
              <li>{duration} de déchargement</li>
            </ul>
          </div>
          {fetchOrders}
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