import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';

export const FormContainer = styled(Stack)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eeeff1;
  border-radius: 20px;
  width: 460px;
  margin: 0 auto;

  & div {
    margin-bottom: 12px;
  }
`;
