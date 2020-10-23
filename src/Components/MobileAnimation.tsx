import React, {
	FunctionComponent,
	useState,
	useMemo,
	useRef,
	useEffect
} from 'react';
import { Canvas, useThree } from 'react-three-fiber';
// import * as THREE from 'three/'

import { Sphere } from './Sphere';
// import { GradientShow } from './GradientShow';
import { GradientShow2 } from './GradientShow2';
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
	const [darkMode, setDarkMode] = useState<Boolean>(false);
	const [gradientActive, setGradientActive] = useState<Boolean>(false);
	const [chapterIndex, setChapterIndex ] = useState<number | null>(0);
	const [sphereState, setSphereState] = useState<{
		hold: boolean,
		direction: null | 'forwards' | 'backwards',
		mountAnimating: boolean
	}>({ hold: false, direction: 'backwards', mountAnimating: true});
	const [emailVisible, setEmailVisible] = useState<Boolean>(false);
	const [instructionsVisible, setInstructionsVisible ] = useState<boolean>(false);
	// const { camera } = useThree();
	// console.log(camera);
	const gradientConfig = useMemo<any>(() => {
		let config;
		if (!darkMode) {
			config = [{
				lightIntensity: 2,
				textColor: '#972C95',
				planeColor: '#FFFFFF',
				lightColor: '#FFFFFF',
			},
			{
				lightIntensity: 1.3,
				textColor: '#FFFFFF',
				planeColor: '#FFFFFF',
				lightColor: '#e75a81',
			},
			{
				lightIntensity: 1.45,
				textColor: '#e75a81',
				planeColor: '#FFFFFF',
				lightColor: '#EAEAEA'
			},
			{
				lightIntensity: 1,
				textColor: '#C9C9C9',
				planeColor: '#FFFFFF',
				lightColor: '#000000',
			}]
		} else {
			config = [{
				lightIntensity: 0,
				textColor: '#972C95',
				planeColor: '#000000',
				lightColor: '#000000',
			},
			{
				lightIntensity: 1.45,
				textColor: '#000000',
				planeColor: '#FFFFFF',
				lightColor: '#EAEAEA',
			},
			{
				lightIntensity: 1.3,
				textColor: '#C9C9C9',
				planeColor: '#FFFFFF',
				lightColor: '#e75a81'
			},
			{
				lightIntensity: 2,
				textColor: '#e75a81',
				planeColor: '#FFFFFF',
				lightColor: '#FFFFFF',
			}]
		}
		return config
	}, [darkMode])

	const instructionsDivProps = useSpring({
		opacity: instructionsVisible ? 1 : 0,
		config: { mass: 1, friction: 10, clamp: true },
	})

	const instructionsTextProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#000000',
		config: { duration: 130 }
	})

	useEffect(() => {
		// setSphereState(() => ({ hold: false, direction: "backwards"}));
	}, [])

	return (
		<div className="MobileAnimation">
			<div className="logo" onClick={() => {
				if (gradientActive) setChapterIndex(() => null);
			}}>
				{ !darkMode ? <img src='../assets/logo.svg' alt='Logo' /> : <img src='../assets/logo_white.svg' alt='Logo' /> }
			</div>
			<Canvas
				style={{ backgroundColor: darkMode ? '#000000' : 'transparent' }}
				className="Canvas"
				// camera={{position: [0, 0, 500]}}
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
					setGradientActive={setGradientActive}
					breakPoint={468}
				/>
			</Canvas>
			<GradientShow2
				darkMode={darkMode}
				chapterIndex={chapterIndex}
				setChapterIndex={setChapterIndex}
				gradientActive={gradientActive}
				swipeThreshold={150}
				chapterConfigs={gradientConfig}
				setGradientActive={setGradientActive}
				setSphereState={setSphereState}
			>
				<div className="text">
					<h2>The most damaging phrase in language is 'It's always been done that way.'</h2>
					<h4 className="spacer-top-1">- Admiral Grace Hopper</h4>
					<p className="begin">Scroll to begin.</p>
				</div>
				<div className="text">
					<h2>Andy Mag is an experiential magazine that enables readers to interact (engage) with diverse themes and ideas.</h2>
				</div>
				<div className="text">
					<h2>Because a great story is worth remembering.</h2>
				</div>
				<div className="text">
					<h2>Subscribe to Andy Mag for updates.</h2>
				</div>
			</GradientShow2>
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