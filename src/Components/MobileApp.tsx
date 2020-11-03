import React, {
	FunctionComponent,
	useContext
} from 'react';

// import { Email } from './Email';
// import { MobileAnimation } from './MobileAnimation';
import { MobileAnimation } from './MobileAnimation2';
import { ViewportContext } from '../context/viewportContext';

export const MobileApp: FunctionComponent = () => {
	const { isPortrait } = useContext(ViewportContext);

	return (
		<>
			{ !isPortrait && 
				<div className="LandscapeError">
					<img src="../assets/round_arrow.svg" alt="Round Arrow" />
					<h3>Rotate to portrait mode.</h3>
				</div>
			}
			<MobileAnimation />
		</>
	)
}