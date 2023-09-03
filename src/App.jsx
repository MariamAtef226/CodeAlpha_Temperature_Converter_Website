import Result from './components/Result'
import { useState, useEffect } from 'react'

function App() {
  let [converted, setConverted] = useState({ celsius: 0, fahrenheit: 32, kelvin: 273.15 });
  let [temperature, setTemperature] = useState(0); // for single source of truth and form control management
  let [currentUnit, setCurrentUnit] = useState('c'); // for single source of truth and form control management


  function tempChange(event) {
    let value = event.target.value;
    setTemperature(value);
  }

  function currentUnitChange(event) {
    let value = event.target.value;
    setCurrentUnit(value);
  }

  function celsiusToFahrenheit(temp) {
    return (temp * 9 / 5 + 32);
  }

  function fahrenheitToKelvin(temp) {
    return ((temp - 32) * 5 / 9 + 273.15)
  }

  function kelvinToCelsius(temp) {
    return (temp - 273.15)
  }

  function convert() {
    switch (currentUnit) {
      case 'c':
        setConverted((prev) => {
          let f = celsiusToFahrenheit(temperature);
          let k = fahrenheitToKelvin(f);
          return { celsius: temperature, fahrenheit: f, kelvin: k }
        });
        break;
      case 'f':
        setConverted((prev) => {
          let k = fahrenheitToKelvin(temperature);
          let c = kelvinToCelsius(k);
          return { celsius: c, fahrenheit: temperature, kelvin: k }
        });

        break;
      case 'k':
        setConverted((prev) => {
          let c = kelvinToCelsius(temperature);
          let f = celsiusToFahrenheit(c);
          return { celsius: c, fahrenheit: f, kelvin: temperature }
        });

        break;

    }

  }


  return (
    <>
      <div className="converter-container p-4 text-center">
        <h1 className="text-center mt-4">Temperature Converter</h1>
        <div className="d-flex mt-4">
          <input value={temperature} className="w-75 p-2 clear-outline" onChange={tempChange} />
          <select name='unit' className="w-25 text-light p-2 clear-outline" onChange={currentUnitChange}>
            <option selected={currentUnit === 'c'} value='c'>
              Celsius
            </option>
            <option selected={currentUnit === 'f'} value='f'>
              Fahrenheit
            </option>
            <option selected={currentUnit === 'k'} value='k'>
              Kelvin
            </option>
          </select>
        </div>
        <button className='clear-outline p-2 m-2 mt-4 convert' onClick={convert}>Convert</button>

        <div className="results pb-4">
          <Result unit="Celsius" value={converted.celsius} unitSym='°C' />
          <Result unit="Fahrenheit" value={converted.fahrenheit} unitSym='°F' />
          <Result unit="Kelvin" value={converted.kelvin} unitSym='°K' />

        </div>
      </div>
    </>
  )
}

export default App
