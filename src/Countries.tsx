import React, { useState, useEffect, ChangeEvent } from 'react';

interface Country {
  name: string;
  alpha3Code: string;
  capital: string;
  currencies: Array<object>;
  languages: Array<object>;
  population: number;
  flag: string;
}

function Countries() {
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [sortDirection, setSortDirection] = useState<string>('desc');
  const [filterValue, setFilterValue] = useState<string>('');

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

  return (
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
  );
}

export default Countries;
