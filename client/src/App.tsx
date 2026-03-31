import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";
import ApplicationDetail from "./pages/ApplicationDetail";
import EditApplication from "./pages/EditApplication";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
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
