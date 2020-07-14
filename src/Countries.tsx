import React, { useState, useEffect, ChangeEvent } from 'react';
import CountryDetail from './CountryDetail';

interface CountryLanguages {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
interface CountryCurrencies {
  code: string;
  name: string;
  symbol: string;
}
interface Country {
  name: string;
  alpha3Code: string;
  capital: string;
  currencies: Array<CountryCurrencies>;
  languages: Array<CountryLanguages>;
  population: number;
  flag: string;
}

function Countries() {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [sortDirection, setSortDirection] = useState<string>('desc');
  const [filterValue, setFilterValue] = useState<string>('');
  const [showCountryDetail, setShowCountryDetail] = useState<boolean>(false);
  const [detailName, setDetailName] = useState<string>('');
  const [detailCapital, setDetailCapital] = useState<string>('');
  const [detailLanguages, setDetailLanguages] = useState<string>('');
  const [detailCurrencies, setDetailCurrencies] = useState<string>('');

  const sortDesc = (firstElement: Country, secondElement: Country) =>
    firstElement.population > secondElement.population ? 1 : -1;
  const sortAsc = (firstElement: Country, secondElement: Country) =>
    firstElement.population < secondElement.population ? 1 : -1;

  const formatPopulation = (population: number) => population.toLocaleString();
  const changeSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setCountries(countries.sort(sortDirection === 'asc' ? sortAsc : sortDesc));
  };
  const fetchAllCountries = () => {
    setSortDirection('desc');
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;languages;alpha3Code;population;flag')
      .then(response => response.json())
      .then(c => c.sort(sortAsc))
      .then(setCountries)
      .catch(console.error);
  };

  const filterCountries = function(event: ChangeEvent<HTMLInputElement>) {
    setFilterValue(event.target.value);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);
  useEffect(() => {
    if (filterValue === '') {
      fetchAllCountries();
    } else {
      let lowerCaseFilterValue = filterValue.toLowerCase();
      let filteredCountries: Array<Country> = [];
      for (var i = 0, l = countries.length, country; i < l; i++) {
        country = countries[i];
        if (
          country.name.toLowerCase().includes(lowerCaseFilterValue) ||
          country.alpha3Code.toLowerCase().includes(lowerCaseFilterValue)
        ) {
          filteredCountries.push(country);
        }
      }
      console.log(filteredCountries);
      setCountries(filteredCountries);
    }
  }, [filterValue]);

  const showDetail = (country: Country) => {
    setDetailName(country.name);
    setDetailCapital(country.capital);
    setDetailLanguages(country.languages.map(language => language.name).join(','));
    setDetailCurrencies(country.currencies.map(currency => currency.name).join(','));
    setShowCountryDetail(true);
  };
  const closeDetail = () => {
    setShowCountryDetail(false);
  };

  return (
    <>
      <div className={showCountryDetail ? 'display-block' : 'display-none'}>
        <CountryDetail
          name={detailName}
          capital={detailCapital}
          languages={detailLanguages}
          currencies={detailCurrencies}
        />
        <button onClick={closeDetail}>Close</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>
              Population<button onClick={changeSortDirection}>{sortDirection}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}>
              <input placeholder="Filter By Country or Code" value={filterValue} onChange={filterCountries} />
            </td>
          </tr>
          {countries.map((row, item) => (
            <tr key={item}>
              <td>
                <img src={row.flag} width={20} alt={row.name} />
                {row.name}
                <button onClick={() => showDetail(row)}>More Details</button>
                <br />
                {row.alpha3Code}
              </td>
              <td>
                {formatPopulation(row.population)}
                <br />
                {row.capital}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Countries;
