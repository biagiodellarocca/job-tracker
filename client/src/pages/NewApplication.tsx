import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import ApplicationForm from "../components/ui/ApplicationForm.js";
import Header from "../components/ui/Header.js";
import { type TypeNewApplication } from "../types/types.js";

const NewApplication = () => {
	const [applicationData, setApplicationData] = useState<TypeNewApplication>(
		{} as TypeNewApplication,
	);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post("/applications", {
				companyName: applicationData.companyName,
				jobTitle: applicationData.jobTitle,
				url: applicationData.url,
				status: applicationData.status,
				notes: applicationData.notes,
			});
			navigate("/dashboard");
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong");
		}
	};

	return (
		<div className="wrapper">
			<Header title="Add Application" dashboardButton={true} />
			<ApplicationForm
				handleSubmit={handleSubmit}
				applicationData={applicationData}
				setApplicationData={setApplicationData}
				error={error}
			/>
		</div>
	);
};

export default NewApplication;
