import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './App.css';

function DetailsPage() {
    const [country, setCountry] = useState(null);
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fc() {
            try {
                const res = await fetch('/data.json');
                const data = await res.json();
                const cd = data.find(c => c.alpha3Code === code);

                if(cd) {
                    setCountry(cd);
                }
            } catch (err) {
                console.error(err);
            }
        }

        fc();
    }, [code]);

    if(!country) {
        return <p>Loading...</p>;
    }

    const cn = country.currencies && country.currencies[0] ? country.currencies[0].name : 'N/A';
    const l = country.languages ? country.languages.map(ls => ls.name).join(', ') : 'N/A';

    //Border Country
        function ntc(bc) {
            navigate(`/country/${bc}`);
        }

        const bc = country.borders ? country.borders.map((b, i) => (
            <span id='bcn-' key={i} onClick={() => ntc(b)}>{b}</span>
        )) : <p>This country don't have border countries...</p>;
    //

    return (
        <>
            <div className='cd-c-'>
                <button id='bk-' onClick={() => navigate('/')}>Back</button>

                {/* Country Details */}
                    <div className='c-cd--'>
                        <img id='cd-f-' src={country.flag}/>

                        <div className='cd-i-'>
                            <p id='cd-n-'>{country.name}</p>

                            {/* adt info... */}
                                <div className='a-i-'>
                                    <div className='a-i-o-'>
                                        <span id='cd-nn-'>Native Name: <a>{country.nativeName}</a></span>
                                        <span id='cd-p-'>Population: <a>{country.population.toLocaleString()}</a></span>
                                        <span id='cd-r-'>Region: <a>{country.region}</a></span>
                                        <span id='cd-srg-'>Sub Region: <a>{country.subregion}</a></span>
                                        <span id='cd-c'>Capital: <a>{country.capital}</a></span>
                                    </div>

                                    <div className='a-i-t-'>
                                        <span id='cd-t'>Top Level Domain: <a>{country.topLevelDomain}</a></span>
                                        <span id='cd-c'>Currencies: <a>{cn}</a></span>
                                        <span id='cd-l'>Languages: <a>{l}</a></span>
                                    </div>
                                </div>
                            {/* **/}

                            {/* border countries... */}
                                <div className='bc-'>
                                    <p>Border Countries:</p>
                                    <div>{bc}</div>
                                </div>
                            {/* */}
                        </div>
                    </div>
            </div>
            {/* */}
        </>
    )
}

export default DetailsPage;