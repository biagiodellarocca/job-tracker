const Card = ({
	index,
	title,
	text,
}: {
	index: string;
	title: string;
	text: string;
}) => {
	return (
		<div className="border border-primary-200 rounded-2xl p-5 md:p-8 hover:shadow-primary-100 hover:shadow-lg transition-all duration-300">
			<span className="text-xs md:text-sm">{index}</span>
			<h2 className="text-xl font-bold mt-2 mb-4 md:text-2xl">{title}</h2>
			<p className="text-sm md:text-lg">{text}</p>
		</div>
	);
};

export default Card;
