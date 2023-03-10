import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { signUpAPI } from '../api/users';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../api/code';
import { useNavigate } from 'react-router-dom';

const SignupSchema = yup.object().shape({
  email: yup.string().email('이메일 형식으로 입력 해주세요!').required('이메일은 필수 입력값 입니다!'),
  password: yup.string().required('비밀번호는 필수 입력값입니다!'),
  nickname: yup.string().required('닉네임은 필수 입력값입니다!'),
});

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignupSchema) });

  const navigate = useNavigate();

  // data SignupSchema 형식 검증 완료된 상태로 들어옴
  const onSubmit = async data => {
    try {
      await signUpAPI(data);
      alert('회원가입에 성공했습니다!');
      navigate('/signIn');
    } catch (err) {
      const statusCode = err.response.status;
      const message = err.response.data.message;

      switch (statusCode) {
        case BAD_REQUEST:
          alert(message);
          break;
        case INTERNAL_SERVER_ERROR:
          alert('서버에서 오류가 발생했습니다!');
          break;
        default:
      }
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
