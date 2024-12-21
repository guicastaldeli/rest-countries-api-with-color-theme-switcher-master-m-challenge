import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLayoutEffect } from 'react';
import './App.css';

import DetailsPage from './details-page';
import NavBar from './nav-bar';

import dwn from './svg/chevron-down.svg';
import up from './svg/chevron-up.svg';

function Main() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [sr, setSr] = useState(null);
  const [filter, setFilter] = useState([]);
  const [ivs, setIvs] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  async function __cl() {
    try {
      const res = await fetch('/data.json');
      const data = await res.json();
    
      setData(data);
    } catch(err) {
      console.log(err);
    }
  }

  function _fc() {
    if(data) {
      let fd = data;

      if(sr) {
        fd = fd.filter(c => c.region === sr);
      }

      fd = fd.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

      setFilter(fd)
    }
  }

  function _fr() {
    if(data) {
      let fd = data;

      if(sr) {
        fd = fd.filter(c => c.region === sr);
      }

      setFilter(fd);
    }
  }
  
  //Execs...
    useEffect(() => {
      __cl();
    }, []);

    useEffect(() => {
      if(data) {
        _fc();
      }
    }, [data, search, sr]);
  //

  //Selected Country
    function sc(c) {
      localStorage.setItem('sc', JSON.stringify(c));
      navigate(`/country/${c.alpha3Code}`);
    }
  //

  //Filter
    const ulRef = useRef(null);
    const aRef = useRef(null);

    function f() {
      ulRef.current.style.display = ulRef.current.style.display === 'none' ? 'block' : 'none';
    }

    function tv() {
      setIvs(!ivs)
    }
  //

  return (
    <>
      {/* Bar */}
        <div className='nav-bar'>
          {/* Search */}
            <div className='cs-'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>

              <input id='sc-' type='search' placeholder='Search for a country...' value={search} onChange={(e) => setSearch(e.target.value)}></input>
            </div>
          {/* */}

          {/* Filter by Region */}
            {data && (
              <ul id='fr'>
                <div className='frc' ref={aRef} onClick={() => { f(); tv(); }}>
                  <a>Filter by Region</a>
                  <img id='ud' src={ivs ? up : dwn}></img>

                  <ul id='frr' ref={ulRef} style={{ display: 'none' }}>
                    <div className='rr'>
                      <li id='r' onClick={() => setSr(null)}><a>All</a></li>
                      
                      {[ ...new Set(data.map((c) => c.region))].map((r, i) => (
                        <li id='r' key={i} onClick={() => setSr(r)}><a>{r}</a></li>
                      ))}
                    </div>
                  </ul>
                </div>
              </ul>
            )}
          {/* */}
        </div>
      {/* */}

      {/* Country List */}
        <div className='cnt---'>
          {filter.length > 0 ? (
            filter.map((c, i) => {
              return (
                <div key={i} onClick={() => sc(c)}>
                  {/* Country Countainer */}
                    <div className='c-cnt--'>
                      <img id='f-' src={c.flag}></img>
                      {/* Infos */}
                        <div className='if-'>
                          <p id='nm-'>{c.name}</p>
      
                          {/* adt info... */}
                            <div id='aif-'>
                              <span id='p-'>Population: <a>{c.population.toLocaleString()}</a></span>
                              <span id='r-'>Region: <a>{c.region}</a></span>
                              <span id='c-'>Capital: <a>{c.capital}</a></span>
                            </div>
                          {/* */}
                        </div>
                      {/* */}
                    </div>
                  {/* */}
                </div>
              )
            })
          ) : (
            <p>Doesn't have countries with this name.</p>
          )}
        </div>
      {/* */}
    </>
  );
}

function CountryPage() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/country/:code' element={<DetailsPage />} />
      </Routes>
    </Router>
  )
}

export default CountryPage;
