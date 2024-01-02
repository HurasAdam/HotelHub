import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <p>Sign In</p>
            </Layout>
          }
        />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
