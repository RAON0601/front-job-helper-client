import { Input } from './Input';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';

export const NicknameInput = ({ register, errors }) => {
  return (
    <Input
      label="Password"
      type="password"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      {...register('password')}
      error={errors.password ?? false}
      helperText={errors?.password?.message}
    />
  );
};
