import React, { Component } from "react";

const DisplayRates = ({ rates }) => {
	return (
		<table>
			{rates.map(rate =>
				<tr>
					<th>
						{rate.currency}
					</th>
					<td>
						{rate.value}
					</td>
				</tr>
			)}
		</table>
	);
};

export default DisplayRates;
