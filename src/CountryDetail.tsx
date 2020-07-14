import React, { useState } from 'react';

interface CountryDetailProps {
  name: string;
  capital: string;
  languages: string;
  currencies: string;
}
const CountryDetail = (props: CountryDetailProps) => {
  return (
    <div id="country-detail">
      <h2>{props.name}</h2>
      <p>
        Capital
        <br />
        {props.capital}
      </p>
      <p>
        Languages
        <br />
        {props.languages}
      </p>
      <p>
        Currencies
        <br />
        {props.currencies}
      </p>
    </div>
  );
};

export default CountryDetail;
