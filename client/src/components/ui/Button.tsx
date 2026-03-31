const variants = {
	"primary": "bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700",
	"secondary": "bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300",
	"danger": "bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600",
	"icon": "p-1.5 w-8 h-8",
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
