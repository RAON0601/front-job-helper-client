import { Input } from './Input';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';

export const EmailInput = ({ register, errors }) => {
  return (
    <Input
      label="Email"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      }}
      {...register('email')}
      error={errors.email ?? false}
      helperText={errors?.email?.message}
    />
  );
};
