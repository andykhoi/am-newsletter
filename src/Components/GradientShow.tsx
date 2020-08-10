import React, { FunctionComponent, useRef, useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'
import * as THREE from 'three/';

interface GradientShowProps {
	props: any
	gradientActive: Boolean
}

export const GradientShow: FunctionComponent<GradientShowProps> = ({ props, gradientActive }) => {
	// the position of the light will change and move to specified locations according to length of swipe
	// movement in the x or y axis will move the light and @ specific length will also begin to change the color of the background 
	const planeRef = useRef<THREE.Object3D | undefined>(undefined);
	const [mounted, setMounted] = useState<Boolean>(false);

	// define a moving, hold, and direction state -- hold will stop movement where it's at, moving will move light to same percentage of completion as swipe, 
	// pointerUp will either finish to next state or revert to previous state if threshold is not reached

	// paremeters: light positions and background colors and text	

	const rectLightAnimation = useSpring({
		position: !mounted ? [220, 0, 0] : [-150, 0, 0],
	});

	useEffect(() => {
		!mounted && setMounted(true);
	}, [mounted])

	return (
		<div className="GradientShow" style={props}>
			<div className="grid">
				<div className="text">
					<p>The most damaging phrase in language is 'It's always been done that way.'</p>
					<p className="spacer-top-1">- Admiral Grace Hopper</p>
				</div>
				<Canvas
					className="gradient"
				>
					<ambientLight intensity={0.7} />
					<a.rectAreaLight
						position={rectLightAnimation.position}
						rotation={[0, 0, -Math.PI/12]}
						intensity={3}
						width={180}
						height={600}
						lookAt={() => planeRef.current && planeRef.current.position} />
					<mesh position={[0, 0, -150]} ref={planeRef}>
						<planeBufferGeometry attach='geometry' args={[1000, 1000]}/>
						<meshPhysicalMaterial attach='material' color={new THREE.Color(0x9986FC)} />
					</mesh>
				</Canvas>
			</div>
		</div>
	)
}