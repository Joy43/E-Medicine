'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';

import notFoundAnimation from '../app/assets/404.json';
import Buttons from './Component/Button/Buttons';
import { useRouter } from 'next/navigation';

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Lottie 
        animationData={notFoundAnimation}
        style={{ height: '300px', width: '300px' }}
        loop
        autoplay
      />
      <Typography variant="h4" sx={{ mt: 4, color: '#002540' }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#0370F7' }}>
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Buttons label={'Take Me Home'} onClick={() => router.push('/')} />
    </Box>
  );
}

export default NotFound;
