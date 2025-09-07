"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import TextField, { TextFieldProps } from "@/app/_components/common/text-field";

type FormPasswordFieldProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T>;

const FormPasswordField = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormPasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
          error={!!error}
          helperText={error?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default FormPasswordField;