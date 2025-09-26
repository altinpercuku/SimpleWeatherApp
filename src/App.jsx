import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from 'react-icons/wi';
import { WiWindy } from 'react-icons/wi';
import clear from "./assets/clear.png";







function App() {
  const error = 0;
  return (
    <>
      <div className="weather-app flex justify-center items-center bg-slate-700 w-full h-screen">
        <div className="weather-card bg-blue-700 w-lg h-8/10 rounded-xl p-5">
          { error ? ( <div className="error bg-red-600 text-white p-4 w-full rounded-xl text-center">
            {error}
          </div>) : "" }
          <div className="search w-full flex items-center">
            <input type="text" name='search' placeholder='Kerko...' className='form-control text-center w-8/10 bg-white focus:outline-none hover:shadow-[0_0_10px_white] transition duration-300 p-5 rounded-4xl'  />
            <button className='text-center cursor-pointer p-3 mx-auto bg-white border-2 border-red-50/10 rounded-full focus:outline-none hover:shadow-[0_0_10px_white] transition duration-300'>
              <FaSearch className='text-3xl text-blue-700'/>
            </button>
          </div>
          <div className="weather-information">
            <div className="weather-icon text-white text-center">
              <img src={clear} alt="weather-icon" className='mx-auto w-75 my-2' />
              <p className='temperature text-3xl'>
                9°C
              </p>
              <p className='location text-l'>
                Vushtrri
              </p>
            </div>
          </div>
            <div className="weather-data mt-8">
                <div className="flex flex-row justify-between">
                  <div className="col text-white text-center">
                    <WiHumidity className='text-5xl text-white'/>
                    91%
                  </div>
                  <div className="col text-white text-center">
                    <WiWindy className='text-5xl text-white'/>
                    36 Km/h
                  </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
