'use client';

import type { ReactNode } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <Card sx={{ p: 4 }}>
      <Stack spacing={4}>{children}</Stack>
    </Card>
  );
};

export default AuthContainer;