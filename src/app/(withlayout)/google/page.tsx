"use client";

import useAxiosPublic from '@/app/Hooks/Axiospublic';
import useAuth from '@/app/Hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Button, Typography, CardActions } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLogin: React.FC = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log(result.user);

      const userInfo = {
        email: result.user?.email || '',
        name: result.user?.displayName || ''
      };

      const res = await axiosPublic.post('/users', userInfo);
      console.log(res.data);
      
      router.push('/product');
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
   <div className='m-10'>
     <Card sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Sign in to eMedicine
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Access the best professional medicine selling platform with your Google account.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleGoogleSignIn}
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          fullWidth
        >
          Sign in with Google
        </Button>
      </CardActions>
    </Card>
   </div>
  );
};

export default GoogleLogin;
