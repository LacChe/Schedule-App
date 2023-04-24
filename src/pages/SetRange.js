import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { useNavigate } from 'react-router-dom';

const SetRange = () => {
    const { setShowNavbar, setStartDate, setEndDate } = useStateContext(); 
    const navigate = useNavigate();
    const [tempStartDate, setTempStartDate] = useState();
    const [tempEndDate, setTempEndDate] = useState();

    return (
        <div className='set-range-main'>
            <h1>Set a Date Range</h1>
            <div className='set-range-input'>
                <p>Start:</p><input id='startDateInput' type='date' onChange={(e) => setTempStartDate(e.target.value)}/>
            </div>
            <div className='set-range-input'>
                <p>End:</p><input id='endDateInput' type='date' onChange={(e) => setTempEndDate(e.target.value)}/>
            </div>
            <button type='button' onClick={() => {
                if(tempStartDate && tempEndDate && tempEndDate>=tempStartDate){
                    setStartDate(new Date(tempStartDate));
                    setEndDate(new Date(tempEndDate));
                    setShowNavbar(false);
                    navigate('/home/range');
                } 
            }}>Confirm</button>
            {
                (!tempStartDate || !tempEndDate || tempEndDate<tempStartDate) &&
                    <p>Please enter a range of dates.</p>
            }
        </div>
    )
}

export default SetRange