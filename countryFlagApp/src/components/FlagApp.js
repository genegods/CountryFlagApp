import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const FlagApp = () => {
  const [countryState, setCountryState] = useState({
    loading: false,
    countries: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch spinner
        setCountryState({
          ...countryState,
          loading: true,
        });

        //  fetch data
        const dataUrl = `https://restcountries.com/v3.1/all`;
        const response = await axios.get(dataUrl);
        setCountryState({
          ...countryState,
          countries: response.data,
          loading: false,
        });
      } catch (error) {
        setCountryState({
          ...countryState,
          loading: false,
          errorMessage: "Sorry Something went wrong",
        });
      }
    };

    fetchData();
  }, []);
  const { loading, errorMessage, countries } = countryState;
  console.log("loading", loading);
  console.log("countries", countries);
  console.log("errorMessage", errorMessage);

  const [selectedCountry, setSelectedCountry] = useState();
  console.log("selectedCountry", selectedCountry);

  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((obj) => {
    if (obj.name.common === selectedCountry) {
      return true;
    }
    return false;
  });
  console.log("searchSelectedCountry", searchSelectedCountry);

  return (
    <React.Fragment>
      <section>
        <div className="bg-white w-auto h-96 pb-20 mx-5 mt-40 sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
          {/* header section */}
          <div className="h-32 flex justify-center items-center shadow">
            <p className="uppercase font-bold text-3xl text-center">
              Select Country / <br />
              auto flag & area code{" "}
            </p>
          </div>

          {/* body section */}
          <div>
              { loading === true?
               <div className="flex justify-center items-center h-48">
                   <p className="uppercase font-bold text-3xl">...loading</p>
               </div>:
                  <div className="grid justify-center mt-14 mx-10 space-y-10">
            
              <div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className=" w-96 h-14 text-xl rounded-lg md:text-2xl "
                  >
                  <option>--Select Country--</option>
                  {countries.map((item) => {
                      return (
                          <option key={uuidv4()} value={item.name.common}>
                        {item.name.common}
                      </option>
                    );
                })}
                </select>
              </div>
              <div>
                {searchSelectedCountry && (
                    <div className="flex space-x-4">
                    <div className="flex items-end border-b-2 border-gray-500 pb-2">
                      <img
                        className="w-16 h-8"
                        src={
                            searchSelectedCountry &&
                            searchSelectedCountry.flags.png
                        }
                        alt=""
                        />
                    </div>
                    <div>
                      <p className="h-14 text-xl flex items-end border-b-2 border-gray-500 pb-3 md:text-2xl">
                        {searchSelectedCountry &&
                          searchSelectedCountry.idd.root}
                        {searchSelectedCountry &&
                          searchSelectedCountry.idd.suffixes}
                      </p>
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="w-full h-14 text-xl border-b-2 border-t-0 border-l-0 border-r-0 focus:ring-white focus:border-b-2 focus:outline-none md:text-2xl"
                        />
                    </div>
                  </div>
                )}
              </div>
              
            </div>
            }
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default FlagApp;
