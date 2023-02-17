import { Global, css } from '@emotion/react';

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          background-color: #f8f9fa;
        }
      `}
    />
  );
};
