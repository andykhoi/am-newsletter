import React, { FunctionComponent } from 'react';

interface GradientShowProps {
	props: any
}

export const GradientShow: FunctionComponent<GradientShowProps> = ({ props }) => {
	return (
		<div className="GradientShow" style={props}>
			<div className="grid">
				<div className="text">
					<p>The most damaging phrase in language is 'It's always been done that way.'</p>
					<p className="spacer-top-1">- Admiral Grace Hopper</p>
				</div>
			</div>
		</div>
	)
}