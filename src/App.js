import { useEffect, useRef, useState } from "react";
import { GET_WEATHER } from "./GraphQL/Queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
} from "react-icons/ti";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function App() {
  const inputRef = useRef();
  const [loadedData, setLoadedData] = useState();
  const [cityName, setCityName] = useState("");
  // const { loading, error, data } = useQuery(GET_WEATHER, {
  //   variables: { name: cityName },
  // });
  const [getCityByName, { called, loading, data }] = useLazyQuery(GET_WEATHER, {
    variables: { name: cityName },
  });
  console.log(data);
  let date;
  let day;
  let week;
  let monthNumber;
  let year;
  let fullDate;
  let icon;

  const formSubmitHandler = (e) => {
    getCityByName();
    e.preventDefault();
    setCityName(inputRef.current.value);
  };

  useEffect(() => {
    if (data) {
      setLoadedData(data.getCityByName);
    }
  }, [data]);
  if (loadedData) {
    date = new Date(data.getCityByName.weather.timestamp);
    day = date.getDate();
    week = date.getDay();
    monthNumber = date.getMonth();
    year = date.getFullYear();
    fullDate = `${weekday[week]} ${day} ${month[monthNumber]} ${year}`;
    switch (loadedData.weather.summary.icon) {
      case "01d":
        icon = <TiWeatherSunny className="mt-3 mb-2 text-9xl" />;
        break;
      case "02d":
        icon = <TiWeatherPartlySunny className="mt-3 mb-2 text-9xl" />;
        break;
      case "03d":
        icon = <TiWeatherCloudy className="mt-3 mb-2 text-9xl" />;
        break;
      case "04d":
        icon = <TiWeatherCloudy className="mt-3 mb-2 text-9xl" />;
        break;
      case "09d":
        icon = <TiWeatherDownpour className="mt-3 mb-2 text-9xl" />;
        break;
      case "10d":
        icon = <TiWeatherShower className="mt-3 mb-2 text-9xl" />;
        break;
      case "11d":
        icon = <TiWeatherStormy className="mt-3 mb-2 text-9xl" />;
        break;
      case "13d":
        icon = <TiWeatherSnow className="mt-3 mb-2 text-9xl" />;
        break;
      case "50d":
        icon = <TiWeatherWindy className="mt-3 mb-2 text-9xl" />;
        break;
    }
  }
  return (
    <>
      <div className="h-screen text-white font-Ubunto bg-[url(./assets/clouds.jpg)] bg-top object-cover">
        <div className="bg-black bg-opacity-30 h-screen flex flex-col items-center">
          <h1 className="text-white font-Ubunto text-5xl sm:text-6xl md:text-8xl p-4 font-extrabold w-full">
            Weather Forecasting App
          </h1>
          <form
            className="w-full flex justify-center items-center"
            onSubmit={formSubmitHandler}
          >
            <label htmlFor="cityName" className="text-xl mr-3">
              City:
            </label>
            <input
              ref={inputRef}
              type="text"
              name="cityName"
              id="cityName"
              className="w-5/12 mr-3 bg-opacity-70 bg-white outline-none text-black text-2xl font-thin p-2 rounded-tl-lg rounded-br-lg"
            />
            <button type="submit" className="text-xl">
              Search
            </button>
          </form>
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {!loading && loadedData && (
            <div className="flex flex-col w-full h-full mt-10 items-center">
              <div className="">
                <p className="inline mr-3 text-3xl font-black">
                  {loadedData.name}
                </p>
                <p className="inline text-3xl font-black">
                  {loadedData.country}
                </p>
                <p className="text-center text-base font-thin">{fullDate}</p>
              </div>
              <div>
                {icon}
                <p className="text-center text-xl mb-1">
                  {loadedData.weather.summary.title}
                </p>
              </div>
              <div className="bg-white bg-opacity-30 p-5 rounded-lg font-black text-8xl">
                {(loadedData.weather.temperature.actual - 273.15).toFixed(0)}°C
              </div>
              feels like:{" "}
              {(loadedData.weather.temperature.feelsLike - 273.15).toFixed(0)}{" "}
              max:
              {(loadedData.weather.temperature.max - 273.15).toFixed(0)} min:
              {(loadedData.weather.temperature.min - 273.15).toFixed(0)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
