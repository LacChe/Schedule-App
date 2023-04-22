import React from 'react'
import { useStateContext } from '../utils/stateContext';

const Home = () => {
    const { startDate, endDate } = useStateContext();
    return (
        <div>
            <p>{JSON.stringify(startDate)}</p>
            <p>{JSON.stringify(endDate)}</p>
            <p>{startDate?.getFullYear()}-{startDate?.getMonth()+1}-{startDate?.getDate()}-{startDate?.getDay()}</p>
            <p>{endDate?.getFullYear()}-{endDate?.getMonth()+1}-{endDate?.getDate()}-{endDate?.getDay()}</p>
        </div>
  )
}

export default Home