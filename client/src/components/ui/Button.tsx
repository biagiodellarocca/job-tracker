const variants = {
	icon: "w-8 h-8 p-1.5 outline-offset-0 hover:outline-offset-2",
	normal: "outline-offset-2 hover:outline-offset-6 px-1",
};

type TypeButton = {
	children: React.ReactNode;
	onClick: () => void;
	variant: keyof typeof variants;
};

const Button = ({ children, onClick, variant }: TypeButton) => {
	return (
		<button className={`button ${variants[variant]}`} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
