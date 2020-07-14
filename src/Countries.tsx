import React, { useState, useEffect } from 'react';

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

  const sortDesc = (firstElement: Country, secondElement: Country) =>
    firstElement.population > secondElement.population ? 1 : -1;
  const sortAsc = (firstElement: Country, secondElement: Country) =>
    firstElement.population < secondElement.population ? 1 : -1;

  const formatPopulation = (population: number) => population.toLocaleString();
  const changeSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    setCountries(countries.sort(sortDirection === 'asc' ? sortAsc : sortDesc));
  };

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;languages;alpha3code;population;flag')
      .then(response => response.json())
      .then(c => c.sort(sortAsc))
      .then(setCountries)
      .catch(console.error);
  }, []);

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
