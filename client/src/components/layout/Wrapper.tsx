const variants = {
	small: "max-w-xl border-primary-200 rounded-3xl pt-10 pb-12 my-5 md:my-15 md:px-10 md:border",
	big: "max-w-7xl border-primary-200 rounded-3xl my-10 md:my-15 md:p-14 md:border",
	wide: "max-w-7xl",
};

interface WrapperProps extends React.PropsWithChildren {
	variant: keyof typeof variants;
}

const Wrapper = ({ variant, children }: WrapperProps) => {
	return (
		<div
			className={`mx-auto animate-fade-in ${variants[variant]}`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
