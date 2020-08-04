import React, { useEffect, useState, useCallback } from 'react';

import { MobileApp } from './Components/MobileApp'

function App() {
	
	let [isMobile, setIsMobile] = useState<Boolean>(window.innerWidth <= 900);

	const windowResizeHandler = useCallback(() => {
		window.innerWidth <= 900 ? setIsMobile(true) : setIsMobile(false);
	}, [])

	useEffect(() => {
		window.addEventListener('resize', windowResizeHandler)
	}, [windowResizeHandler]);

	return (
		<div className="Container">
			{
				isMobile && <MobileApp />
			}
		</div>
	);
}

export default App;
