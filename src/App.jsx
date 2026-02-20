import "./App.css";
import Create from "./components/Create";
import Read from "./components/Read";
import Edit from "./components/Edit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Toaster from "./components/Toaster";
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Create />
              <Read />
            </>
          }
        />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
