import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MainWeb from "./components/MainWeb/MainWeb";
import Post from "./pages/Post";
import Subtopic from "./pages/Subtopic";
import Categories from "./pages/Categories";

export default function App(): JSX.Element {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainWeb mode="home" />} />
        <Route path="/continents" element={<MainWeb mode="continents" />} />
        <Route path="/countries" element={<MainWeb mode="countries" />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/:subId" element={<Subtopic />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
