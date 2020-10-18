import React, { FunctionComponent } from 'react';

export const DesktopInstructions: FunctionComponent = () => {
	return (
		<div className="DesktopInstructions grid">
			<div className="hold-icon">
				<img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold to go back</p>
			</div>
		</div>
	)
}