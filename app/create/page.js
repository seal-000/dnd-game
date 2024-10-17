'use client'

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Grid from '@mui/material/Grid2';
import Sidebar from "../components/Sidebar";
import styles from './Create.module.css';
import CreateCard from "../components/CreateCard";


export default function Create() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    
    useEffect(() => {
      const userSession = sessionStorage.getItem('user');
      if (!user && !userSession){
          router.push('/sign-up')
      
      }
    },  [user, router]);
   

    return (
        
      <div className={styles.container}>

        <Grid container spacing={2} >
            {/* Sidebar Section */}
            <Grid item xs={3}>
              <Sidebar />
            </Grid>

            
            
        </Grid>

        {/* Main Dashboard Section */}
        <Grid item xs={9}>
          
          <div className={styles.tittle}>

            <h1>Create a Character</h1>
          
          </div>
          
          <CreateCard></CreateCard>
          
        
        </Grid>
          
  
      </div>



    );
}
