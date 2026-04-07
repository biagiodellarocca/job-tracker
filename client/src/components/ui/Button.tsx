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
		<button
			className={`flex items-center justify-center gap-2 font-bold text-sm uppercase cursor-pointer rounded-full outline-2 outline-transparent outline-dotted hover:outline-primary-500 transition-all ${variants[variant]}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
