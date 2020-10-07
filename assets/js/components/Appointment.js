import React from 'react'
import moment from 'moment'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'

function fetchData(orders) {
  if(!orders) return { suppliers: [], quantity: 0}
  
  return {
    suppliers: [ ...new Set(orders.map(order => order.supplier)) ],
    quantity: orders.reduce(((acc, current) => acc + current.quantity), 0)
  }
} 

function getTimeFromMins(mins) {
  const h = mins / 60 | 0
  const m = mins % 60 | 0
    
  const pluriel = h > 1 ? 's' : ''
  const hours = h === 0 ? '' : `${h} heure${pluriel}`
  const and = h !== 0 & m !== 0 ? ' et ' : ''
  const minutes = m === 0 ? '' : `${and}${m} minutes` 
  
  return hours + minutes
}

export default function Appointment({ content = {} }) {
  
  const { suppliers, quantity } = fetchData(content.orders)
  const duration = getTimeFromMins(content.duration * 15)
  
  const fetchOrders = suppliers.map( (supplier, index) => {
    const orders = content.orders.filter( order => order.supplier === supplier)
    return <List key={index} dense={true}>     
      <Typography variant="h6">Fournisseur : { supplier } </Typography>
        { orders.map( order => <ListItem key={order.number}>
          <ListItemText >EP {order.number} : {order.quantity} colis</ListItemText>
        </ListItem>) }
      </List>
    
  })


  return (
      <List dense={true}>
        <Typography variant="h6">planifié le {moment(content.schedule).format(' DD-MM-YY à HH:mm')}</Typography>
        <ListItem >
          <ListItemText>{quantity} colis sur le quai {content.door}</ListItemText>
          </ListItem><ListItem>  
          <ListItemText>{duration} de déchargement</ListItemText>
        </ListItem>
        {fetchOrders}
      </List> 
  )
}

