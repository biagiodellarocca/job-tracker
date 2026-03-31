import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const response = await axios.post<{token: string}>('http://localhost:9000/api/v1/auth/login', {
				email, password
			})
			localStorage.setItem('token', response.data.token)
			navigate('/dashboard')
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong")
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<span>Email</span>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
				/>
			</label>
			{error && <p>{error}</p>}
			<button type="submit">Sign in</button>
		</form>
	);
};

export default Login;
