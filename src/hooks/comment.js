import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const CommentSchema = yup.object().shape({
  contents: yup.string().required('내용은 필수 입력값입니다.'),
});

export const useCommentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ resolver: yupResolver(CommentSchema) });

  return { register, handleSubmit, errors, setValue };
};
