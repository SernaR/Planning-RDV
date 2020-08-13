import { useState } from "react"
import { UNLOADING_TIME } from '../services/config'

const setDuration = (door,quantity) => { 
    let duration
    switch (door) {
        case 'PA':
          duration = Math.ceil(quantity/UNLOADING_TIME.PA)
          break;
        case 'AE':
            duration = Math.ceil(quantity/UNLOADING_TIME.AE)
            break;
        case 'PE':
            duration = Math.ceil(quantity/UNLOADING_TIME.PE)
            break;
        default:
          duration = 1
      }
    return duration
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

    return [
        setDuration(state.door, state.totalQuantity), 
        state.orders, 
        toggleBooking
    ]
}
 
export default useToggleBooking;