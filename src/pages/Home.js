import React, { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import Day from '../components/Day';
import Week from '../components/Day';
import Month from '../components/Month';
import Year from '../components/Year';
import Range from '../components/Range';
import Filter from '../components/Filter';
import { useStateContext } from '../utils/stateContext.js';

const displayComponent = (param) => {
    switch (param) {
        case 'day':
            return (<Day />);
        case 'week':
            return (<Week />);
        case 'month':
            return (<Month />);
        case 'year':
            return (<Year />);
        case 'range':
            return (<Range />);
        default: 
            return (<Day />);
    }
}

const Home = () => {
    const { showTools, setShowTools, showSearch, setShowSearch, searchTerm, setSearchTerm } = useStateContext();
    const { param } = useParams();
    const [display, setDisplay] = useState('');

    if(display === 'filter') return (<Filter setDisplay={setDisplay} />);

    return (
        <div className='home-main'>
            {displayComponent(param)}
            <div className={showSearch?'tools-search search-show':'tools-search search-hide'}>
                <div className='search-bar-icon'><AiOutlineSearch /></div>
                <input className='search-input' type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            </div>
            <button type='button' className='button-add-item' onClick={()=>setShowTools((prev)=>!prev)}><IoMdAddCircleOutline /></button>
            <div className={showTools?'tools-container tools-show':'tools-container tools-hide'}>
                <button type='button' className='button-tool' onClick={()=>{
                    setShowTools(false);
                    setShowSearch((prev) => !prev);
                }}><AiOutlineSearch /></button>
                <button type='button' className='button-tool' onClick={()=>{
                    setShowTools(false);
                    setDisplay('filter');
                }}><AiOutlineFilter /></button>
            </div>
        </div>
  )
}

export default Home