import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import Button from "../components/ui/Button.js";
import Loading from "../components/ui/Loading.js";
import { formatDate } from "../utils/formatDate.js";
import { type TypeApplication } from "../types/types.js";
import { IconPlus } from "../components/ui/Icon.js";
import Header from "../components/ui/Header.js";
import Chart from "../components/ui/Chart.js";
import Filter from "../components/ui/Filter.js";
import Wrapper from "../components/layout/Wrapper.js";
import DashboardRow from "../components/ui/DashboardRow.js";

const Dashboard = () => {
	const [applications, setApplications] = useState<TypeApplication[]>([]);

	const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

	const filteredApplications = applications.filter((app) =>
		selectedStatus === null ? app : app.status === selectedStatus,
	);

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchApplications = async () => {
			try {
				const { data } = await api.get("/applications");
				setApplications(data);
			} catch (err: any) {
				setError(err.response?.data || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, []);

	const chartData = [
		{
			name: "applied",
			value: applications.filter((app) => app.status === "applied").length,
		},
		{
			name: "interview",
			value: applications.filter((app) => app.status === "interview").length,
		},
		{
			name: "offer",
			value: applications.filter((app) => app.status === "offer").length,
		},
		{
			name: "rejected",
			value: applications.filter((app) => app.status === "rejected").length,
		},
	];

	const earliestApplication =
		applications.length > 0
			? applications.reduce(
					(min: any, app: any) => (app.date < min ? app.date : min),
					applications[0].date,
				)
			: null;

	const days =
		earliestApplication !== null
			? Math.floor(
					(Date.now() - new Date(earliestApplication).getTime()) /
						(1000 * 60 * 60 * 24),
				)
			: 0;

	return (
		<Wrapper variant="big">
			{/* Header */}
			<Header title="Your Applications" logoutButton={true} />

			<div className="grid grid-cols-1 gap-5 mb-15 md:grid-cols-[2fr_3fr_2fr]">
				<div className="border border-primary-200 rounded-2xl p-4 md:p-6">
					<h2 className="font-base text-sm tracking-wider uppercase mb-4 md:mb-8 md:text-base">
						Total
					</h2>
					<p className="flex flex-col">
						<span className="text-6xl mb-1 md:text-8xl">{applications.length}</span>
						<span className="text-xl md:text-2xl">{`${applications.length > 1 ? "Applications" : "Application"}`}</span>
					</p>
				</div>
				<div className="border border-primary-200 rounded-2xl p-4 md:p-6">
					<h2 className="font-base text-sm tracking-wider uppercase mb-6 md:text-base">
						Applications by Status
					</h2>
					<Chart data={chartData} />
				</div>
				<div className="border border-primary-200 rounded-2xl p-4 md:p-6">
					<h2 className="font-base text-sm tracking-wider uppercase mb-4 md:mb-8 md:text-base">
						Job Hunt
					</h2>
					<p>
						You've been job hunting for <strong>{days}</strong> days.
					</p>
					<br />
					<p>
						Your first application was sent on{" "}
						<strong>{formatDate(earliestApplication)}</strong>.
					</p>
				</div>
			</div>

			{/* Loading */}
			{loading ? (
				<Loading />
			) : (
				<div>
					<Filter setSelectedStatus={setSelectedStatus} />
					{filteredApplications.length > 0 ? (
						<ul className="flex flex-col">
							{filteredApplications.map((app) => (
								<DashboardRow
									key={app.id}
									app={app}
									setApplications={setApplications}
									setError={setError}
								/>
							))}
							{error && <p className="text-error-500 mt-4">{error}</p>}
						</ul>
					) : (
						<div className="font-bold">No Applications found</div>
					)}
					<div className="mt-8">
						<Button
							variant="normal"
							onClick={() => navigate("/applications/add")}
						>
							<IconPlus />
							<span className="uppercase">Add Application</span>
						</Button>
					</div>
				</div>
			)}

			{/* Empty state */}
			{!loading && applications.length === 0 && (
				<p className="mt-16">No applications yet. Add your first one!</p>
			)}
		</Wrapper>
	);
};

export default Dashboard;
