import React, { useState } from 'react';

interface CountryDetailProps {
  name: string;
  capital: string;
  languages: string;
  currencies: string;
}
const CountryDetail = (props: CountryDetailProps) => {
  return (
    <>
      <h2>{props.name}</h2>
      <p>
        <span className="small">Capital</span>
        <br />
        {props.capital}
      </p>
      <p>
        <span className="small">Languages</span>
        <br />
        {props.languages}
      </p>
      <p>
        <span className="small">Currencies</span>
        <br />
        {props.currencies}
      </p>
    </>
  );
};

export default CountryDetail;
