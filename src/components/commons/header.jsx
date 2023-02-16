import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Title = styled(Typography)`
  flex-grow: 1;
  font-size: 1.5rem;
  cursor: pointer;
`;

const AppHeader = styled(AppBar)`
  margin-bottom: 16px;
`;

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AppHeader position="relative">
      <Toolbar>
        <Title variant="h1" onClick={() => navigate("/")}>
          Front Job Helper
        </Title>

        <Button color="inherit" onClick={() => navigate("/signIn")}>
          로그인
        </Button>

        <Button color="inherit" onClick={() => navigate("/signUp")}>
          회원가입
        </Button>
      </Toolbar>
    </AppHeader>
  );
};
