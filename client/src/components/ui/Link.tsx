import { IconForward, IconForwardSmall } from "./Icon";

const variants = {
	small: "tracking-wider font-bold gap-1.5",
	big: "gap-3",
};

type LinkProps = {
	title: string;
	url: string;
	variant: keyof typeof variants;
};

const Link = ({ title, url, variant }: LinkProps) => {
	return (
		<a
			className={`flex items-center ${variants[variant]}`}
			href={url}
			title={title}
			target="_blank"
		>
			{variant === "big" && <IconForward />}
			<span>{title}</span>
			{variant === "small" && <IconForwardSmall />}
		</a>
	);
};

export default Link;
