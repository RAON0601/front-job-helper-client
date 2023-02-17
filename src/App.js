import 'normalize.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/commons/layout';
import { QueryConfigComponent } from './config/ReactQuery';
import { NotFoundPage } from './pages/NotFound';
import { ReviewDetailPage } from './pages/reviews/detail';
import { ReviewListPage } from './pages/reviews/list';
import { SignUpPage } from './pages/signUp';
import { SignInPage } from './pages/singIn';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ReviewCratePage } from './pages/reviews/create';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <QueryConfigComponent>
      <div className="App">
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <ReviewListPage />
                </Layout>
              }
            />
            <Route
              path="/signUp"
              element={
                <Layout>
                  <SignUpPage />
                </Layout>
              }
            />
            <Route
              path="/signIn"
              element={
                <Layout>
                  <SignInPage />
                </Layout>
              }
            />
            <Route
              path="/reviews/:reviewId"
              element={
                <Layout>
                  <ReviewDetailPage />
                </Layout>
              }
            />
            <Route
              path="/reviews/create"
              element={
                <Layout>
                  <ReviewCratePage />
                </Layout>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryConfigComponent>
  );
}

export default App;
