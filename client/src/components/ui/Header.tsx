import Button from "./Button.js";
import { useNavigate } from "react-router-dom";
import { IconBack, IconEdit, IconExit } from "./Icon.js";

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
		<div className="flex justify-between items-center mb-12">
			<h1 className="text-4xl font-medium">{title}</h1>
			<div className="flex gap-8">
				{editButton && (
					<Button variant="normal" onClick={() => navigate(`/applications/${editButton}/edit`)}>
						<IconEdit />
						<span>Edit Application</span>
					</Button>
				)}
				{dashboardButton && (
					<Button variant="normal" onClick={() => navigate("/dashboard")}>
						<IconBack />
						<span>Dashboard</span>
					</Button>
				)}
				{logoutButton && (
					<Button variant="normal" onClick={logout}>
						<IconExit />
						<span>Logout</span>
					</Button>
				)}
			</div>
		</div>
	);
};

export default Header;
