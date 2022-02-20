import React from 'react';
import "./style.css";
import Weathercard from './weathercard';
import { useState , useEffect } from "react";

const Temp = () => {
    const [searchValue,setSearchValue] = useState('Karachi');
    const [weatherInfo, setWeatherInfo] = useState("");
    
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}& YOUR API KEY`

            const res = await fetch(url);
            const data = await res.json();

            const { temp , humidity , pressure } = data.main;
            const {main: weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country , sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            // console.log(temp);
            // console.log(data)
            setWeatherInfo(myNewWeatherInfo);
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getWeatherInfo();}, []);
  return (
  <>
    <div className="wrap">
        <div className='search'>
            <input type="search" placeholder='Search...'
            autoFocus
            id='seacrch'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)} />
            <button className='searchButton' type='Button' onClick={getWeatherInfo}>Search</button>
        </div>
    </div>

    <Weathercard weatherInfo = {weatherInfo} />
    </>
  );
};

export default Temp;
