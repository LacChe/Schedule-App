import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const Filter = ({ setDisplay }) => {
  return (
    <div>
        <h1>FILTERFILTER</h1>
        <button className='button-tool-confirm' type='button' onClick={()=>setDisplay('')}><AiOutlineCheckCircle /></button>
    </div>
  )
}

export default Filter