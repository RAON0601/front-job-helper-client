import "normalize.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/commons/layout";
import { NotFoundPage } from "./pages/NotFound";
import { ReviewDetailPage } from "./pages/reviews/detail";
import { ReviewListPage } from "./pages/reviews/list";
import { SignUpPage } from "./pages/signUp";
import { SignInPage } from "./pages/singIn";

function App() {
  return (
    <div className="App">
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
