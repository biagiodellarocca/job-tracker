import { applicationStatus, type TypeApplication } from "../../types/types";

interface StatusProps {
	setSelectedStatus: React.Dispatch<React.SetStateAction<string | null>>;
}

const Filter = ({ setSelectedStatus }: StatusProps) => {
	const handleStatus = (status: string | null) => {
		setSelectedStatus(status);
	};

	return (
		<div className="uppercase text-xs flex gap-3 mb-3 md:mb-4 md:justify-end">
			<strong>Status</strong>
			<select
				className="uppercase cursor-pointer"
				id="status"
				onChange={(e) =>
					handleStatus(e.target.value === "" ? null : e.target.value)
				}
			>
				<option value="">all</option>
				{applicationStatus.map((status) => (
					<option value={status}>{status}</option>
				))}
			</select>
		</div>
	);
};

export default Filter;
