import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const Search = ({ setDisplay }) => {
  return (
    <div>
        <h1>SEARCHSEARCH</h1>
        <button className='button-tool-confirm' type='button' onClick={()=>setDisplay('')}><AiOutlineCheckCircle /></button>
    </div>
  )
}

export default Search