'use client'
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Grid from '@mui/material/Grid2';
import Sidebar from "./components/Sidebar";
import { Box } from '@mui/material';

export default function Home() {

  const [user] = useAuthState(auth);
  const router = useRouter()
  //console.log(user)

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
      <Grid item xs={9} padding={'120px'}>
          
            <img 
                src="https://logos-world.net/wp-content/uploads/2021/12/DnD-Logo.png"
                className={styles.responsiveImage} 
                alt="DnD Logo" 
            />

            <br />
            <h1>Welcome to the D&D Creator!</h1>
            <br />
            <br />
            <h3>Here is where you can create your very own set of characters before sending them off into your own adventure!</h3>
            <br />
            
          
      </Grid>

    </div>
  );
}
