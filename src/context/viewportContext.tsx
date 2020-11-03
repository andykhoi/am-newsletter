import React, {
	createContext,
	FunctionComponent,
	useState,
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
} from 'react';

type ViewportContextType = {
	isMobile: boolean,

	// orientation: 'portrait' | 'landscape' | null,
	isPortrait: boolean

	defaultDeviceHeight: null,
	defaultDeviceWidth: 'device-width',

	lockedViewportHeight: null | number,
	lockedViewportWidth: null | number,

	currentDeviceHeight: number,
	currentDeviceWidth: number,

	lockViewport: () => [ViewportContextType['currentDeviceHeight'], ViewportContextType['currentDeviceWidth']] | null,
	unlockViewport: () => void,
	// lockViewport: (currentDeviceHeight: ViewportContextType['currentDeviceHeight'], currentDeviceWidth: ViewportContextType['currentDeviceWidth']) => void
	// unlockViewport: (defaultDeviceHeight: ViewportContextType['defaultDeviceHeight'], defaultDeviceWidth: ViewportContextType['defaultDeviceWidth']) => void
	// setOrientation: Dispatch<SetStateAction<ViewportContextType['orientation']>>,
	// setCurrentDeviceHeight: Dispatch<SetStateAction<ViewportContextType['currentDeviceHeight']>>,
	// setCurrentDeviceWidth: Dispatch<SetStateAction<ViewportContextType['currentDeviceWidth']>>,
	// setIsMobile: Dispatch<SetStateAction<ViewportContextType['isMobile']>
}

const defaultViewportContext: ViewportContextType = {
	// window

	isMobile: window.innerWidth <= 900,

	isPortrait: window.matchMedia("(orientation: portrait)").matches,
	
	defaultDeviceHeight: null,
	defaultDeviceWidth: "device-width",

	currentDeviceHeight: window.innerHeight,
	currentDeviceWidth: window.innerWidth,

	lockedViewportHeight: null,
	lockedViewportWidth: null,

	lockViewport: () => null,
	unlockViewport: () => null,

	// setOrientation: () => null,
	// setCurrentDeviceWidth: () => null,
	// setCurrentDeviceHeight: () => null,
	// setIsMobile: () => null,
}

export const ViewportContext = createContext<ViewportContextType>(defaultViewportContext);

export const ViewportContextWrapper: FunctionComponent = (props) => {
	const viewport = useRef(document.querySelector("meta[name=viewport]"));

	let [isMobile, setIsMobile] = useState<ViewportContextType['isMobile']>(defaultViewportContext.isMobile);
	let [isPortrait, setIsPortrait] = useState<ViewportContextType['isMobile']>(defaultViewportContext.isPortrait);
	// let [orientation, setOrientation] = useState<ViewportContextType['orientation']>(defaultViewportContext.orientation);
	let [currentDeviceHeight, setCurrentDeviceHeight] = useState<ViewportContextType['currentDeviceHeight']>(defaultViewportContext.currentDeviceHeight);
	let [currentDeviceWidth, setCurrentDeviceWidth] = useState<ViewportContextType['currentDeviceWidth']>(defaultViewportContext.currentDeviceWidth);
	let [lockedViewportHeight, setLockedViewportHeight] = useState<ViewportContextType['lockedViewportHeight']>(defaultViewportContext.lockedViewportHeight);
	let [lockedViewportWidth, setLockedViewportWidth] = useState<ViewportContextType['lockedViewportWidth']>(defaultViewportContext.lockedViewportWidth)
	
	const unlockViewport:ViewportContextType['unlockViewport'] = () => {
		if (viewport.current) {
			viewport.current.setAttribute('content', `width=${defaultViewportContext.defaultDeviceWidth}, initial-scale=1`)
			setLockedViewportHeight(() => null);
			setLockedViewportWidth(() => null);
		}
	}

	const lockViewport:ViewportContextType['lockViewport'] = () => {
		if (viewport.current) {
			viewport.current.setAttribute('content', `width=${currentDeviceWidth}, height=${currentDeviceHeight}, initital-scale=1`)
			setLockedViewportHeight(() => currentDeviceHeight);
			setLockedViewportWidth(() => currentDeviceWidth)
		}
		return null
	}

	useEffect(() => {
		window.addEventListener('resize', () => {
			setCurrentDeviceHeight(() => window.innerHeight);
			setCurrentDeviceWidth(() => window.innerWidth);
			setIsMobile(() => {
				return window.innerWidth <= 900
			});
		})
		window.addEventListener('orientationchange', (e: any) => {
			setIsPortrait((prev) => {
				const target = e.target;
				if (target) {
					return target.screen.orientation.angle === 0
				}
				return prev
			})
		})

		return () => {
			window.removeEventListener('resize', () => {
				setCurrentDeviceHeight(() => window.innerHeight);
				setCurrentDeviceWidth(() => window.innerWidth);
				setIsMobile(() => {
					return window.innerWidth <= 900
				});
			})
			window.removeEventListener('orientationchange', () => {
				setIsPortrait(() => {
					return window.matchMedia("(orientation: portrait)").matches
				})
			})
		}
	}, [])

	const store = {
		isMobile,
		isPortrait,
		// orientation,
		// setOrientation,

		defaultDeviceHeight: defaultViewportContext.defaultDeviceHeight,
		defaultDeviceWidth: defaultViewportContext.defaultDeviceWidth,
		
		currentDeviceHeight,
		currentDeviceWidth,
		// setCurrentDeviceWidth,
		// setCurrentDeviceHeight,

		lockedViewportHeight,
		lockedViewportWidth,
		
		unlockViewport,
		lockViewport,

		// setIsMobile
	}

	return (
		<ViewportContext.Provider value={store}> 
			{ props.children }
		</ViewportContext.Provider>
	)
}