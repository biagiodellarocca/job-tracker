interface RowProps extends React.PropsWithChildren {
	label: string;
}

const DetailRow = ({ label, children }: RowProps) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
			<h2 className="font-bold text-xs uppercase mb-2 underline underline-offset-4 decoration-1 md:mt-1.5 md:mb-0">
				{label}
			</h2>
			<p className="text-lg md:text-xl">{children}</p>
		</div>
	);
};

export default DetailRow;
