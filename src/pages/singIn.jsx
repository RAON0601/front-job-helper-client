import { EmailInput } from '../components/users/input/EmailInput';
import { PasswordInput } from '../components/users/input/PasswordInput';
import { FormContainer } from '../components/users/form/FormContainer';
import { Form } from '../components/users/form/Form';
import { FormLogo } from '../components/users/form/Logo';
import { SubmitButton } from '../components/users/form/SubmitButton';
import { FormName } from '../components/users/form/FormName';
import { useSignInForm } from '../hooks/signInForm';

export const SignInPage = () => {
  const { register, handleSubmit, errors, onSubmit } = useSignInForm();

  return (
    <FormContainer>
      <FormLogo />

      <FormName>로그인</FormName>

      <Form component="form" onSubmit={handleSubmit(onSubmit)}>
        <EmailInput {...{ register, errors }} />

        <PasswordInput {...{ register, errors }} />

        <SubmitButton variant="contained" type="submit">
          로그인
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};
