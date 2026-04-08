type TypeLabel = {
	children: React.ReactNode;
};

const Label = ({ children }: TypeLabel) => {
	return (
		<div
			className={`inline-flex px-2.5 py-1 text-xs rounded-full bg-primary-500 text-secondary-500 uppercase`}
		>
			<span>{children}</span>
		</div>
	);
};

export default Label;
