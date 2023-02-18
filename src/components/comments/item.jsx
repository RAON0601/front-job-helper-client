import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DefaultProfileIcon } from '../commons/DefaultImageIcon';
import { getYYYYMMDD } from '../../utils/date';
import { ControlText } from '../commons/ControlText';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

const EditBox = styled(Box)``;

export const CommentItem = ({ comment, writer, onDelete, onUpdate }) => {
  const [edit, setEdit] = useState(false);
  const [loginUser, _] = useRecoilState(loginUserAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contents: comment.contents,
    },
  });

  const onChangeEdit = () => {
    if (writer.email !== loginUser?.email) {
      alert('작성자만 수정 가능합니다');
      return;
    }
    setEdit(true);
  };

  const onSubmit = data => {
    const newContents = data.contents;
    const newComment = { ...comment, contents: newContents };
    onUpdate(newComment);
    setEdit(false);
  };

  return (
    <Stack flexDirection="row" sx={{ margin: '16px 0', padding: '16px 0', borderBottom: '1px solid #ccc' }}>
      <DefaultProfileIcon />

      {edit ? (
        <EditBox component="form" flexGrow={1} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            multiline
            rows={2}
            {...register('contents')}
            error={errors?.contents ?? false}
            helperText={errors?.contents?.message}
          />
          <Stack flexDirection="row" justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button onClick={() => setEdit(false)}>취소</Button>
            <Button type="submit" variant="contained">
              수정
            </Button>
          </Stack>
        </EditBox>
      ) : (
        <>
          <Stack flexDirection="column" flexGrow={1}>
            <Typography fontWeight={700}>{writer.nickname}</Typography>
            <Typography fontSize={16}>{comment.contents}</Typography>
            <Typography fontSize={12}>{getYYYYMMDD(comment.createdAt)}</Typography>
          </Stack>
          <Stack flexDirection="row">
            <ControlText sx={{ mr: 1 }} onClick={onChangeEdit}>
              수정
            </ControlText>
            <ControlText onClick={() => onDelete(comment, writer)}>삭제</ControlText>
          </Stack>
        </>
      )}
    </Stack>
  );
};
