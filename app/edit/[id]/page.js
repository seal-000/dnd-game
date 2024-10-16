"use client";

import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/config'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid } from '@mui/material';
import Sidebar from "../../components/Sidebar";
import '../../components/Card.css';
import styles from './Edit.module.css';



const EditCardPage = ({ params }) => {
  const { id } = params; // Get the ID from the route params
  const [character, setCharacter] = useState({ name: "", str: 0, dex: 0, int: 0, cha: 0, con: 0, wis: 0, class: "", image: "" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchCharacter = async () => {
      const characterRef = doc(db, 'character', id); 
      const characterSnap = await getDoc(characterRef);

      if (characterSnap.exists()) {
        const data = characterSnap.data();
        setCharacter(data);
        const imageIndex = images.indexOf(data.image);
        if (imageIndex !== -1) {
          setCurrentImageIndex(imageIndex);
        }
      } else {
        setFormError('Character not found.');
      }
      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

  const updateCharacter = async (event) => {
    event.preventDefault();

    const image = images[currentImageIndex];
    const characterRef = doc(db, 'character', id); 

    try {
      await updateDoc(characterRef, { ...character, image });
      alert("Success! You updated the character!");
      
    } catch (error) {
      setFormError('Error updating character.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!character) return <div>Character not found</div>;

  return (
    <div className={styles.container}>
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid container spacing={2}>
          {/* Sidebar Section */}
          <Grid item xs={3}>
            <Sidebar />
          </Grid>

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
            <form onSubmit={updateCharacter}>
              <div className='form-container'>
                <div className='input-container'>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" name='name' value={character.name} onChange={handleChange} className='text-input' />
                </div>
                <div className='input-container'>
                  <label> Stat Distribution: </label>
                  <div className='stat-container'>
                    <div>
                      <label htmlFor="str">Str:</label>
                      <input type="number" id="str" name="str" value={character.str} onChange={handleChange} className="text-input" />
                    </div>
                    <div>
                      <label htmlFor="dex">Dex:</label>
                      <input type="number" id="dex" name="dex" value={character.dex} onChange={handleChange} className="text-input" />
                    </div>
                    <div>
                      <label htmlFor="int">Int:</label>
                      <input type="number" id="int" name="int" value={character.int} onChange={handleChange} className="text-input" />
                    </div>
                    <div>
                      <label htmlFor="cha">Cha:</label>
                      <input type="number" id="cha" name="cha" value={character.cha} onChange={handleChange} className="text-input" />
                    </div>
                    <div>
                      <label htmlFor="con">Con:</label>
                      <input type="number" id="con" name="con" value={character.con} onChange={handleChange} className="text-input" />
                    </div>
                    <div>
                      <label htmlFor="wis">Wis:</label>
                      <input type="number" id="wis" name="wis" value={character.wis} onChange={handleChange} className="text-input" />
                    </div>
                  </div>
                </div>
                <div className='input-container'>
                  <label> Class: </label>
                  <div className='radiobtn-container'>
                    {['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'rogue', 'sorcerer', 'warlock', 'wizard'].map((className) => (
                      <div key={className}>
                        <input
                          type="radio"
                          id={className}
                          name="class"
                          value={className}
                          checked={character.class === className}
                          onChange={handleChange}
                        />
                        <label htmlFor={className}>{className.charAt(0).toUpperCase() + className.slice(1)}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" className='submit-btn'> Update Character </button>
              {formError && <p className="error">{formError}</p>}
            </form>
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default EditCardPage;
