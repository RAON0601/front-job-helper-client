import { Header } from './header';
import Container from '@mui/material/Container';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';
import { useEffect } from 'react';
import { check } from '../../api/users';

export const Layout = ({ children }) => {
  const [loginUser, setLoginUser] = useRecoilState(loginUserAtom);

  useEffect(() => {
    fetchLoginUser();

    async function fetchLoginUser() {
      const res = await check();
      setLoginUser(res.data);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};
