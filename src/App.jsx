import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import DynamicPage from "./components/DynamicPage";
import Layout from "./components/admin/AdminLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":slug" element={<DynamicPage />} />
      </Route>
    </Routes>
  );
};

export default App;
