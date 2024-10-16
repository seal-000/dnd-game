
"use client";

import React, { useState } from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation"; 
import { Box, Grid, TextField, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { storage, db } from '../firebase/config'; 
import { ref, uploadString } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';


function CreateCard() {
  
  const router = useRouter(); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [character, setcharacter] = useState({ name: "", str: 0, dex: 0, int: 0, cha: 0, con: 0, wis: 0, class: "", image: "" });
  const [formError, setFormError] = useState(null);

  const images = [
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fbarbarian.jpg?alt=media&token=d8789de5-ca89-496d-96ed-605a85beb79c',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fbard.jpg?alt=media&token=6513cefb-2216-4322-a7e6-cf3a5d8429ac',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fcleric.jpg?alt=media&token=0ca6a7b5-78a8-45bd-b8fb-09a171a7dfda',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fdruid.jpg?alt=media&token=16fe8b1b-41fd-44b3-9552-15605b6088a6',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Ffighter.jpg?alt=media&token=94e63d7d-9bd8-4cf2-aeec-0f8028d3d983',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fmonk.jpg?alt=media&token=2f993890-df40-45f5-bc0a-199ee0668072',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fpaladin.jpg?alt=media&token=533420af-2fe9-455d-99f6-54064abc6452',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fwizard.jpg?alt=media&token=9a8dec56-8c4b-4d6e-b0f7-4d97ad8c05b8',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fsorcerer.png?alt=media&token=eb70fc4e-2092-4e13-ae1e-27bad0986e5c',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Frogue.jpg?alt=media&token=8824aef9-c85a-4688-a0b3-a14d2acdce2c',
    'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/dndCharacters%2Fwarlock.jpg?alt=media&token=7ed1b68d-985f-4d29-9d0b-e7f1d2b78b82'


    
  ];

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const createCharacter = async (event) => {
    event.preventDefault();

    const image = images[currentImageIndex];

    try {
      
      const characterData = { ...character, image }; 
      await addDoc(collection(db, 'character'), characterData); 
      alert("Success! You created a character!");
      router.push('/gallery'); 
    } catch (error) {
      setFormError('Error creating character: ' + error.message);
    }


  };



  const handleChange = (event) => {
    const { name, value } = event.target;
    setcharacter((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  }

  return (
    <div className="card">
      <div className="card-image-container">
        <img src={images[currentImageIndex]} alt="card-img" />
        <button className="card-nav-button card-nav-button-left" onClick={handleBack}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className="card-nav-button card-nav-button-right" onClick={handleNext}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <form onSubmit={createCharacter}>
        <div className='form-container'>
          
          <div className='input-container-name'>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name='name' onChange={handleChange} className='text-input' />
          </div>

          <div className='input-container'>
            <label> Stat Distribution: </label>
            <div className='stat-container'>
            <Grid container spacing={1}>
                
                <Grid item xs={12}>
                    <TextField
                        label="Str"
                        variant="outlined"
                        type="number"
                        id="str"
                        name="str"
                        value={character.str}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        sx={{ maxWidth: '80px' }}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                      label="Dex"
                      variant="outlined"
                      type="number"
                      id="dex"
                      name="dex"
                      value={character.dex}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      sx={{ maxWidth: '80px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                      label="Int"
                      variant="outlined"
                      type="number"
                      id="int"
                      name="int"
                      value={character.int}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      sx={{ maxWidth: '80px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                      label="Cha"
                      variant="outlined"
                      type="number"
                      id="cha"
                      name="cha"
                      value={character.cha}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      sx={{ maxWidth: '80px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                      label="Con"
                      variant="outlined"
                      type="number"
                      id="con"
                      name="con"
                      value={character.con}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      sx={{ maxWidth: '80px' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                      label="Wis"
                      variant="outlined"
                      type="number"
                      id="wis"
                      name="wis"
                      value={character.wis}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      sx={{ maxWidth: '80px' }}
                    />
                </Grid>

            </Grid>
            </div>
          </div>
          <div className='input-container'>
          <FormControl component="fieldset">
            <FormLabel component="legend">Class:</FormLabel>
            <RadioGroup
              aria-label="class"
              name="class"
              value={character.class} // Bind to character class
              onChange={handleChange}  // Handle change for the radio buttons
            >
              <FormControlLabel value="barbarian" control={<Radio />} label="Barbarian" />
              <FormControlLabel value="bard" control={<Radio />} label="Bard" />
              <FormControlLabel value="cleric" control={<Radio />} label="Cleric" />
              <FormControlLabel value="druid" control={<Radio />} label="Druid" />
              <FormControlLabel value="fighter" control={<Radio />} label="Fighter" />
              <FormControlLabel value="monk" control={<Radio />} label="Monk" />
              <FormControlLabel value="paladin" control={<Radio />} label="Paladin" />
              <FormControlLabel value="rogue" control={<Radio />} label="Rogue" />
              <FormControlLabel value="sorcerer" control={<Radio />} label="Sorcerer" />
              <FormControlLabel value="warlock" control={<Radio />} label="Warlock" />
              <FormControlLabel value="wizard" control={<Radio />} label="Wizard" />


            </RadioGroup>
          </FormControl>
          </div>
        </div>
        <button type="submit" className='submit-btn'> Create Character </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreateCard;