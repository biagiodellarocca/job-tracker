import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.js";
import { IconEnter } from "../components/ui/Icon.js";
import Link from "../components/ui/Link.js";
import Card from "../components/ui/Card.js";
import Wrapper from "../components/layout/Wrapper.js";

const Homepage = () => {
	const navigate = useNavigate();

	return (
		<Wrapper variant="wide">
			<header className="border-b border-primary-200 pt-6 pb-4 flex justify-between items-center uppercase font-medium">
				<div className="uppercase text-lg font-medium tracking-widest md:text-xl">
					Job tracker
				</div>
				<div className="hidden gap-5 md:flex">
					<Button variant="normal" onClick={() => navigate("/login")}>
						<IconEnter />
						<span>Login</span>
					</Button>
					<Button variant="normal" onClick={() => navigate("/register")}>
						<span>Register</span>
					</Button>
				</div>
			</header>
			<div className="max-w-100 py-20 md:max-w-150 md:py-25">
				<span className="uppercase text-sm tracking-wider md:text-lg">
					Your job search, organized
				</span>
				<h1 className="text-4xl font-bold mt-4 mb-10 md:text-7xl">
					Track every application.
					<br />
					Land the job.
				</h1>
				<p className="text-sm md:text-lg">
					A simple tool to keep track of where you applied, what stage
					you're in, and how your search is going — all in one place.
				</p>
				<div className="flex gap-4 mt-8">
					<Button variant="big" onClick={() => navigate("/login")}>
						<IconEnter />
						<span>Login</span>
					</Button>
					<Button variant="big" onClick={() => navigate("/register")}>
						<span>Register</span>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-3 md:mb-25">
				<Card
					index="01"
					title="Track applications"
					text="Log every application with company, role, status, location and type. Never lose track of where you applied."
				/>
				<Card
					index="02"
					title="Visualize progress"
					text="See your pipeline at a glance. Applied, interview, offer, rejected — all in a clean dashboard with charts."
				/>
				<Card
					index="03"
					title="Stay in control"
					text="Edit, delete and filter your applications. Know exactly how long you've been searching and what's working."
				/>
			</div>

			<footer className="border-t border-primary-200 pt-4 pb-6 flex flex-col gap-2 justify-between uppercase text-xs font-medium md:flex-row md:items-center">
				<div className="tracking-wider">
					Developed by{" "}
					<a
						className="font-bold"
						href="https://www.linkedin.com/in/biagiodellarocca/"
						title="Linkedin"
						target="_blank"
					>
						Biagio Della Rocca
					</a>{" "}
					— {new Date().getFullYear()}
				</div>
				<Link
					title="GitHub"
					url="https://github.com/biagiodellarocca/job-tracker.git"
					variant="small"
				/>
			</footer>
		</Wrapper>
	);
};

export default Homepage;
