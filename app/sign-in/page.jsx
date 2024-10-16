'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {auth} from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import styles from './SignIn.module.css';
import { sendPasswordResetEmail } from 'firebase/auth';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {

    if (!email || !password) {
      window.alert("Please enter both email and password.");
      return;
    }

    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  const handleResetPassword = async () => {

    if (!email){
      window.alert("Please enter your email first")
      return
    }

    try {
      await sendPasswordResetEmail(auth, email);
      window.alert('Password reset email sent!')
    } catch (e) {

      console.error('Error sending password reset email:', e);
    }


  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
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
          onClick={handleSignIn}
          className={styles.button}
        >
          Sign In
        </button>

        <p className={styles.linkText}>
          Forgot a password?{' '}
          <span className={styles.link} onClick={handleResetPassword}>
            Reset here
          </span>
        </p>

      </div>
    </div>
  );
};

export default SignIn;