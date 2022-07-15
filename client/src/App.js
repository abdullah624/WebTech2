import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/home" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
				<Route path="/login" element={<Login/>} />
				
    
    	</Routes>
		</BrowserRouter> 
	);
}
export default App;