import React, { useEffect, useState } from 'react';
import './WeatherApp.css';
import { AiOutlineSearch } from "react-icons/ai";
import clear_icon from '../images/clear.png';
import cloud_icon from '../images/cloud.png';
import drizzle_icon from '../images/drizzle.png';
import rain_icon from '../images/rain.png';
import snow_icon from '../images/snow.png';
import mist_icon from '../images/mist.png';
import thunderstorm_icon from '../images/thunderstorm.png';
import humidity_icon from '../images/humidity.png';
import wind_icon from '../images/wind.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const WeatherApp = () => {
    const [temperature, setTemperature] = useState('-');
    const [humidity, setHumidity] = useState('-');
    const [windSpeed, setWindSpeed] = useState('-');
    const [city, setCity] = useState('-');
    const [inputValue, setInputValue] = useState('');
    const [icon, setIcon] = useState(clear_icon);

    let api_key = "1d0b834e3a0bab278206f84d6cd3f53a";

    useEffect(() => {
        async function fetchInitialData() {
            let url = 'https://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&units=Metric&appid=1d0b834e3a0bab278206f84d6cd3f53a';
            const response = await axios.get(url);
            setTemperature(Math.round(response.data.main.temp));
            setWindSpeed(Math.round(response.data.wind.speed));
            setHumidity(Math.round(response.data.main.humidity));
            setCity(response.data.name);

            if (response.data.weather[0].icon === '11d' || response.data.weather[0].icon === '11n') {
                setIcon(thunderstorm_icon);
            }
            else if (response.data.weather[0].icon === '09d' || response.data.weather[0].icon === '09n') {
                setIcon(drizzle_icon);
            }
            else if (response.data.weather[0].icon === '10d' || response.data.weather[0].icon === '10n') {
                setIcon(rain_icon);
            }
            else if (response.data.weather[0].icon === '13d' || response.data.weather[0].icon === '13n') {
                setIcon(snow_icon);
            }
            else if (response.data.weather[0].icon === '50d' || response.data.weather[0].icon === '50n') {
                setIcon(mist_icon);
            }
            else if (response.data.weather[0].icon === '01d' || response.data.weather[0].icon === '01n') {
                setIcon(clear_icon);
            }
            else if (response.data.weather[0].icon === '02d' || response.data.weather[0].icon === '02n') {
                setIcon(cloud_icon);
            }
            else if (response.data.weather[0].icon === '03d' || response.data.weather[0].icon === '03n') {
                setIcon(cloud_icon);
            }
            else if (response.data.weather[0].icon === '04d' || response.data.weather[0].icon === '04n') {
                setIcon(cloud_icon);
            }
        }
        fetchInitialData();
    }, []);

    const search = async () => {
        const inputBox = document.getElementsByClassName('cityInput')[0];
        const inputBoxValue = inputBox.value;
        if (inputBoxValue === '') {
            toast.info("Please enter something before searching", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputBoxValue}&units=Metric&appid=${api_key}`;
            let response = await fetch(url);
            const data = await response.json();

            if (response.status === 404) {
                toast.error('City not available', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setInputValue('');
            }
            else {
                setTemperature(Math.round(data.main.temp));
                setWindSpeed(Math.round(data.wind.speed));
                setHumidity(Math.round(data.main.humidity));
                setCity(data.name);

                if (data.weather[0].icon === '11d' || data.weather[0].icon === '11n') {
                    setIcon(thunderstorm_icon);
                }
                else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                    setIcon(drizzle_icon);
                }
                else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
                    setIcon(rain_icon);
                }
                else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
                    setIcon(snow_icon);
                }
                else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n') {
                    setIcon(mist_icon);
                }
                else if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                    setIcon(clear_icon);
                }
                else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                    setIcon(cloud_icon);
                }
                else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                    setIcon(cloud_icon);
                }
                else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                    setIcon(cloud_icon);
                }
                
                setInputValue('');
            }
        }
    }

    const onChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className='container'>
            <div className="topSection">
                <input type="text" className='cityInput' placeholder='Search here...' value={inputValue} onChange={onChange} />
                <div className="searchIcon" onClick={search}><AiOutlineSearch /></div>
            </div>
            <div className="middleSection">
                <img src={icon} className='weatherIcon hoverable' alt='Weather Icon' />
                <h1 className='temperatureValue hoverable'>{temperature}°C</h1>
                <h1 className='cityName hoverable'>{city}</h1>
            </div>
            <div className="bottomSection">
                <div className="dataSection">
                    <div className="dataImage">
                        <img className='hoverable' src={humidity_icon} alt="Humidity" />
                    </div>
                    <div className="dataDescription hoverable">
                        <h3>~ {humidity}%</h3>
                        <h4>Humidity</h4>
                    </div>
                </div>
                <div className="dataSection">
                    <div className="dataImage">
                        <img className='hoverable' src={wind_icon} alt="Wind" />
                    </div>
                    <div className="dataDescription hoverable">
                        <h3>~ {windSpeed}km/h</h3>
                        <h4>Wind Speed</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
