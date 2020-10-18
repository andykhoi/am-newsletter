import React, { useEffect, useState, useCallback } from 'react';

import './styles/base.sass'
import { MobileApp } from './Components/MobileApp'
import { DesktopApp } from './Components/DesktopApp'

function App() {
	
	let [isMobile, setIsMobile] = useState<Boolean>(window.innerWidth <= 900);

	const windowResizeHandler = useCallback(() => {
		window.innerWidth <= 900 ? setIsMobile(true) : setIsMobile(false);
	}, [])

	useEffect(() => {
		window.addEventListener('resize', windowResizeHandler)
	}, [windowResizeHandler]);

	return (
		<div className="App">
			{
				isMobile ? <MobileApp /> : <DesktopApp />
			}
		</div>
	);
}

export default App;
