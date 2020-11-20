import React, {
	FunctionComponent,
	useState,
	// useMemo,
	useRef,
	useEffect, useContext
} from 'react';
import { useSpring, animated } from 'react-spring';
import { PerspectiveCamera } from 'three';
import { Canvas, useThree } from 'react-three-fiber';

import { Sphere } from './Sphere2';
import { ColorShow } from './ColorShow';
import { MobileEmailForm } from './MobileEmailForm';
import { MobileInstructions } from './MobileInstructions';

import { ViewportContext } from '../context/viewportContext';

const Camera = () => {
	const camera = useRef<PerspectiveCamera | null>(null)
	const { aspect, size, setDefaultCamera } = useThree()
	const pixelToThreeUnitRatio = 1
	const planeDistance = 0
	const cameraDistance = 500
	const distance = cameraDistance - planeDistance
	const height = size.height / pixelToThreeUnitRatio
	const halfFovRadians = Math.atan((height / 2) / distance)
	const fov = 2 * halfFovRadians * (180/Math.PI)
	useEffect(() => {
		console.log(camera.current);
		if (camera.current) setDefaultCamera(camera.current)
	}, [size, setDefaultCamera])

	return <perspectiveCamera
		ref={camera}
		aspect={aspect}
		fov={fov}
		position={[0, 0, cameraDistance]}
		onUpdate={self => self.updateProjectionMatrix()}
	/>
  }

export const MobileAnimation: FunctionComponent = () => {
	const { isPortrait } = useContext(ViewportContext);
	const scrollIndicatorPositions = useRef<number[]>([-1, 10, 22, 31.5]);
	const [darkMode, setDarkMode] = useState<Boolean>(false);
	const [chapterIndex, setChapterIndex ] = useState<number>(0);
	const [colorShowActive, setColorShowActive] = useState<boolean>(false);
	const [sphereState, setSphereState] = useState<{
		hold: boolean,
		direction: null | 'forwards' | 'backwards',
		mountAnimating: boolean
	}>({ hold: false, direction: 'backwards', mountAnimating: true});
	const [emailVisible, setEmailVisible] = useState<Boolean>(false);
	// const [instructionsVisible, setInstructionsVisible] = useState<boolean>(false);
	const [instructionsState, setInstructionsState] = useState<{ position: 'up' | 'down', visible: boolean}>({ position: 'up', visible: false})
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])

	const scrollIndicatorAnimate = useSpring({
		backgroundColor: darkMode ? '#FFFFFF' : '#000000',
		top: scrollIndicatorPosition,
		opacity: colorShowActive ? '1' : '0',
		config: { clamp: true }
	})

	useEffect(() => {
		setScrollIndicatorPosition(() => scrollIndicatorPositions.current[chapterIndex])
	}, [chapterIndex])

	return (
		<div className={`MobileAnimation${!isPortrait ? ' hide' : ''}`}>
			<div className="logo" onClick={() => {
				setColorShowActive(() => false)
			}}>
				{ !darkMode ? <img src='../assets/logo.svg' alt='Logo' /> : <img src='../assets/logo_white.svg' alt='Logo' /> }
				<animated.div className="scroll-indicator" style={scrollIndicatorAnimate} />
			</div>
			<Canvas
				style={{ backgroundColor: darkMode ? '#26282C' : '#F9FAFC' }}
				className="Canvas"
			>
				<Camera />
				<Sphere
					radius={142}
					setInstructionsState={setInstructionsState}
					setEmailVisible={setEmailVisible}
					inPosition={[0, 135, 0]}
					sphereState={sphereState}
					outPosition={[0, 60, 670]}
					setSphereState={setSphereState}
					breakPoint={468}
					setColorShowActive={setColorShowActive}
				/>
			</Canvas>
			<ColorShow chapterIndex={chapterIndex} colorShowActive={colorShowActive} setColorShowActive={setColorShowActive} setChapterIndex={setChapterIndex} setSphereState={setSphereState} darkMode={darkMode} />
			<MobileInstructions darkMode={darkMode} instructionsState={instructionsState} setInstructionsState={setInstructionsState} />
			<MobileEmailForm
				sphereState={sphereState}
				emailVisible={emailVisible}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
 		</div>
	)
}