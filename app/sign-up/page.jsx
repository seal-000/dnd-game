'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import styles from './SignUp.module.css';
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

   
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{7,}$/; // At least 7 characters, one uppercase letter
    return passwordRegex.test(password);
  };

  
  const alertMessages = [
    "User already exists",
    "Password must be at least 7 characters long and contain one uppercase letter"
  ];

  const showSpecificAlert = (index) => {
    window.alert(alertMessages[index]);
  };


  const handleSignUp = async () => {
    
    if (!validatePassword(password)){
      showSpecificAlert(1)
      return
    }

    try {
      
      const res = await createUserWithEmailAndPassword(email, password);
   
      if (!res){
        showSpecificAlert(0)
      }

      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');

       
      router.push('/account');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={styles.input}
        />
        <button 
          onClick={handleSignUp} 
          className={styles.button}
        >
          Sign Up
        </button>

        <p className={styles.linkText}>
          Already a user?{' '}
          <Link href="/sign-in" className={styles.link}>Sign In</Link>
        </p>

      </div>

      <div className={styles.readMe}>

        <p>
          
          To read a summary about this project click here: <a href="readMeLink" className={styles.readMeLink}>READ.ME</a>


        </p>

        
      </div>
      
    </div>
  );
};

export default SignUp;

//TO-DO
//Force navigation to create account 