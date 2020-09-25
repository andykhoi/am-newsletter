import React, { FunctionComponent, useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three/';
import { useFrame, useThree, } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three'

interface DesktopOrbProps {
	containerHeight: number | null,
	containerWidth: number | null,
	chapterIndex: number | null,
}

export const DesktopOrb: FunctionComponent<DesktopOrbProps> = ({ containerHeight, containerWidth, chapterIndex }) => {
	const orbRef = useRef<THREE.Points | null>(null)

	const { viewport } = useThree();
	const orbPositions = useRef<[number, number, number][]>([[-viewport.width / 2.4 , -viewport.height / 2.6 , 0], [-viewport.width, -viewport.height ,0], [0,0,0],[0,0,0]]);
	const [orbPosition, setOrbPosition] = useState<[number, number, number]>(chapterIndex ? orbPositions.current[chapterIndex] : orbPositions.current[0])
	const orbAnimationConfigs = useRef({
		quick_exit: {
			mass: 2,
			friction: 1,
			clamp: true
		},
		quick_move: {
			mass: 1,
			friction: 1,
			clamp: true
		}
	})
	const [orbAnimationConfig, setOrbAnimationConfig] = useState<any>(orbAnimationConfigs.current.quick_exit)

	const orbProps = useSpring({
		pointsPosition: orbPosition,
		config: orbAnimationConfig
	})
	// create a couple configs for quick exit, quick move to next entrance, slow entrance
	
	useEffect(() => {
		// setOrbPosition
	}, [viewport])

	useEffect(() => {
		if (chapterIndex !== null) {
			setOrbPosition(orbPositions.current[chapterIndex])
		}
	}, [chapterIndex])

	useFrame(() => {
		if (orbRef.current) {
			/*
				TODO: 
				add in a function here that moves the orb position naturally, within a limit
			*/
			return orbRef.current.rotation.y = orbRef.current.rotation.y + 0.003
		}
	});

	const vertices = useMemo(() => {
		const computedVertices = [];
		
		for (let i = 0; i < 1700; i++) {

			const theta = THREE.MathUtils.randFloatSpread(360); 
			const phi = THREE.MathUtils.randFloatSpread(360);
			
			const x = 225 * Math.sin(theta) * Math.cos(phi);
			const y = 225 * Math.sin(theta) * Math.sin(phi);
			const z = 225 * Math.cos(theta);

			computedVertices.push([x, y, z]);
		}
		return computedVertices.map(v => new THREE.Vector3(...v));
	}, [])

	return (
		<group>
			{/* <a.mesh
				// rotation={[-Math.PI / 2, 0, 0]}
				// ref={hemisphereRef}
				// position={sphereAnimationProps.circlePosition}
			>
				<sphereBufferGeometry
					attach='geometry'
					args={[130, 32, 32, 0, 2*Math.PI, 0, 0.7 * Math.PI]}
				/>
				<meshBasicMaterial attach='material' transparent={true} opacity={0} side={DoubleSide} />
			</a.mesh> */}
			<a.points 
				ref={orbRef}
				// position={[0,0,0]}
				position={orbProps.pointsPosition}
			>	
				<geometry
					attach='geometry'
					vertices={vertices}
				/>
				<pointsMaterial
					attach='material'
					color={new THREE.Color(0xCC37CC)}
					// sizeAttenuation={false}
					// map={sprite}
					size={3}
				/>
			</a.points>
		</group>
	)
}