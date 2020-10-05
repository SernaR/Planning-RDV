import { useState } from 'react';
import { PLANNING_API } from '../services/config'
import Api from '../services/api'

const planningReference = (date) => { 
    return { 
        reference: date.format('YYMMDD')
    }
}

const useFetchPlanning = () => {
    const [state, setState] = useState({
        selectedDate: null,
        planning: {
            appointments: []
        },
        loadingDate: false
    })

    const getPlanning = async (date) => { 
        if(!date) return
        
        setState({ ...state, loadingDate: true})
        try{
            const planning = await Api.create(PLANNING_API, planningReference(date))
            planning.number = date.format('YY') + date.dayOfYear()

            setState({
                selectedDate: date,
                loadingDate: false,
                planning
            })
        }catch(err) {
            setState({
                selectedDate: date,
                loadingDate: false,
                planning: {}
            })
        }
    }

    return [
        state.selectedDate, 
        state.planning,
        state.loadingDate, 
        getPlanning
    ] 
}
 
export default useFetchPlanning;