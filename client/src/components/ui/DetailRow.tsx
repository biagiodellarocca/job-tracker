interface RowProps extends React.PropsWithChildren {
	label: string;
}

const DetailRow = ({ label, children }: RowProps) => {
	return (
		<div className="grid grid-cols-[180px_1fr]">
			<h2 className="font-bold uppercase underline underline-offset-4 decoration-1 text-xs mt-1">
				{label}
			</h2>
			<p className="text-xl">{children}</p>
		</div>
	);
};

export default DetailRow;
