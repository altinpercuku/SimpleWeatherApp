import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from 'react-icons/wi';
import { WiWindy } from 'react-icons/wi';
import clear from "./assets/clear.png";
import cloud from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import humidity from "./assets/humidity.png";
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"

function App() {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState("")


  const search = async (city) => {
    const icons = {
      "01d": clear,
      "01n": clear,
      "02d": cloud,
      "02n": cloud,
      "03d": cloud,
      "03n": cloud,
      "04d": drizzle,
      "04n": drizzle,
      "09d": rain,
      "09n": rain,
      "10d": rain,
      "10n": rain,
      "13d": snow,
      "13n": snow,
    }

    try{
      const api = "4d76bc4a007c1b248e062a2132ff4ca1"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
      const res = await fetch(url)

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Vendi juaj nuk u gjet"); // city not found
        } else {
          throw new Error("Diçka shkoi keq. Ju lutem provoni përsëri.");
        }
      }

      const data = await res.json()
      setError("");
      console.log(data)
      const xicon = icons[data.weather[0].icon] || clear
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: xicon,
      })
    }
    catch (err) {
      setWeatherData(null);
      setError(err.message) 
    }
  }

  useEffect(() => {
    search("Moscow")
  },[])
  return (
    <>
    <div className="main-s">
      <div className="weather-app flex justify-center items-center w-full h-screen">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <div className="weather-card bg-blue-700 w-lg h-8/10 rounded-xl p-5">
          <div className="search w-full flex items-center">
            <input type="text" ref={inputRef} name='search' placeholder='Kerko...' className='form-control text-center w-8/10 bg-white focus:outline-none hover:shadow-[0_0_10px_white] transition duration-300 p-5 rounded-4xl'  />
            <button onClick={() => search(inputRef.current.value)} className='text-center cursor-pointer p-3 mx-auto bg-white border-2 border-red-50/10 rounded-full focus:outline-none hover:shadow-[0_0_10px_white] transition duration-300'>
              <FaSearch className='text-3xl text-blue-700'/>
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {weatherData && (
            <>
              <div className="weather-information">
                <div className="weather-icon text-white text-center">
                  <img src={weatherData.icon} alt="weather-icon" className='mx-auto w-75 my-2' />
                  <p className='temperature text-3xl'>
                    {weatherData.temperature}°C
                  </p>
                  <p className='location text-l'>
                    {weatherData.location}
                  </p>
                </div>
              </div>
              <div className="weather-data mt-8">
                <div className="flex flex-row justify-between">
                  <div className="col text-white text-center">
                    <WiHumidity className='text-5xl text-white'/>
                    {weatherData.humidity}%
                  </div>
                  <div className="col text-white text-center">
                    <WiWindy className='text-5xl text-white'/>
                    {weatherData.windSpeed} Km/h
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
