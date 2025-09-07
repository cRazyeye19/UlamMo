'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';

import AuthContainer from '../_components/auth-container';
import AuthHeader from '../_components/auth-header';
import AuthLayout from '../_components/auth-layout';
import Button from '../../_components/common/button';
import Link from '../../_components/common/link';

const VerificationPage = () => {
  return (
    <AuthLayout>
      <AuthHeader
        title="Verification"
        subtitle="Enter the verification code we've sent to your email"
      />

      <AuthContainer>
        <Stack alignItems="center" spacing={4}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 80,
              height: 80,
            }}
          >
            <MarkAsUnreadIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h6">Verification Code</Typography>

          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}
            >
              4
            </Avatar>
            <Avatar
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.main',
              }}
            >
              7
            </Avatar>
            <Avatar
              sx={{
                bgcolor: 'grey.100',
              }}
            />
            <Avatar
              sx={{
                bgcolor: 'grey.100',
              }}
            />
          </Stack>

          <Button variant="contained" color="primary" fullWidth>
            Confirm
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1">
              Didn&apos;t receive the code? <Link href="/resend">Resend</Link>
            </Typography>
          </Box>
        </Stack>
      </AuthContainer>
    </AuthLayout>
  );
};

export default VerificationPage;