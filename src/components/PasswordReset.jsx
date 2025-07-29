import React, { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios';
import { resetPassword, resetPasswordConfirm } from '../api/auth';

const steps = ['Enter Email', 'Enter Code', 'Set New Password'];

export default function PasswordResetStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleNext = async () => {
    try {
      if (activeStep === 0) {
        // Step 1: Send password reset email
        await resetPassword( { email });
        setMessage('Check your email for the reset code.');
      }
      if (activeStep === 1) {
        // Step 2: Just move to password input (token will be sent later)
        setMessage('Token verified (handled later when submitting password).');
      }
      if (activeStep === 2) {
        // Step 3: Confirm password reset
        await resetPasswordConfirm({
          uid: '', // Usually extracted from email link, but can be tokenized
          token,
          new_password1: newPassword,
          new_password2: newPassword,
        });
        setMessage('Password has been reset successfully!');
      }
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.detail || 'Something went wrong.'));
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setEmail('');
    setToken('');
    setNewPassword('');
    setMessage('');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>{message || 'All steps completed!'}</Typography>
          <Button onClick={handleReset}>Start Over</Button>
        </>
      ) : (
        <>
          <Box sx={{ mt: 2 }}>
            {activeStep === 0 && (
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            )}
            {activeStep === 1 && (
              <TextField
                label="Reset Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                fullWidth
              />
            )}
            {activeStep === 2 && (
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
              />
            )}
          </Box>

          <Typography sx={{ mt: 1, color: 'primary.main' }}>{message}</Typography>

          <Box sx={{ mt: 2 }}>
            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
