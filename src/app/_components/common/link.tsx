'use client';

import NextLink from 'next/link';

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { LinkProps as NextLinkProps } from 'next/link';

type LinkProps = MuiLinkProps & NextLinkProps;

const Link = (props: LinkProps) => {
  return <MuiLink {...props} component={NextLink} />;
};

export default Link;