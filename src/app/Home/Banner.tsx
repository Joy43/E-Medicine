'use client';

import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, useMediaQuery, useTheme, Fade } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Slider {
  img: string;
  title: string;
  des: string;
  quality: string;
  price: number;
}

export const Banner: React.FC = () => {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter(); // using useRouter from next/navigation

  const sliders: Slider[] = [
    {
      img: "https://i.postimg.cc/BQsv3117/Doctor-stethocope.png",
      title: "Doctor Stethoscope",
      des: "Upgrade your professional persona with these stethoscope images.",
      quality: "100% Premium Quality",
      price: 10,
    },
    {
      img: "https://i.postimg.cc/YCD2QnDT/Antibacterial-Surgical-Mask.png",
      title: "New Antibacterial Surgical Mask",
      des: "A Symphony of Tranquility. Experience the perfect blend of relaxation and excitement.",
      quality: "100% Premium Quality",
      price: 20,
    },
    {
      img: "https://i.postimg.cc/kggX63sx/fever-tablet.png",
      title: "Fever Tablet",
      des: "I have been a loyal customer of this auto parts company for years and I cannot recommend them enough.",
      quality: "100% Premium Quality",
      price: 12,
    },
    {
      img: "https://i.postimg.cc/8PHzzPRp/Moderna-s-Vaccine.png",
      title: "Blood Pressure Monitor",
      des: "Their extensive selection of high-quality parts and accessories.",
      quality: "100% Premium Quality",
      price: 100,
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentSlider(prev => (prev === sliders.length - 1 ? 0 : prev + 1));
        setFadeIn(true);
      }, 500); // Duration of fade-out
    }, 5000); // Duration between slides

    return () => clearInterval(intervalId);
  }, [currentSlider, sliders.length]);

  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '300px', sm: '450px', md: '600px' },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#002540',
        margin: '8'
      }}
    >
      <Fade in={fadeIn} timeout={500}>
        <Box
          key={currentSlider}
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${sliders[currentSlider].img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: { xs: 2, sm: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                color: '#FFFFFF',
                maxWidth: { xs: '90%', sm: '70%', md: '40%' },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  mb: 2,
                  borderColor: '#0370F7',
                  color: '#FFFFFF',
                  fontWeight: 300,
                  '&:hover': {
                    backgroundColor: '#0370F7',
                    color: '#FFFFFF',
                  },
                }}
              >
                {sliders[currentSlider].quality}
              </Button>
              <Typography variant={isSmallScreen ? "h6" : "h4"} sx={{ fontWeight: 'bold', mb: 2 }}>
                {sliders[currentSlider].title}
              </Typography>
              <Typography variant={isSmallScreen ? "body2" : "body1"} sx={{ mb: 2 }}>
                {sliders[currentSlider].des}
              </Typography>
              <Typography variant={isSmallScreen ? "subtitle2" : "subtitle1"} sx={{ mb: 3 }}>
                Price: ${sliders[currentSlider].price}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  backgroundColor: '#0370F7',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#002540',
                  },
                }}
                onClick={() => router.push('/product')}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};
