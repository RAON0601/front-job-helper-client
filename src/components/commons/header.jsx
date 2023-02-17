import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { signOutAPI } from '../../api/users';
import { useRecoilState } from 'recoil';
import { loginUserAtom } from '../../atoms/loginUser';

const Title = styled(Typography)`
  flex-grow: 1;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LoginUser = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`;

const AppHeader = styled(AppBar)`
  margin-bottom: 16px;
`;

export const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useRecoilState(loginUserAtom);

  const signOut = async () => {
    await signOutAPI();
    setLoginUser(null);
  };

  return (
    <AppHeader position="relative">
      <Toolbar>
        <Title variant="h1" onClick={() => navigate('/')}>
          Front Job Helper
        </Title>

        {loginUser ? (
          <>
            <LoginUser>환영합니다 {loginUser.nickname}님</LoginUser>
            <Button color="inherit" onClick={signOut}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/signIn')}>
              로그인
            </Button>

            <Button color="inherit" onClick={() => navigate('/signUp')}>
              회원가입
            </Button>
          </>
        )}
      </Toolbar>
    </AppHeader>
  );
};
