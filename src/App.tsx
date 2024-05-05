import "./App.css";
import { Suspense } from "react";
import Spinner from "./components/Spinner";
import Router from "./routes/index.tsx";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router />
    </Suspense>
  );
}

export default App;
