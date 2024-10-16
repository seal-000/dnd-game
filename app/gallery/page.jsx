"use client";

import ShowCard from '../components/ShowCard';
import { db, auth } from '../firebase/config';  
import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from "../components/Sidebar";
import { collection, getDocs } from 'firebase/firestore';
import "./Gallery.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'



export default function Gallery() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [shuffling, setShuffling] = useState(false);
    const classes = ['All', 'Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Rogue', 'Sorcerer', 'Wizard',  'Warlock'];

    const [user] = useAuthState(auth);
    const router = useRouter()
    const userSession = sessionStorage.getItem('user');
    if (!user && !userSession){
        router.push('/sign-up')
    
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get a reference to the "character" collection in Firestore
                const querySnapshot = await getDocs(collection(db, 'character'));

                // Transform the data into an array
                const firestoreData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setData(firestoreData);
                setFilteredData(firestoreData);
            } catch (error) {
                console.log('Error fetching data from Firestore: ', error);
            }
        };

        fetchData();
    }, []);

    const handleShuffle = (className) => {
        setShuffling(true);
        setSelectedClass(className);
        
        // Filter the data based on the selected class
        const newFilteredData = className === 'All' ? data : data.filter((item) => item.class.toLowerCase() === className.toLowerCase());

        // Stop the animation after a moment
        setTimeout(() => {
            setFilteredData(newFilteredData);
            setShuffling(false);
        }, 300);  // (300ms)
    };

    return (
        <div className="container">
        <Box sx={{ flexGrow: 1, padding: '20px'  }}>
            <Grid container spacing={2}>
                {/* Sidebar Section */}
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>

                {/* Main Content Section */}
                <Grid item xs={10}>
                    <div className="gallery">
                        <h1 className="header">Gallery</h1>
                        <div className="select-container">
                            <label htmlFor="dnd-class" className="custom-label">Choose a class:</label>
                            <select id="dnd-class" onChange={(e) => handleShuffle(e.target.value)}>
                                {classes.map((className) => (
                                    <option key={className} value={className}>
                                        {className}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={`shuffle-container ${shuffling ? 'shuffling' : ''}`}>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <ShowCard key={item.id} data={item} className={`card-animation`} />
                                ))
                            ) : (
                                <p className="no-characters-message">No characters available for this class.</p>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
        </div>
    );
}
