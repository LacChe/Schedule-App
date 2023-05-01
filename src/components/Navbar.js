import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../utils/stateContext.js';
import { AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const { setShowNavbar, showNavbar, setStartDate, setEndDate, auth } = useStateContext();
    const navigate = useNavigate();
    const today = new Date();

    return (
        <div>
            <button className={showNavbar?'nav-close-overlay':'nav-close-overlay-hide'} onClick={()=>setShowNavbar(false)}></button>
            <div className={showNavbar?'nav-main nav-show':'nav-main nav-hide'}>
                <button className='nav-toggle-button' type='button' onClick={() => setShowNavbar((prev) => !prev)}>
                    <AiOutlineMenu color='white' />
                </button>
                {showNavbar ? 
                <div className='nav-button-list'>
                    <button type='button' onClick={() =>  {
                        setShowNavbar(false);
                        navigate('/');
                    }}>Today</button>
                    <button type='button' onClick={() =>  {
                        setEndDate(new Date(`${today.getFullYear()}`, `${today.getMonth()}`, `${today.getDate()}`));
                        setShowNavbar(false);
                        navigate('/week');
                    }}>This Week</button>
                    <button type='button' onClick={() =>  {
                        setEndDate(new Date(`${today.getFullYear()}`, `${today.getMonth()}`));
                        setShowNavbar(false);
                        navigate('/month');
                    }}>This Month</button>
                    <button type='button' onClick={() =>  {
                        setShowNavbar(false);
                        navigate('/all');
                    }}>All</button>
                    {/*
                    <button type='button' onClick={() =>  {
                        setShowNavbar(false);
                        navigate('/set-range');
                    }}>Set Range</button>
                    */}
                    <button className='button-alt-color' type='button' onClick={()=> {
                        setShowNavbar(false);
                        navigate('/profile');
                    }}>Profile</button>
                    <button className='button-alt-color' onClick={() => {
                            localStorage.clear();
                            auth.logout({ logoutParams: { returnTo: window.location.origin } })
                        }}>
                        Log Out
                    </button>
                </div> : <></>}
            </div>
        </div>
    )
}

export default Navbar