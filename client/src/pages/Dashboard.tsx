import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import Button from "../components/ui/Button.js";
import Label from "../components/ui/Label.js";
import Loading from "../components/ui/Loading.js";
import { formatDate } from "../utils/formatDate.js";
import { type TypeApplication } from "../types/types.js";
import {
	IconRemove,
	IconEdit,
	IconOpen,
	IconPlus,
} from "../components/ui/Icon.js";
import Header from "../components/ui/Header.js";
import Chart from "../components/ui/Chart.js";

const Dashboard = () => {
	const [applications, setApplications] = useState<TypeApplication[]>([]);
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

	const deleteApplication = async (id: number) => {
		try {
			await api.delete(`/applications/${id}`);
			setApplications((prev) => prev.filter((item) => item.id !== id));
		} catch (err: any) {
			setError(err.response?.data || "Something went wrong");
		}
	};

	const editApplication = (id: number) => {
		navigate(`/applications/${id}/edit`);
	};

	const openApplication = (id: number) => {
		navigate(`/applications/${id}`);
	};

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
		<div className="wrapper">
			{/* Header */}
			<Header title="Your Applications" logoutButton={true} />

			<div className="grid grid-cols-[2fr_3fr_2fr] gap-5 mb-10">
				<div className="border rounded-3xl p-6">
					<h2 className="font-medium text-lg uppercase mb-8">Total</h2>
					<p className="flex flex-col">
						<span className="text-8xl mb-1">{applications.length}</span>
						<span className="text-xl">{`${applications.length > 1 ? "Applications" : "Application"}`}</span>
					</p>
				</div>
				<div className="border rounded-3xl p-6">
					<h2 className="font-medium text-lg uppercase mb-5">
						Applications by Status
					</h2>
					<Chart data={chartData} />
				</div>
				<div className="border rounded-3xl p-6">
					<h2 className="font-medium text-lg uppercase mb-8">Job Hunt</h2>
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
					<div className="mb-5">
						<Button
							variant="normal"
							onClick={() => navigate("/applications/add")}
						>
							<IconPlus />
							<span className="uppercase">Add Application</span>
						</Button>
					</div>
					<ul className="flex flex-col">
						{applications.map(
							({
								id,
								companyName,
								jobTitle,
								status,
								location,
								type,
							}) => (
								<li
									key={id}
									className="grid grid-cols-[200px_auto_200px] py-4 border-t last:border-b"
								>
									<div>
										<Label variant={status}>{status}</Label>
									</div>
									<div>
										<p className="text-xs mb-1 uppercase">{`${companyName}${location ? " | " + location : ""}${type ? " | " + type : ""}`}</p>
										<p className="text-xl">{jobTitle}</p>
									</div>
									<div className="flex items-center justify-end gap-1.5">
										<Button
											variant="icon"
											onClick={() => openApplication(id)}
										>
											<IconOpen />
										</Button>
										<Button
											variant="icon"
											onClick={() => editApplication(id)}
										>
											<IconEdit />
										</Button>
										<Button
											variant="icon"
											onClick={() => deleteApplication(id)}
										>
											<IconRemove />
										</Button>
									</div>
								</li>
							),
						)}
					</ul>
					{error && <p className="text-red-500 mt-4">{error}</p>}
				</div>
			)}

			{/* Empty state */}
			{!loading && applications.length === 0 && (
				<p className="mt-16">No applications yet. Add your first one!</p>
			)}
		</div>
	);
};

export default Dashboard;
