import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { type TypeApplication } from "../types/types.js";
import { IconRemove, IconEdit, IconEye } from "../components/ui/Icon";

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

	const deleteApplication = async (id: number) => {
		const token = localStorage.getItem("token");

		try {
			await axios.delete(`http://localhost:9000/api/v1/applications/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
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

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-2xl font-bold text-gray-900">
						Job Applications
					</h1>
					<div className="flex gap-3">
						<button
							onClick={() => navigate("/applications/add")}
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
				<ul className="flex flex-col">
					{applications.map(({ id, companyName, jobTitle, status }) => (
						<li
							key={id}
							className="py-2 flex justify-between items-center border-t last:border-b"
						>
							<div className="flex items-center gap-1">
								<div className="w-35">
									<Label variant={status}>{status}</Label>
								</div>
								<div>
									<p className="text-sm font-semibold mt-2">
										{companyName}
									</p>
									<p className="text-lg">{jobTitle}</p>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<Button
									variant="icon"
									onClick={() => openApplication(id)}
								>
									<IconEye />
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
					))}
				</ul>

				{error && <p className="text-red-500 mt-4">{error}</p>}
			</div>
		</div>
	);
};

export default Dashboard;
