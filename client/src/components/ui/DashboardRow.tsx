import { useState } from "react";
import api from "../../lib/axios.js";
import type { TypeApplication } from "../../types/types.js";
import Button from "./Button.js";
import { IconOpen, IconEdit, IconRemove } from "./Icon.js";
import Label from "./Label.js";
import { useNavigate } from "react-router-dom";

const DashboardRow = ({
	app,
	setApplications,
	setError,
}: {
	app: TypeApplication;
	setApplications: React.Dispatch<React.SetStateAction<TypeApplication[]>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const [showRemove, setShowRemove] = useState(false);
	const navigate = useNavigate();

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

	return (
		<li className="relative grid grid-cols-1 py-4 border-t border-primary-200 last:border-b md:grid-cols-[200px_auto_200px]">
			<div>
				<Label>{app.status}</Label>
			</div>
			<div>
				<p className="text-xs mb-1 mt-4 uppercase md:mt-0">{`${app.companyName}${app.location ? " | " + app.location : ""}${app.type ? " | " + app.type : ""}`}</p>
				<p className="text-lg md:text-xl">{app.jobTitle}</p>
			</div>
			<div className="flex items-center justify-center mt-2 absolute top-1 right-0 md:justify-end md:gap-1.5 md:mt-0 md:relative">
				<Button title="Application Details" variant="icon" onClick={() => openApplication(app.id)}>
					<IconOpen />
				</Button>
				<Button title="Edit Application" variant="icon" onClick={() => editApplication(app.id)}>
					<IconEdit />
				</Button>
				<Button title="Remove Application" variant="icon" onClick={() => setShowRemove(true)}>
					<IconRemove />
				</Button>
			</div>

			<div
				className={`absolute flex justify-center items-center gap-5 w-full h-full bg-secondary-400 transition-all ${showRemove ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
			>
				<span>Are you sure?</span>

				<Button variant="normal" onClick={() => deleteApplication(app.id)}>
					<span>Yes</span>
				</Button>
				<Button variant="normal" onClick={() => setShowRemove(false)}>
					<span>No</span>
				</Button>
			</div>
		</li>
	);
};

export default DashboardRow;
