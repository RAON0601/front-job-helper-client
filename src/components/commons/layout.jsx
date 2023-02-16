import { Header } from "./header";
import Container from "@mui/material/Container";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};
