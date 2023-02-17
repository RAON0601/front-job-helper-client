import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { check, signInAPI } from '../api/users';
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from '../api/code';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../atoms/loginUser';

const SignInSchema = yup.object().shape({
  email: yup.string().email('이메일 형식으로 입력 해주세요!').required('이메일은 필수 입력값 입니다!'),
  password: yup.string().required('비밀번호는 필수 입력값입니다!'),
});

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInSchema) });
  const [_, setLoginUser] = useRecoilState(loginUserAtom);
  const navigate = useNavigate();

  // data SignInSchema 형식 검증 완료된 상태로 들어옴
  const onSubmit = async data => {
    try {
      await signInAPI(data);
      const result = await check();
      const loginUser = result.data;
      setLoginUser(loginUser);
      navigate('/');
    } catch (err) {
      const statusCode = err.response.status;
      const message = err.response.data.err.message;

      switch (statusCode) {
        case (BAD_REQUEST, UNAUTHORIZED, FORBIDDEN):
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
