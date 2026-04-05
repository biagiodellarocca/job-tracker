import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios.js";
import Header from "../components/ui/Header.js";
import Label from "../components/ui/Label.js";
import Loading from "../components/ui/Loading.js";
import { formatDate } from "../utils/formatDate.js";
import { type TypeNewApplication } from "../types/types.js";
import DetailRow from "../components/ui/DetailRow.js";

const ApplicationDetail = () => {
	const { id } = useParams();
	const [applicationData, setApplicationData] = useState<TypeNewApplication>(
		{} as TypeNewApplication,
	);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

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

	return (
		<div className="wrapper">
			<Header
				title="Application Details"
				editButton={Number(id)}
				dashboardButton={true}
			/>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="flex flex-col gap-8 mt-10">
						<DetailRow label="Company Name">
							<span>{applicationData.companyName}</span>
						</DetailRow>
						<DetailRow label="Job Title">
							<span>{applicationData.jobTitle}</span>
						</DetailRow>
						{applicationData.location && (
							<DetailRow label="Location">
								<span>{applicationData.location}</span>
							</DetailRow>
						)}
						{applicationData.type && (
							<DetailRow label="Type">
								<span>{applicationData.type}</span>
							</DetailRow>
						)}
						{applicationData.date && (
							<DetailRow label="Application Date">
								<span>{formatDate(applicationData.date)}</span>
							</DetailRow>
						)}
						{applicationData.status && (
							<DetailRow label="Status">
								<Label variant={applicationData.status}>
									{applicationData.status}
								</Label>
							</DetailRow>
						)}
						{applicationData.notes && (
							<DetailRow label="Notes">
								<span>{applicationData.notes}</span>
							</DetailRow>
						)}
					</div>
					{error && <p className="text-red-500 mt-4">{error}</p>}
				</>
			)}
		</div>
	);
};

export default ApplicationDetail;
