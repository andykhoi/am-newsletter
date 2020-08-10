import React, { FunctionComponent, useState } from 'react';
import { Transition } from 'react-spring/renderprops';
import { Canvas } from 'react-three-fiber';

import { Sphere } from './Sphere';
import { GradientShow } from './GradientShow';
import { MobileEmailForm } from './MobileEmailForm';
// import { useSpring, a } from 'react-spring/three';

export const MobileAnimation: FunctionComponent = () => {
	// mobile animation will handle state of the animation components
	// const [darkMode, setDarkMode] = useState<Boolean>(false);

	const [gradientActive, setGradientActive] = useState<Boolean>(false);
	const [sphereState, setSphereState] = useState<{ hold: Boolean, direction: null | 'forwards' | 'backwards' }>({ hold: false, direction: null});
	const [emailVisible, setEmailVisible] = useState<Boolean>(true);

	return (
		<div className="MobileAnimation">
			<div className="logo">
				<img src='../assets/logo.svg' alt='Logo' />
			</div>
			<Canvas
				// onClick={() => setGradientActive(true)}
				className="Canvas"
				camera={{position: [0, 0, 500]}}
			>
				<Sphere
					radius={135}
					setEmailVisible={setEmailVisible}
					startPosition={[0, 135, 0]}
					sphereState={sphereState}
					endPosition={[0, -120, 646]}
					setSphereState={setSphereState}
					setGradientActive={setGradientActive}
					breakPoint={468}
				/>
			</Canvas>
			<Transition
				items={gradientActive}
				from={{ backgroundColor: 'transparent', opacity: 0}}
				enter={{ opacity: 1 }}
			>
				{gradientActive => gradientActive && (props => <GradientShow props={props} gradientActive={gradientActive} />)}
			</Transition>
			{/* <div className="hold-icon">
				<img src="../assets/holdicon.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold to learn more about Andy Mag</p>
			</div> */}
			<MobileEmailForm sphereState={sphereState} emailVisible={emailVisible}/>
 		</div>
	)
}