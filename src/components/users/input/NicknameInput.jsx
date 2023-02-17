import { Input } from './Input';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';

export const NicknameInput = ({ register, errors }) => {
  return (
    <Input
      label="nickname"
      type="text"
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      {...register('nickname')}
      error={errors?.nickname ?? false}
      helperText={errors?.nickname?.message}
    />
  );
};
