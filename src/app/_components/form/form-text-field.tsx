"use client";

import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

import TextField, { TextFieldProps } from "@/app/_components/common/text-field";

type FormTextFieldProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T>;

const FormTextField = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default FormTextField;