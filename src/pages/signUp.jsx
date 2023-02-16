import { useSignUpForm } from '../hooks/signUpForm';
import { EmailInput } from '../components/users/input/EmailInput';
import { NicknameInput } from '../components/users/input/NicknameInput';
import { PasswordInput } from '../components/users/input/PasswordInput';
import { FormContainer } from '../components/users/form/FormContainer';
import { Form } from '../components/users/form/Form';
import { FormLogo } from '../components/users/form/Logo';
import { SubmitButton } from '../components/users/form/SubmitButton';
import { FormName } from '../components/users/form/FormName';

export const SignUpPage = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignUpForm();

  return (
    <FormContainer>
      <FormLogo />

      <FormName>회원가입</FormName>

      <Form component="form" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput {...{ register, errors }} />

        <PasswordInput {...{ register, errors }} />

        <NicknameInput {...{ register, errors }} />

        <SubmitButton variant="contained" type="submit">
          회원 가입
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};
