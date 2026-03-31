import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationForm from "../components/ui/ApplicationForm";
import { type TypeNewApplication } from "../types/types.js";
import Button from "../components/ui/Button.js";

const EditApplication = () => {
	const { id } = useParams();
	const [applicationData, setApplicationData] = useState<TypeNewApplication>({} as TypeNewApplication);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setError("");
		const fetchApplication = async () => {
			const token = localStorage.getItem("token");

			try {
				const { data } = await axios.get(
					`http://localhost:9000/api/v1/applications/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				setApplicationData(data);
			} catch (err: any) {
				setError(err.response?.data || "Something went wrong");
			}
		};
		fetchApplication();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		try {
			await axios.put(
				`http://localhost:9000/api/v1/applications/${id}`,
				{
					companyName: applicationData.companyName,
					jobTitle: applicationData.jobTitle,
					url: applicationData.url,
					status: applicationData.status,
					notes: applicationData.notes,
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
		<div className="container">
			<div className="flex justify-end">
				<Button variant="primary" onClick={() => navigate("/dashboard")}>Back to the Dashboard</Button>
			</div>
			<ApplicationForm
				handleSubmit={handleSubmit}
				applicationData={applicationData}
				setApplicationData={setApplicationData}
				error={error}
			/>
		</div>
	);
};

export default EditApplication;
