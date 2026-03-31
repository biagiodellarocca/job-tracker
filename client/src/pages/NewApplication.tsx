import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewApplication = () => {
	const [companyName, setCompanyName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [url, setUrl] = useState("");
	const [status, setStatus] = useState("applied");
	const [notes, setNotes] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		try {
			await axios.post(
				"http://localhost:9000/api/v1/applications",
				{
					companyName,
					jobTitle,
					url,
					status,
					notes,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Company Name</span>
					<input
						type="text"
						value={companyName}
						onChange={(e) => setCompanyName(e.currentTarget.value)}
					/>
				</label>
				<label>
					<span>Job Title</span>
					<input
						type="text"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.currentTarget.value)}
					/>
				</label>
				<label>
					<span>URL</span>
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.currentTarget.value)}
					/>
				</label>
				<label>
					<select
						defaultValue="applied"
						onChange={(e) => setStatus(e.currentTarget.value)}
					>
						<option value="applied">applied</option>
						<option value="interview">interview</option>
						<option value="rejected">rejected</option>
						<option value="offer">offer</option>
					</select>
				</label>
				<label>
					<span>Notes</span>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.currentTarget.value)}
					></textarea>
				</label>
				{error && <p>{error}</p>}
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default NewApplication;
