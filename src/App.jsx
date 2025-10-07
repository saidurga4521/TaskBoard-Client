import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import CreateProject from "./components/CreateProject";
import Task from "./pages/Task";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./hoc/WithAuth";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRoute isPublic={true}>
                <SignUp />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute isPublic={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isPublic={false}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute isPublic={false}>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoute isPublic={false}>
                <Task />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
