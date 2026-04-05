export const IconRemove = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 2048 2048"
	>
		<path
			fill="currentColor"
			d="M1792 384h-128v1472q0 40-15 75t-41 61t-61 41t-75 15H448q-40 0-75-15t-61-41t-41-61t-15-75V384H128V256h512V128q0-27 10-50t27-40t41-28t50-10h384q27 0 50 10t40 27t28 41t10 50v128h512zM768 256h384V128H768zm768 128H384v1472q0 26 19 45t45 19h1024q26 0 45-19t19-45zM768 1664H640V640h128zm256 0H896V640h128zm256 0h-128V640h128z"
		/>
	</svg>
);
export const IconEdit = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 2048 2048"
	>
		<path
			fill="currentColor"
			d="M2048 335q0 66-25 128t-73 110L633 1890L0 2048l158-633L1475 98q48-48 110-73t128-25q69 0 130 26t106 72t72 107t27 130M326 1428q106 35 182 111t112 183L1701 640l-293-293zm-150 444l329-82q-10-46-32-87t-55-73t-73-54t-87-33zM1792 549q25-25 48-47t41-46t28-53t11-67q0-43-16-80t-45-66t-66-45t-81-17q-38 0-66 10t-53 29t-47 41t-47 48z"
		/>
	</svg>
);
export const IconOpen = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 2048 2048"
	>
		<path
			fill="currentColor"
			d="M1344 0q97 0 187 25t168 71t142 110t111 143t71 168t25 187q0 97-25 187t-71 168t-110 142t-143 111t-168 71t-187 25q-125 0-239-42t-211-121l-785 784q-19 19-45 19t-45-19t-19-45t19-45l784-785q-79-96-121-210t-42-240q0-97 25-187t71-168t110-142T989 96t168-71t187-25m0 1280q119 0 224-45t183-124t123-183t46-224q0-119-45-224t-124-183t-183-123t-224-46q-119 0-224 45T937 297T814 480t-46 224q0 119 45 224t124 183t183 123t224 46"
		/>
	</svg>
);
export const IconExit = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 32 32"
	>
		<path
			fill="currentColor"
			d="M7.5 3A4.5 4.5 0 0 0 3 7.5v17A4.5 4.5 0 0 0 7.5 29H19a1 1 0 1 0 0-2H7.5A2.5 2.5 0 0 1 5 24.5v-17A2.5 2.5 0 0 1 7.5 5H19a1 1 0 1 0 0-2zm15.207 5.293a1 1 0 1 0-1.414 1.414L26.586 15H11a1 1 0 1 0 0 2h15.586l-5.293 5.293a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z"
		/>
	</svg>
);
export const IconPlus = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
	>
		<path
			fill="currentColor"
			d="M12 3.25a.75.75 0 0 1 .75.75v7.25H20a.75.75 0 0 1 0 1.5h-7.25V20a.75.75 0 0 1-1.5 0v-7.25H4a.75.75 0 0 1 0-1.5h7.25V4a.75.75 0 0 1 .75-.75"
		/>
	</svg>
);
export const IconBack = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 16 16"
	>
		<path
			fill="currentColor"
			d="M13.5 8.5a.5.5 0 0 0 0-1H3.803l4.031-3.628a.5.5 0 1 0-.668-.744l-5 4.5a.5.5 0 0 0 0 .744l5 4.5a.5.5 0 1 0 .668-.744L3.803 8.5z"
		/>
	</svg>
);
export const IconLoading = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		viewBox="0 0 24 24"
	>
		<g
			fill="none"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
		>
			<path
				stroke-dasharray="16"
				stroke-dashoffset="16"
				d="M12 3c4.97 0 9 4.03 9 9"
			>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="0.3s"
					values="16;0"
				/>
				<animateTransform
					attributeName="transform"
					dur="1.5s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/>
			</path>
			<path
				stroke-dasharray="64"
				stroke-dashoffset="64"
				stroke-opacity=".3"
				d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
			>
				<animate
					fill="freeze"
					attributeName="stroke-dashoffset"
					dur="1.2s"
					values="64;0"
				/>
			</path>
		</g>
	</svg>
);
