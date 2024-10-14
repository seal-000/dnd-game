"use client";

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link'; 
import "../components/Card.css"
import { useState, useEffect } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';


import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import CollectionsIcon from '@mui/icons-material/Collections';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';

import { auth, db, storage } from '@/app/firebase/config'; // Make sure to import your Firebase config
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [imageUrl, setImageUrl] = useState(''); 
  const [user] = useAuthState(auth)

  // Close the drawer and show only icons on small screens
  const drawerOpen = isSmallScreen ? false : open;


  useEffect(() => {
    if (user) {
      const fetchUserProfileImage = async () => {
        try {
          const userDocRef = doc(db, 'profiles', user.uid); // Assuming 'profiles' is the collection name
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setImageUrl(userData.imageUrl); // Adjust based on your Firestore data structure
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      };

      fetchUserProfileImage();
    }
  }, [user]);

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Drawer variant="permanent" open={drawerOpen} >
      <DrawerHeader>
        {/* Logo or other header content */}
        <IconButton onClick={() => setOpen(!open)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
            {/* Home */}
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link href="/" passHref>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
            </Link>
            </ListItem>
    
            {/* Create */}
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link href="/create" passHref>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="Create" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
            </Link>
            </ListItem>
    
            {/* Gallery */}
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link href="/gallery" passHref>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Gallery" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
            </Link>
            </ListItem>
    
            {/* Comments */}
            <ListItem disablePadding sx={{ display: 'block' }}>
            <Link href="/comments" passHref>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center',
                    }}
                >
                    <CommentIcon />
                </ListItemIcon>
                <ListItemText primary="Comments" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                </ListItemButton>
            </Link>
            </ListItem>
      </List>
      
      <div className="user-item"> {/* Add custom class here */}
        <ListItem disablePadding sx={{ display: 'block' }}>
            <Link href="/account" passHref>
            <ListItemButton
                className="user-item-button"
                sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2.5,
                }}
            >
                <ListItemIcon
                className='user-item-icon'
                sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                    justifyContent: 'center'
                }}
                >
                    <Avatar 
                    alt="User Avatar" 
                    src={imageUrl}
                    sx={{ width: 36, height: 36 }} // Adjust the size of the avatar here
                    />

                </ListItemIcon>
                <ListItemText primary="Account" sx={{ opacity: drawerOpen ? 1 : 0 }} />
            </ListItemButton>
            </Link>
        </ListItem>
      </div>
    </Drawer>
  </Box>
  
  );
}
