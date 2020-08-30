import moment from 'moment'
moment.locale("fr")

export const API_URL = 'https://localhost:8000/api/'

export const BOOKING_API = API_URL + 'orders'
export const PLANNING_API = API_URL + 'plannings'
export const APPOINTMENT_API = API_URL + 'appointments'

//export const itemsPerPage = 15

//heure de début et fin de l'agenda, par numéro de quarts d'heure
export const AGENDA_START = 32 // = 8h
export const AGENDA_END = 68 // = 17h

//temps de déchargement
export const UNLOADING_TIME = {
    PA: 400/4,
    AE: 80/4,
    PE: 1000/4
}

//type articles
export const WAREHOUSES = ["PA", "AE", "PE"]

//statut du rendez-vous
export const STATUS = {
    SET: 0,
    DELIVER: 1,
    POSTPONE: 2,
    CANCEL: 3
}

export const DELIVERY_WINDOW = {
    min: moment().add(1, 'd'),
    max: moment().add(15, 'd')
}
