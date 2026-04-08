import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
import { IconDashboard, IconEdit, IconExit } from "./Icon.js";

type TypeHeader = {
	title: string;
	logoutButton?: boolean;
	dashboardButton?: boolean;
	editButton?: number;
};

const Header = ({ title, logoutButton, dashboardButton, editButton }: TypeHeader) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<div className="flex justify-between items-start gap-10 mb-12 md:items-center">
			<h1 className="text-2xl font-bold md:text-4xl">{title}</h1>
			<div className="flex flex-col items-end gap-2 mt-1.5 md:mt-0 md:flex-row md:gap:8">
				{editButton && (
					<Button title="Edit Application" variant="icon" onClick={() => navigate(`/applications/${editButton}/edit`)}>
						<IconEdit />
					</Button>
				)}
				{dashboardButton && (
					<Button title="Back to Dashboard" variant="icon" onClick={() => navigate("/dashboard")}>
						<IconDashboard />
					</Button>
				)}
				{logoutButton && (
					<Button title="Logout" variant="icon" onClick={logout}>
						<IconExit />
					</Button>
				)}
			</div>
		</div>
	);
};

export default Header;
