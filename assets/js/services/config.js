export const API_URL = 'https://localhost:8000/api/'

export const BOOKING_API = API_URL + 'orders'
export const PLANNING_API = API_URL + 'plannings'
export const APPOINTMENT_API = API_URL + 'appointments'

//export const itemsPerPage = 15

//heure de début et fin de l'agenda, par défaut 8h - 17h
export const AGENDA_START = 32
export const AGENDA_END = 68

//temps de déchargement
export const UNLOADING_TIME = {
    PA: 400,
    AE: 80,
    PE: 1000
}

//ref planning = dateReference.format('YYYY') + '-' + dateReference.dayOfYear()
/*{
   " status": {
       "SET": 0,
       "DELIVER": 1,
       "POSTPONE": 2,
       "CANCEL": 3
   }
}*/