import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/axios.js";
import Header from "../components/ui/Header.js";
import Label from "../components/ui/Label.js";
import Loading from "../components/ui/Loading.js";
import { formatDate } from "../utils/formatDate.js";
import { type TypeNewApplication } from "../types/types.js";
import DetailRow from "../components/ui/DetailRow.js";
import Wrapper from "../components/layout/Wrapper.js";
import Link from "../components/ui/Link.js";

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
		<Wrapper variant="big">
			<Header
				title="Application Details"
				editButton={Number(id)}
				dashboardButton={true}
			/>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="flex flex-col gap-9 mt-10">
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
								<span className="capitalize">
									{applicationData.type}
								</span>
							</DetailRow>
						)}
						{applicationData.status && (
							<DetailRow label="Status">
								<Label>
									{applicationData.status}
								</Label>
							</DetailRow>
						)}
						{applicationData.date && (
							<DetailRow label="Application Date">
								<span>{formatDate(applicationData.date)}</span>
							</DetailRow>
						)}
						{applicationData.url && (
							<DetailRow label="Job Posting URL">
								<Link
									url={applicationData.url}
									title="Link to the Job"
									variant="big"
								/>
							</DetailRow>
						)}
						{applicationData.notes && (
							<DetailRow label="Notes">
								<span>{applicationData.notes}</span>
							</DetailRow>
						)}
					</div>
					{error && <p className="text-error-500 mt-4">{error}</p>}
				</>
			)}
		</Wrapper>
	);
};

export default ApplicationDetail;
