import { useEffect, useState, useRef } from 'react';

import './App.css';

import dt from './svg/moon.svg';
import lt from './svg/moon-fill.svg';

function NavBar() {
    const [theme, setTheme] = useState('light');

    function tt() {
        setTheme(prevTheme => {
            const nt = prevTheme === 'dark' ? 'light' : 'dark';

            localStorage.setItem('theme', nt);
            return nt;
        });
    }

    function tn() {
        return theme === 'light' ? 'Dark Mode' : 'Light Mode';
    }

    useEffect(() => {
        const st = localStorage.getItem('theme') || 'light';
        setTheme(st);
    }, []);
    
    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    function hm() {
        window.location.href = '/';
    }
    
    return (
        <>
            <div className='nav-bar-'>
                {/* Title */}
                    <p id='t-' onClick={hm}>Where in the world?</p>
                {/* */}

                {/* Toggle Theme */}
                    <div className='-tt'>
                        <button onClick={tt}>
                            {theme === 'light' ? (
                                <img id='lt' src={lt}></img>
                            ) : (
                                <img id='dt' src={dt}></img>
                            )}
                            {tn(theme)}
                        </button>
                    </div>
                {/* */}
            </div>
        </>
    )
}

export default NavBar;