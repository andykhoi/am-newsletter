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
	var ua = navigator.userAgent || navigator.vendor
	var isInstagram = (ua.indexOf('Instagram') > -1) ? true : false;
	
	// const App = isInstagram ? MobileApp : isMobile ? 
	let App;
	if (isInstagram) {
		App = MobileApp;
	} else {
		if (isMobile) {
			App = MobileApp;
		} else {
			App = DesktopApp;
		}
	}
	return (
			<div className="App">
				{/* {
					isMobile ? <MobileApp /> : <DesktopApp />
				} */}
				<App />
			</div>		
	);
}

export default App;
