import React, { FunctionComponent, useState } from 'react';
import { Canvas } from 'react-three-fiber';

import { Sphere } from './Sphere';
import { GradientShow } from './GradientShow';
import { MobileEmailForm } from './MobileEmailForm';

export const MobileAnimation: FunctionComponent = () => {
	// const [darkMode, setDarkMode] = useState<Boolean>(false);

	const [gradientActive, setGradientActive] = useState<Boolean>(false);
	const [sphereState, setSphereState] = useState<{ hold: Boolean, direction: null | 'forwards' | 'backwards' }>({ hold: false, direction: null});
	const [emailVisible, setEmailVisible] = useState<Boolean>(true);


	return (
		<div className="MobileAnimation">
			<div className="logo" onClick={() => {
				/* will have to figure out a way so that the sphere moves back after the animation of gradient leaving
				is complete */

				// setGradientActive(() => false)
				// setSphereState(() => ({ hold: false, direction: 'backwards'}))
			}}>
				<img src='../assets/logo.svg' alt='Logo' />
			</div>
			<Canvas
				style={{
					position: 'absolute',
				}}
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
			<GradientShow
				gradientActive={gradientActive}
				swipeThreshold={300}
				chapterConfigs={[
					{
						startLightPosition: [220, 0, 0],
						planeColor: '#9986FC',
						lightColor: '#FFFFFF'
					},
					{
						startLightPosition: [-150, 0, 0],
						planeColor: '#DE38C8',
						lightColor: '#9986FC',
					},
					{
						startLightPosition: [-100, 150, 0],
						planeColor: '#801E73',
						lightColor: '#DE38C8'
					},
					{
						startLightPosition: [-150, 0, 0],
						planeColor: '#801E73',
						lightColor: '#FFFFFF',
					}
				]}
			>
				<div className="text">
					<p>The most damaging phrase in language is 'It's always been done that way.'</p>
					<p className="spacer-top-1">- Admiral Grace Hopper</p>
				</div>
				<div className="text">
					<p>Andy Mag is an experiential magazine that enables readers to interact (engage) with diverse themes and ideas.</p>
				</div>
				<div className="text">
					<p>Because a great story is worth remembering.</p>
				</div>
				<div className="text">
					<p>Subscribe to Andy Mag for updates.</p>
				</div>
			</GradientShow>
			<div className="hold-icon">
				<img src="../assets/holdicon.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold to learn more about Andy Mag</p>
			</div>
			<MobileEmailForm
				sphereState={sphereState}
				emailVisible={emailVisible}
			/>
 		</div>
	)
}