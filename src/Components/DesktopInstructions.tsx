import React, {
	FunctionComponent,
	// useContext,
	// useState,
} from 'react';
import { useSpring, animated } from 'react-spring';

// import { ViewportContext } from '../context/viewportContext';
// import * as THREE from 'three'

interface DesktopInstructionsProps {
	instructionPosition: [number, number] | null
	instructionActive: boolean
	orbHold: boolean
	// setOrbHold: React.Dispatch<React.SetStateAction<boolean>>
}

export const DesktopInstructions: FunctionComponent<DesktopInstructionsProps> = ({
	instructionPosition,
	instructionActive,
	orbHold
}) => {
	// obtain viewport dimensions and use this to determine sbuscribe center position and to calc instruction position
	// [-220, 0, 0] for screens 900 -> 1279, [-260, 0, 0] for screens 1280+

	// const { currentDeviceWidth, currentDeviceHeight } = useContext(ViewportContext);
	// const [center, setCenter] = useState<[number, number, number]>(currentDeviceWidth < 1280 ? [-220, 0 , 0] : [-260, 0, 0]);
	// const [htmlPosition, htmlPosition] = useState<[number, number] | null>(null);

	// const getHTMLPosition = useCallback(() => {
	// 	// translate normalized 2D threejs coord to html position
	// 	// project center to camera
	// 	// const normalizedCenter = THREE.Vector3.
	// 	const 
	// }, [])
	
	// const getConfig = (key: string) => {
	// 	if (key === 'opacity') {
	// 		return {
	// 			mass: 2,
	// 			friction: 2,
	// 			clamp: true
	// 		}
	// 	} else if (['top', 'left'].includes(key)) {
	// 		return {
	// 			duration: 300
	// 		}
	// 	}
	// }
	
	const instructionProps = useSpring({
		opacity: instructionActive ? orbHold ? 0 : 1 : 0,
		visibility: instructionActive ? 'visible' : 'hidden',
		top: instructionPosition ? instructionPosition[1] : '',
		left: instructionPosition ? instructionPosition[0] : '',
		// config: key => getConfig(key)
		// delay: (key: string) => key === 'opacity' ? 400 : undefined
		// delay: (key) => key === 'opacity' 
		config: {
			mass: 1,
			friction: 1,
			clamp: true,
		},
	})

	

	return (
		<animated.div
			className="DesktopInstructions"
			// style={{
			// 	position: 'absolute',
			// 	top: instructionPosition ? instructionPosition[1] : '',
			// 	left: instructionPosition ? instructionPosition[0] : ''
			// }}
			style={instructionProps}
		>
			<div className="hold-icon">
				<img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold orb to go back</p>
			</div>
		</animated.div>
	)
}