import { useState } from "react"
import { UNLOADING_TIME } from '../services/config'

const setDuration = (door, quantity) => { 
    return Math.ceil(quantity/UNLOADING_TIME[door]) || 1
}

const useToggleBooking = () => {
    const [state, setState] = useState({
        totalQuantity: 0,
        orders: [],
        door: ''
    })

    const toggleBooking = (id, quantity, door) => {
        const orders = state.orders
        const isNew = orders.indexOf(id) === -1
       
        setState({
            totalQuantity: isNew ? state.totalQuantity += quantity : state.totalQuantity -= quantity,
            orders: isNew ? [ ...orders, id ] : orders.filter( orderId => orderId !== id),
            door
        })
    }

    const toggleAllBookings = (bookings) => {
        //const orders = state.orders
        const isNew = state.totalQuantity === 0 //orders.indexOf(bookings[0]['@id']) === -1

        isNew ? addAllBookings(bookings) : removeAllBookings()
    }

    const addAllBookings = (bookings) => {
        setState({
            totalQuantity: bookings.map(booking => booking.quantity).reduce((a, b)=> a + b, 0), 
            orders: bookings.map(booking => booking['@id']), 
            door: bookings[0]['warehouse'],
        })
    }

    const removeAllBookings = () => {
        setState({
            totalQuantity: 0,
            orders: [],
            door: ''
        })
    }
    
    return [
        state.totalQuantity,
        setDuration(state.door, state.totalQuantity), 
        state.orders, 
        toggleBooking,
        toggleAllBookings,
        removeAllBookings,
        
    ]
}
 
export default useToggleBooking;