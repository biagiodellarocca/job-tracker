import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TypeApplication {
	id: number;
	jobTitle: string;
	companyName: string;
	status: string;
}

const Dashboard = () => {
	const [applications, setApplications] = useState<TypeApplication[]>([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		const fetchApplications = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:9000/api/v1/applications",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				setApplications(data);
			} catch (err: any) {
				setError(err.response?.data || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchApplications();
	}, []);

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const deleteApplication = () => {};

	const updateApplication = () => {};

	const archiveApplication = () => {};

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl font-bold text-gray-900">
						Job Applications
					</h1>
					<div className="flex gap-3">
						<button
							onClick={() => navigate("/new-application")}
							className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
						>
							+ Add Application
						</button>
						<button
							onClick={logout}
							className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
						>
							Log out
						</button>
					</div>
				</div>

				{/* Loading */}
				{loading && <p className="text-gray-500">Loading...</p>}

				{/* Empty state */}
				{!loading && applications.length === 0 && (
					<p className="text-gray-500 text-center mt-16">
						No applications yet. Add your first one!
					</p>
				)}

				{/* List */}
				<ul className="flex flex-col gap-3">
					{applications.map(({ id, companyName, jobTitle, status }) => (
						<li
							key={id}
							className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center"
						>
							<div>
								<p className="font-semibold text-gray-900">
									{companyName}
								</p>
								<p className="text-sm text-gray-500">{jobTitle}</p>
							</div>
							<div className="flex items-center gap-3">
								<span
									className={`text-xs font-medium px-3 py-1 rounded-full ${
										status === "applied"
											? "bg-blue-100 text-blue-700"
											: status === "interview"
												? "bg-yellow-100 text-yellow-700"
												: status === "offer"
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
									}`}
								>
									{status}
								</span>
								<button
									onClick={deleteApplication}
									className="text-sm text-red-500 hover:text-red-700"
								>
									Remove
								</button>
								<button
									onClick={updateApplication}
									className="text-sm text-blue-500 hover:text-blue-700"
								>
									Edit
								</button>
							</div>
						</li>
					))}
				</ul>

				{error && <p className="text-red-500 mt-4">{error}</p>}
			</div>
		</div>
	);
};

export default Dashboard;
