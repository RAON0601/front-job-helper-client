import { FormContainer } from '../../components/reviews/form/FormContainer';
import { FormName } from '../../components/reviews/form/FormName';
import { TitleInput } from '../../components/reviews/form/TitleInput';
import 'react-quill/dist/quill.snow.css';
import { useReviewForm, useReviewQuillEditor } from '../../hooks/review';
import { Button, Stack, Typography } from '@mui/material';
import { Editor, EditorWrapper } from '../../components/reviews/form/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviewAPI, updateReviewAPI } from '../../api/review';
import { UNAUTHORIZED } from '../../api/code';
import { useEffect } from 'react';

let defaultContents = '';

export const ReviewEditPage = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { quillRef, modules, formats } = useReviewQuillEditor();
  const { register, setValue, handleSubmit, trigger, errors } = useReviewForm();

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const res = await fetchReviewAPI(reviewId);
        setDefaultValue(res);
      } catch (error) {
        alert('에러가 발생했습니다!');
        navigate('/');
      }
    }

    function setDefaultValue(res) {
      const contents = res.data.review.contents;
      const title = res.data.review.title;
      defaultContents = contents;
      setValue('contents', contents);
      setValue('title', title);
      trigger('contents');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = data => {
    setValue('contents', data);
    trigger('contents');
  };

  const onSubmit = async data => {
    try {
      await updateReviewAPI(reviewId, data);
      navigate(`/reviews/${reviewId}`);
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
      <FormName variant="h3">리뷰 수정</FormName>
      <TitleInput {...{ register, errors }} />

      <EditorWrapper>
        <Editor ref={quillRef} onChange={onChange} modules={modules} formats={formats} defaultValue={defaultContents} />
      </EditorWrapper>

      <Typography sx={{ paddingLeft: '20px', color: '#d32f2f', fontSize: '0.75rem' }}>
        {errors?.contents?.message}
      </Typography>

      <Stack flexDirection="row" justifyContent="flex-end" sx={{ mb: 2, mt: 2 }}>
        <Button variant="contained" type="submit">
          수정하기
        </Button>
      </Stack>
    </FormContainer>
  );
};
