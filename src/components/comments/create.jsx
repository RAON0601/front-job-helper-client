import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { createCommentAPI } from '../../api/comment';
import { useCommentForm } from '../../hooks/comment';

const FormBox = styled(Box)`
  position: relative;
  margin-bottom: 20px;
`;

export const CommentCreateForm = () => {
  const { register, handleSubmit, errors, setValue } = useCommentForm();
  const { reviewId } = useParams();

  const onSubmit = async data => {
    await createCommentAPI({ reviewId, contents: data.contents });
    setValue('contents', '');
  };

  return (
    <FormBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        multiline
        rows={4}
        {...register('contents')}
        error={errors?.contents ?? false}
        helperText={errors?.contents?.message}
      />

      <Stack flexDirection="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ marginRight: '4px' }} type="submit">
          등록하기
        </Button>
      </Stack>
    </FormBox>
  );
};
