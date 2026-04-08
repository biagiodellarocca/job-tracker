const variants = {
	icon: "w-8 h-8 p-1.5 outline-offset-0 hover:outline-offset-2 text-sm",
	normal: "outline-offset-2 hover:outline-offset-6 px-1 text-sm",
	big: "outline-offset-2 hover:outline-offset-6 text-sm border border-primary-200 py-1 px-5 md:text-lg",
};

type TypeButton = {
	title?: string;
	children: React.ReactNode;
	onClick: () => void;
	variant: keyof typeof variants;
};

const Button = ({ children, onClick, variant, title }: TypeButton) => {
	return (
		<button
			className={`flex items-center justify-center gap-2 font-bold tracking-wider uppercase cursor-pointer rounded-full outline-2 outline-transparent outline-dotted hover:outline-primary-500 transition-all ${variants[variant]}`}
			onClick={onClick}
			title={title}
		>
			{children}
		</button>
	);
};

export default Button;
