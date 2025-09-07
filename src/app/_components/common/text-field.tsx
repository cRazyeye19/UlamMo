'use client';

import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props} />;
};

export default TextField;
export type { TextFieldProps };