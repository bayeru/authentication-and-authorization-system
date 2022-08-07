import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignupMessage from "./pages/SignupMessage";
import AuthContext from "./store/AuthContext";
import { AuthContextProvider } from "./store/AuthContext";

function App() {
	const context = React.useContext(AuthContext);

	console.log("App", context);

	return (
		<>
			{context.token && (
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signup/message" element={<SignupMessage />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			)}
			{!context.token && (
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signup/message" element={<SignupMessage />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			)}
		</>
	);
}

export default App;
