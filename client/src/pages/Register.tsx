import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await axios.post('http://localhost:9000/api/v1/auth/register', {
				name, email, password
			})
			navigate('/login')
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<span>Name</span>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
			</label>
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
			<button type="submit">Submit</button>
		</form>
	);
};

export default Register;
