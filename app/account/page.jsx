'use client'

import { useState, useEffect } from 'react';
import { auth, db, storage } from '@/app/firebase/config'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styles from './Account.module.css';


export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [user, loadingAuth] = useAuthState(auth);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(''); 
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (loadingAuth) return; // Don't proceed if still checking auth

    if (user) {
      getProfile();
    } else {
      router.push('/sign-in'); // Redirect if user is not signed in
    }
  }, [user, loadingAuth]);

  const getProfile = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'profiles', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data.username || '');
        setImageUrl(data.imageUrl || '');
        
      }
    } catch (error) {
      console.warn(error);
    }
    setLoading(false);
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const updates = {
        username,
        updated_at: new Date(),
      };
      await setDoc(doc(db, 'profiles', user.uid), updates, { merge: true });

      if (image) {

        const imageRef = ref(storage, `profileImages/${user.uid}`); // reference for the image
        await uploadBytes(imageRef, image); // Upload the image
        const downloadURL = await getDownloadURL(imageRef); // Get the download URL
        await setDoc(doc(db, 'profiles', user.uid), { imageUrl: downloadURL }, { merge: true }); // Update the profile with the image URL
        setImageUrl(downloadURL); // Update the local state with the new image URL

      }


      alert('Profile updated successfully');
      router.push('/'); // Redirect after updating
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file); // Set selected file
  };

  return (
    <div className={styles.container}>
      <form onSubmit={updateProfile} className={styles.form}>
      <h2 className={styles.title}>Update Profile</h2>

        <div className={styles.formGroup}>

          <div className={styles.profileImage}>
          <img 
            src={imageUrl || 'https://firebasestorage.googleapis.com/v0/b/dnd-game-462a1.appspot.com/o/imf-f.jpg?alt=media&token=5d807954-57db-40a7-b0b1-f1a2cff291b4'}  />
          </div>

          <label htmlFor="profileImage" className={styles.label}>Profile Image</label>
          <input
            id="profileImage"
            type="file"
            onChange={handleImageUpload}
            className={styles.input}
          />
        </div>

        
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="text"
            value={user?.email || ''}
            disabled
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </button>
        </div>


      </form>
    </div>
  );
}
