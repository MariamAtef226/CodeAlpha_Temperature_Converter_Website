import Result from "./components/Result";
import { useState } from "react";

function App() {
  let [converted, setConverted] = useState({
    celsius: 0,
    fahrenheit: 32,
    kelvin: 273.15,
  });
  let [temperature, setTemperature] = useState(0); // for single source of truth and form control management
  let [currentUnit, setCurrentUnit] = useState("c"); // for single source of truth and form control management

  // Handle Form control changes to reflect in react states for single source of truth
  function tempChange(event) {
    let value = event.target.value;
    convert(value, currentUnit); // for realtime conversion
    setTemperature(value);
  }

  function currentUnitChange(event) {
    let value = event.target.value;
    convert(temperature, value); // for realtime conversion
    setCurrentUnit(value);
  }

  // unit conversion functions
  function celsiusToFahrenheit(temp) {
    return (temp * 9) / 5 + 32;
  }

  function fahrenheitToKelvin(temp) {
    return ((temp - 32) * 5) / 9 + 273.15;
  }

  function kelvinToCelsius(temp) {
    return temp - 273.15;
  }

  // conversion logic
  function convert(v,curr) {
    // check if valid convertion
    if (!isNaN(v)) {
      switch (curr) {
        case "c":
          setConverted((prev) => {
            let f = celsiusToFahrenheit(v);
            let k = fahrenheitToKelvin(f);
            return { celsius: v, fahrenheit: f, kelvin: k };
          });
          break;
        case "f":
          setConverted((prev) => {
            let k = fahrenheitToKelvin(v);
            let c = kelvinToCelsius(k);
            return { celsius: c, fahrenheit: v, kelvin: k };
          });

          break;
        case "k":
          setConverted((prev) => {
            let c = kelvinToCelsius(v);
            let f = celsiusToFahrenheit(c);
            return { celsius: c, fahrenheit: f, kelvin: v };
          });

          break;
      }
    }
  }

  return (
    <>
      <div className="converter-container p-4 text-center">
        <h1 className="text-center mt-4 fw-bold">Temperature Converter</h1>

        <div className="d-flex mt-4">
          <input
            value={temperature}
            className="p-2 clear-outline"
            onChange={tempChange}
          />
          <select
            name="unit"
            className="text-light p-2 clear-outline"
            onChange={currentUnitChange}
          >
            <option selected={currentUnit === "c"} value="c">
              Celsius
            </option>
            <option selected={currentUnit === "f"} value="f">
              Fahrenheit
            </option>
            <option selected={currentUnit === "k"} value="k">
              Kelvin
            </option>
          </select>
        </div>

        <div
          className={`text-danger caution ${
            !isNaN(temperature) && "invisible"
          }`}
        >
          Input temperature should be a valid number!
        </div>

        <h3 className="text-start fw-bold mt-2">Results:</h3>
        <div className="results pb-4">
          <Result unit="Celsius" value={Math.round(converted.celsius*1000)/1000} unitSym="°C" />
          <Result unit="Fahrenheit" value={Math.round(converted.fahrenheit*1000)/1000} unitSym="°F" />
          <Result unit="Kelvin" value={Math.round(converted.kelvin*1000)/1000} unitSym="°K" />
        </div>
      </div>
    </>
  );
}

export default App;
