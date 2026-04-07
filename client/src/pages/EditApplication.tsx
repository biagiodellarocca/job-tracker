import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios.js";
import ApplicationForm from "../components/ui/ApplicationForm.js";
import Header from "../components/ui/Header.js";
import Loading from "../components/ui/Loading.js";
import { type TypeNewApplication } from "../types/types.js";
import Wrapper from "../components/layout/Wrapper.js";

const EditApplication = () => {
	const { id } = useParams();
	const [applicationData, setApplicationData] = useState<TypeNewApplication>(
		{} as TypeNewApplication,
	);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setError("");
		const fetchApplication = async () => {
			try {
				const { data } = await api.get(`/applications/${id}`);
				setApplicationData(data);
			} catch (err: any) {
				setError(err.response?.data || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};
		fetchApplication();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await api.put(`/applications/${id}`, {
				companyName: applicationData.companyName,
				jobTitle: applicationData.jobTitle,
				location: applicationData.location,
				type: applicationData.type,
				date: applicationData.date,
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
		<Wrapper variant="big">
			<Header title="Edit Application" dashboardButton={true} />
			{loading ? (
				<Loading />
			) : (
				<ApplicationForm
					handleSubmit={handleSubmit}
					applicationData={applicationData}
					setApplicationData={setApplicationData}
					error={error}
				/>
			)}
		</Wrapper>
	);
};

export default EditApplication;
