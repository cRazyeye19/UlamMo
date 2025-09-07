'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <Stack spacing={1} sx={{ textAlign: 'center' }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  );
};

export default AuthHeader;