import { useState } from "react"
import { UNLOADING_TIME } from '../services/config'

const setDuration = (door,quantity) => { 
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

    const removeAllBookings = () => {
        setState({
            totalQuantity: 0,
            orders: [],
            door: ''
        })
    }

    return [
        setDuration(state.door, state.totalQuantity), 
        state.orders, 
        toggleBooking,
        removeAllBookings,
    ]
}
 
export default useToggleBooking;