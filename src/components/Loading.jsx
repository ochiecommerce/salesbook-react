import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const Loading = ({ text = 'Loading', size = 16, color = 'inherit' }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <CircularProgress size={size} thickness={4} color="inherit" />
      <Typography variant="body2" color={color}>
        {text}...
      </Typography>
    </Box>
  );
};

export default Loading;
