import React, {
	// useEffect,
	// useState, 
	// useCallback, 
	// useRef
	useContext,
} from 'react';

import './styles/base.sass'
import { MobileApp } from './Components/MobileApp'
import { DesktopApp } from './Components/DesktopApp'
import { ViewportContext } from './context/viewportContext';
// import analytics from './utils/analytics';
import firebase from './utils/firebase';

firebase.analytics();

function App() {
	const { isMobile } = useContext(ViewportContext)
	return (
			<div className="App">
				{
					isMobile ? <MobileApp /> : <DesktopApp />
				}
			</div>		
	);
}

export default App;
