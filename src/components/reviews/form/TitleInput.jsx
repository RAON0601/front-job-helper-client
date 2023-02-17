import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const Label = styled(Typography)`
  font-weight: 700;
  margin-bottom: 12px;
`;

export const TitleInput = ({ register, errors }) => {
  return (
    <Stack flexDirection="column" sx={{ marginBottom: '12px' }}>
      <Label>제목</Label>
      <TextField fullWidth {...register('title')} error={errors.title ?? false} helperText={errors?.title?.message} />
    </Stack>
  );
};
