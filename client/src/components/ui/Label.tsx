const variants = {
	applied: "bg-primary-500",
	interview: "bg-primary-500",
	rejected: "bg-primary-500",
	offer: "bg-primary-500",
};

type TypeLabel = {
	children: React.ReactNode;
	variant: keyof typeof variants;
};

const Label = ({ children, variant }: TypeLabel) => {
	return (
		<div
			className={`inline-flex px-2 py-0.5 text-xs rounded-full bg-primary-500 text-secondary-500 uppercase`}
		>
			<span>{children}</span>
		</div>
	);
};

export default Label;
