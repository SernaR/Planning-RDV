import React from 'react';
import moment from 'moment'

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
  
  return hours + and + minutes
}

export default function Appointment({ content = {} }) {
  
  const { suppliers, quantity } = fetchData(content.orders)
  const duration = getTimeFromMins(content.duration * 15)
  
  const fetchOrders = suppliers.map( (supplier, index) => {
    const orders = content.orders.filter( order => order.supplier === supplier)
    return <div key={index}>     
      <h3>Fournisseur : { supplier } </h3>
      <ul>
        { orders.map( order => <li key={order.number}>EP {order.number} : {order.quantity} colis</li>) }
      </ul>
    </div>
  })


  return (
    <div>
        <h2>Rendez-vous n° {content.number}</h2>
        <div> 
          <h3>planifié le {moment(content.schedule).format(' DD-MM-YY à HH:mm')}</h3>
          <ul>
              <li>{quantity} colis, quai {content.door}</li>
              <li>{duration} de déchargement</li>
          </ul>
        </div>
        {fetchOrders}
    </div>
  );
}