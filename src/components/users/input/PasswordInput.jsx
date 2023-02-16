import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import { Input } from './Input';

export const PasswordInput = ({ register, errors }) => {
  return (
    <Input
      label="Password"
      type="password"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        ),
      }}
      {...register('password')}
      error={errors.password ?? false}
      helperText={errors?.password?.message}
    />
  );
};
