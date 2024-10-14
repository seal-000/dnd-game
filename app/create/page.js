'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Grid from '@mui/material/Grid2';
import Sidebar from "../components/Sidebar";
import styles from './Create.module.css';

export default function Create() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const userSession = sessionStorage.getItem('user');

    
    if (!user && !userSession) {
      router.push('/sign-up');
    }
   

    return (
        
      <div className={styles.container}>

        <Grid container spacing={2} >
            {/* Sidebar Section */}
            <Grid item xs={3}>
              <Sidebar />
            </Grid>

            {/* Main Dashboard Section */}
            
        </Grid>

        <Grid item xs={9} padding={'120px'}>
          
          <h1>Hello</h1>
        
        </Grid>
          
  
      </div>



    );
}
