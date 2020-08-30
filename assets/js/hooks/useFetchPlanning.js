// const [selectedDate, planning, getPlanning]
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
        planning: {}
    })

    const getPlanning = async (date) => { 
        if(!date) return

        try{
            const planning = await Api.create(PLANNING_API, planningReference(date))
            planning.number = date.format('YY') + date.dayOfYear()

            setState({
                selectedDate: date,
                planning
            })
        }catch(err) {
            setState({
                selectedDate: date,
                planning: {}
            })
        }
    }

    return [
        state.selectedDate, 
        state.planning, 
        getPlanning
    ] 
}
 
export default useFetchPlanning;