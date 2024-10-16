"use client";

import React from 'react';
import Link from 'next/link';
import './Card.css';

const ShowCard = ({ data, className}) => {
  const {id, image, str, dex, class: characterClass, name, int, cha, con, wis} = data;

  return (
    <div className={className}>
    <div className="card">

      <div className='character-class-container'>
        <div className='Vanilla'>
          <h2>{characterClass} - {name}</h2>
        </div>
      </div>

      <div className="card-image-container">
        <img src={image} alt={name} />
      </div>

      <div className='input-container'>
        <h2>Strength: {str}</h2>
        <h2>Dexterity: {dex}</h2>
        <h2>Intelligence: {int}</h2>
        <h2>Charisma: {cha}</h2>
        <h2>Constitution: {con}</h2>
        <h2>Wisdom: {wis}</h2>
      </div>

      <div>
      <Link href={`/edit/${id}`}>
          <button type='button' className='button-edit-character'>Edit Character</button>
      </Link>

      </div>

    </div>
    </div>
  ); 
};

export default ShowCard;