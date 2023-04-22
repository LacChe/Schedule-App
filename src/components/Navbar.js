import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../utils/stateContext.js';

const Navbar = () => {
    const { setShowNavbar, showNavbar, setStartDate, setEndDate, auth } = useStateContext();
    const navigate = useNavigate();
    const today = new Date();

    return (
        <div>
            <button type='button' onClick={() => setShowNavbar((prev) => !prev)}>Show Nav</button>
            {showNavbar ? 
            <div>
                <button type='button' onClick={() =>  {
                    setStartDate(today);
                    setEndDate(today);
                    setShowNavbar(false);
                    navigate('/');
                }}>Today</button>
                <button type='button' onClick={() =>  {
                    setStartDate(new Date(`${today.getFullYear()}`, `${today.getMonth()}`, `${today.getDate()-7}`));
                    setEndDate(new Date(`${today.getFullYear()}`, `${today.getMonth()}`, `${today.getDate()}`));
                    setShowNavbar(false);
                    navigate('/');
                }}>This Week</button>
                <button type='button' onClick={() =>  {
                    setStartDate(new Date(`${today.getFullYear()}`, `${today.getMonth()}`));
                    setEndDate(new Date(`${today.getFullYear()}`, `${today.getMonth()+1}`));
                    setShowNavbar(false);
                    navigate('/');
                }}>This Month</button>
                <button type='button' onClick={() =>  {
                    setStartDate(new Date(`${today.getFullYear()}`));
                    setEndDate(new Date(`${today.getFullYear()+1}`));
                    setShowNavbar(false);
                    navigate('/');
                }}>This Year</button>
                <button type='button' onClick={() =>  {
                    setShowNavbar(false);
                    navigate('/set-range');
                }}>Set Range</button>
                <button type='button' onClick={()=> {
                    setShowNavbar(false);
                    navigate('/profile');
                }}>Profile</button>
                <button onClick={() => auth.logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Log Out
                </button>
            </div> : <></>}
        </div>
    )
}

export default Navbar