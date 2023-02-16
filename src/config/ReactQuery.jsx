import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

export const QueryConfigComponent = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
