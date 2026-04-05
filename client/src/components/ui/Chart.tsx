import { BarChart, Bar, XAxis, YAxis } from "recharts";

// #region Sample data
type TypeData = {
	name: string;
	value: number;
};

// #endregion
const Chart = ({ data }: { data: TypeData[] }) => {
	return (
		<BarChart
			style={{
				width: "100%",
				aspectRatio: 2,
				fontSize: 12,
            textTransform: "uppercase"
			}}
			responsive
			data={data}
			margin={{
				top: 0,
				right: 0,
				left: 0,
				bottom: -5,
			}}
		>
			<XAxis dataKey="name" interval={0} tickLine={false} />
			<YAxis
				width="auto"
				allowDecimals={false}
				domain={[0, "dataMax"]}
				tickLine={false}
			/>

			<Bar
				dataKey="value"
				fill="#2f2f2f"
				barSize={40}
				radius={[0, 0, 0, 0]}
			/>
		</BarChart>
	);
};

export default Chart;
