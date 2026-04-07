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
		<li className="grid grid-cols-[200px_auto_200px] py-4 border-t last:border-b">
			<div>
				<Label variant={app.status}>{app.status}</Label>
			</div>
			<div>
				<p className="text-xs mb-1 uppercase">{`${app.companyName}${app.location ? " | " + app.location : ""}${app.type ? " | " + app.type : ""}`}</p>
				<p className="text-xl">{app.jobTitle}</p>
			</div>
			<div className="flex items-center justify-end gap-1.5">
				<Button variant="icon" onClick={() => openApplication(app.id)}>
					<IconOpen />
				</Button>
				<Button variant="icon" onClick={() => editApplication(app.id)}>
					<IconEdit />
				</Button>
				<Button variant="icon" onClick={() => deleteApplication(app.id)}>
					<IconRemove />
				</Button>
			</div>
		</li>
	);
};

export default DashboardRow;
