import React from 'react'
import { useStateContext } from '../utils/stateContext.js';

const Day = () => {
  
  const { searchTerm } = useStateContext();

  return (
    <div>
      <h1>DAYDAYDAYDAY</h1>
      <h1>{searchTerm}</h1>
    </div>
  )
}

export default Day