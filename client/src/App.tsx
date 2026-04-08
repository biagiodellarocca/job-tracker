import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import NewApplication from "./pages/NewApplication.js";
import ApplicationDetail from "./pages/ApplicationDetail.js";
import EditApplication from "./pages/EditApplication.js";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/applications/add"
					element={
						<ProtectedRoute>
							<NewApplication />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/applications/:id"
					element={
						<ProtectedRoute>
							<ApplicationDetail />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/applications/:id/edit"
					element={
						<ProtectedRoute>
							<EditApplication />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
