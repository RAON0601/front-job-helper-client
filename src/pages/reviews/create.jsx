import { FormContainer } from '../../components/reviews/form/FormContainer';
import { FormName } from '../../components/reviews/form/FormName';
import { TitleInput } from '../../components/reviews/form/TitleInput';
import 'react-quill/dist/quill.snow.css';
import { useReviewForm, useReviewQuillEditor } from '../../hooks/review';
import { Button, Stack, Typography } from '@mui/material';
import { Editor, EditorWrapper } from '../../components/reviews/form/Editor';
import { useNavigate } from 'react-router-dom';
import { createReviewAPI } from '../../api/review';
import { UNAUTHORIZED } from '../../api/code';

export const ReviewCratePage = () => {
  const navigate = useNavigate();

  const { quillRef, modules, formats } = useReviewQuillEditor();

  const { register, setValue, handleSubmit, trigger, errors } = useReviewForm();

  const onChange = data => {
    setValue('contents', data);
    trigger('contents');
  };

  const onSubmit = async data => {
    try {
      const result = await createReviewAPI(data);
      navigate(`/reviews/${result.data.review.reviewId}`);
    } catch (err) {
      const status = err.response.status;
      switch (status) {
        case UNAUTHORIZED:
          alert('로그인이 필요 합니다!');
          navigate('/signIn');
          break;
        default:
          alert('에러 발생');
          console.log(err);
      }
    }
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormName variant="h3">리뷰 작성</FormName>
      <TitleInput {...{ register, errors }} />

      <EditorWrapper>
        <Editor ref={quillRef} onChange={onChange} modules={modules} formats={formats} />
      </EditorWrapper>

      <Typography sx={{ paddingLeft: '20px', color: '#d32f2f', fontSize: '0.75rem' }}>
        {errors?.contents?.message}
      </Typography>

      <Stack flexDirection="row" justifyContent="flex-end" sx={{ mb: 2, mt: 2 }}>
        <Button variant="contained" type="submit">
          등록하기
        </Button>
      </Stack>
    </FormContainer>
  );
};
