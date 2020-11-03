import React, { useEffect, useState, useCallback, useRef } from 'react';

import './styles/base.sass'
import { MobileApp } from './Components/MobileApp'
import { DesktopApp } from './Components/DesktopApp'

function App() {
	// let viewport = useRef(document.querySelector("meta[name=viewport]"));
	
	let [isMobile, setIsMobile] = useState<Boolean>(window.innerWidth <= 900);
	// need to wrap this in context
	// let [height, setHeight] = useState<number>(window.innerHeight);
	// let [width, setWidth] = useState<number>(window.innerWidth);
	// const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
	
	const windowResizeHandler = useCallback(() => {
		// const viewport = document.querySelector("meta[name=viewport]");
		// const height = window.innerHeight;
		// const width = window.innerWidth;
		// viewport && viewport.setAttribute("content", "height=" + height + "px, width=" + width + "px, initial-scale=1.0");
		// setHeight(() => window.innerHeight)
		// setWidth(() => window.innerWidth);
		window.innerWidth <= 900 ? setIsMobile(true) : setIsMobile(false);
	}, [])


	useEffect(() => {
		window.addEventListener('resize', windowResizeHandler)
		// window.addEventListener('resize', appHeight)
	}, [windowResizeHandler]);

	// useEffect(() => {
	// 	appHeight()
	// }, [])

	// useEffect(() => {
	// 	if (viewport.current) {
	// 		viewport.current.setAttribute("content", "height=" + height + "px, width=" + width + "px, initial-scale=1.0");
	// 	}
	// }, [height, width])

	return (
		<div className="App">
			{
				isMobile ? <MobileApp /> : <DesktopApp />
			}
		</div>
	);
}

export default App;
