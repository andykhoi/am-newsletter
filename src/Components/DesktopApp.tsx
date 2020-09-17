import React, { FunctionComponent } from 'react';

export const DesktopApp: FunctionComponent = () => {
	return (
		<>
		<div className="div1" onWheel={(e) => console.log(e.target)}>
			HELLO
		</div>
		<div
			className="div2"
			onWheel={(e) => console.log(e.target)}
		>
			WHAT'S UP
		</div>
		</>
	)
}