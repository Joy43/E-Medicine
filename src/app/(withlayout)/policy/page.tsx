'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Add Medicine Details',
    description: `Enter the basic details of the medicine such as name, category, and description. This includes specifying the dosage, ingredients, and usage instructions.`,
  },
  {
    label: 'Set Pricing and Stock',
    description: 'Define the price for each unit of the medicine and update the available stock. Ensure that the pricing aligns with market standards.',
  },
  {
    label: 'Upload Product Images',
    description: `Upload high-quality images of the medicine packaging and product. Make sure the images are clear and informative.`,
  },
  {
    label: 'Review and Publish',
    description: `Review all the details entered for accuracy. Once confirmed, publish the product on the platform for customers to purchase.`,
  },
];

const VerticalLinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleResetSteps = () => {
    setActiveStep(0);
  };

  return (
    <div className='mt-6 mb-6 mx-auto w-1/2 p-6'>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper className='text-blue-500' activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step className='text-blue-500' key={step.label}>
              <StepLabel 
                optional={
                  index === steps.length - 1 ? (
                    <Typography className='text-gray-500' variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <p className='text-blue-500'>{step.label}</p>
              </StepLabel>
              <StepContent>
                <Typography className='text-white'>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={index === steps.length - 1 ? handleResetSteps : handleNextStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handlePreviousStep}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleResetSteps} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default VerticalLinearStepper;
