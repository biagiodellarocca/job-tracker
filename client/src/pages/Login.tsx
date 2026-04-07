import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import Header from "../components/ui/Header";
import Wrapper from "../components/layout/Wrapper.js";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await api.post<{ token: string }>("/auth/login", {
				email,
				password,
			});
			localStorage.setItem("token", response.data.token);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong");
		}
	};

	return (
		<Wrapper variant="small">
			{/* Header */}
			<Header title="Login" />
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label htmlFor="email" className="form-label">
						Email<sup>*</sup>
					</label>
					<input
						type="email"
						id="email"
						className="form-input"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
						placeholder="email@address.com"
					/>
				</div>

				<div className="mb-8">
					<label htmlFor="password" className="form-label">
						Password<sup>*</sup>
					</label>
					<input
						type="password"
						id="password"
						className="form-input"
						value={password}
						onChange={(e) => setPassword(e.currentTarget.value)}
						placeholder="******"
					/>
				</div>

				{error && <p>{error}</p>}
				<button type="submit" className="form-submit">
					Sign in
				</button>
			</form>

			<p className="mt-10 text-sm uppercase">
				<span>Don't have an account yet? </span>
				<a
					className="underline cursor-pointer font-bold"
					onClick={() => navigate("/register")}
				>
					Sign up
				</a>
			</p>
		</Wrapper>
	);
};

export default Login;
