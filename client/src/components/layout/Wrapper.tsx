const variants = {
	small: "max-w-xl px-10 pt-10 pb-12",
	big: "max-w-6xl p-14",
};

interface WrapperProps extends React.PropsWithChildren {
	variant: keyof typeof variants;
}

const Wrapper = ({ variant, children }: WrapperProps) => {
	return (
		<div
			className={`mx-auto border border-primary-500 rounded-4xl animate-fade-in  ${variants[variant]}`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
