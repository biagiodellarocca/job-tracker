import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type TypeNewApplication } from "../types/types.js";
import Button from "../components/ui/Button.js";
import Label from "../components/ui/Label.js";

const ApplicationDetail = () => {
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

	return (
		<div className="container">
			<div className="flex justify-between">
				<h1>ApplicationDetail</h1>
				<div className="flex justify-end gap-2">
					<Button variant="primary" onClick={() => navigate(`/applications/${id}/edit`)}>Edit Application</Button>
					<Button variant="primary" onClick={() => navigate("/dashboard")}>Back to the Dashboard</Button>
				</div>
			</div>
			<div className="flex flex-col gap-8 mt-10">
				<div>
					<h2 className="font-bold text-sm mb-1">Company Name</h2>
					<p className="text-lg">{applicationData.companyName}</p>
				</div>
				<div>
					<h2 className="font-bold text-sm mb-1">Job Title</h2>
					<p className="text-lg">{applicationData.jobTitle}</p>
				</div>
				<div>
					<h2 className="font-bold text-sm mb-1">Status</h2>
					<Label variant={applicationData.status}>{applicationData.status}</Label>
				</div>
				<div>
					<h2 className="font-bold text-sm mb-1">Notes</h2>
					<p className="text-lg">{applicationData.notes}</p>
				</div>
			</div>
		</div>
	);
};

export default ApplicationDetail;
