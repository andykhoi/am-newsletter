import React, {
	FunctionComponent,
	useState,
	// useMemo,
	useRef,
	useEffect
} from 'react';
import { Canvas, useThree } from 'react-three-fiber';
// import * as THREE from 'three/'

import { Sphere } from './Sphere2';
import { ColorShow } from './ColorShow';
import { MobileEmailForm } from './MobileEmailForm';
import { useSpring, animated } from 'react-spring';
import { PerspectiveCamera } from 'three';

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
		if (camera.current) void setDefaultCamera(camera.current)
	}, [setDefaultCamera])

	return <perspectiveCamera
		ref={camera}
		aspect={aspect}
		fov={fov}
		//   position={[0, viewport.height / 2 - 200, cameraDistance]}
		position={[0, 0, cameraDistance]}
		onUpdate={self => self.updateProjectionMatrix()}
	/>
  }

export const MobileAnimation: FunctionComponent = () => {
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
	const [instructionsVisible, setInstructionsVisible ] = useState<boolean>(false);
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])

	const instructionsDivProps = useSpring({
		opacity: instructionsVisible ? 1 : 0,
		config: { mass: 1, friction: 10, clamp: true },
	})

	const instructionsTextProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#000000',
		config: { duration: 130 }
	})

	const scrollIndicatorAnimate = useSpring({
		backgroundColor: darkMode ? '#FFFFFF' : '#000000',
		top: scrollIndicatorPosition,
		opacity: colorShowActive ? '1' : '0',
		config: { clamp: true }
		// config: { mass: 1, friction: 1, tension: 100, clamp: true }
	})

	useEffect(() => {
		setScrollIndicatorPosition(() => scrollIndicatorPositions.current[chapterIndex])
	}, [chapterIndex])

	return (
		<div className="MobileAnimation">
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
					radius={135}
					setInstructionsVisible={setInstructionsVisible}
					setEmailVisible={setEmailVisible}
					inPosition={[0, 135, 0]}
					sphereState={sphereState}
					outPosition={[0, 60, 646]}
					setSphereState={setSphereState}
					breakPoint={468}
					setColorShowActive={setColorShowActive}
				/>
			</Canvas>
			<ColorShow chapterIndex={chapterIndex} colorShowActive={colorShowActive} setColorShowActive={setColorShowActive} setChapterIndex={setChapterIndex} setSphereState={setSphereState} darkMode={darkMode} />
			<animated.div className="hold-icon" style={instructionsDivProps}>
				{ !darkMode ? <img src="../assets/holdicon.svg" alt="Press and hold to learn more about Andy Mag"/> : <img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/> }
				<animated.p style={instructionsTextProps}>Press and hold to learn more about Andy Mag</animated.p>
			</animated.div>
			<MobileEmailForm
				sphereState={sphereState}
				emailVisible={emailVisible}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
 		</div>
	)
}