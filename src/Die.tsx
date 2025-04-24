import React from "react";

type DieProps = {
	value: number;
};

// Pip positions in a 3x3 grid indexed 0-8:
// 0 1 2
// 3 4 5
// 6 7 8
const pipMap: Record<number, number[]> = {
	1: [4],
	2: [0, 8],
	3: [0, 4, 8],
	4: [0, 2, 6, 8],
	5: [0, 2, 4, 6, 8],
	6: [0, 2, 3, 5, 6, 8],
};

const Die: React.FC<DieProps> = ({ value }) => (
	<div className="die">
		{Array.from({ length: 9 }).map((_, i) => (
			<span
				key={i}
				className={pipMap[value].includes(i) ? "pip" : "pip hidden"}
			/>
		))}
	</div>
);

export default Die;
