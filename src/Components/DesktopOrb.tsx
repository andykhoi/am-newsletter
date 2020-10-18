import React, { FunctionComponent, useMemo, useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three/';
import { useFrame, useThree, } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three'
import { useDidUpdate } from '../hooks/useDidUpdate';

interface DesktopOrbProps {
	// containerHeight: number | null,
	// containerWidth: number | null,
	chapterIndex: number | null,
	// orbMovingState: "out_forward" | "out_backward" | "to_forward" | "to_backward" | "resting" | "in"
	// setOrbMovingState: React.Dispatch<React.SetStateAction<"out_forward" | "out_backward" | "to_forward" | "to_backward" | "resting" | "in">>
	canvasViewport: {
		width: number,
		height: number,
		factor: number
	} | null,
	setCanvasViewport: React.Dispatch<React.SetStateAction<{width: number; height: number; factor: number; } | null>>
}

interface OrbPosition {
	resting: [number, number, number]
	out_forward?: [number, number, number]
	out_backward?: [number, number, number]
	to_backward?: [number, number, number]
	to_forward?: [number, number, number]
}


// export const DesktopOrb: FunctionComponent<DesktopOrbProps> = ({ canvasViewport, setCanvasViewport, chapterIndex, orbMovingState, setOrbMovingState }) => {
// 	// const orbPositions = useRef<[number, number, number][] | null>(null);
// 	// const [orbPosition, setOrbPosition] = useState<[number, number, number]>(chapterIndex ? orbPositions.current[chapterIndex] : orbPositions.current[0])
	
// 	// const [orbAnimationConfig, setOrbAnimationConfig] = useState<any>(orbAnimationConfigs.current.quick_exit)

// 	const orbRef = useRef<THREE.Points | null>(null)
// 	const { viewport } = useThree();
// 	const [orbRadius, setOrbRadius] = useState<number>(300);
// 	const generateSpherePositions = useCallback((viewport:  { width: number, height: number, factor: number} | null): [OrbPosition, OrbPosition, OrbPosition, OrbPosition] | null => {
// 		if (viewport !== null) {
// 			const { 
// 				width,
// 				height,
// 			} = viewport;

// 			const topLeftCorner = [-width / 2, height / 2, 0];
// 			const topRightCorner = [width / 2, height / 2, 0];
// 			const bottomLeftCorner = [-width / 2, -height / 2, 0];
// 			const bottomRightCorner = [width / 2, -height / 2, 0];

// 			// calc positions
// 			const positions: [OrbPosition, OrbPosition, OrbPosition, OrbPosition] = [
// 				{
// 					resting: [bottomLeftCorner[0] + 100, bottomLeftCorner[1] + 30, 0],
// 					out_forward: [bottomLeftCorner[0] - orbRadius, bottomLeftCorner[1] + 30, 0],
// 					to_forward: [topLeftCorner[0] + 40, topLeftCorner[1] + orbRadius, 0],
// 				},
// 				{
// 					resting: [topLeftCorner[0] + 30, topLeftCorner[1] - 10, 0],
// 					out_forward: [topLeftCorner[0] + 40, topLeftCorner[1] + orbRadius, 0],
// 					to_forward: [bottomRightCorner[0] + orbRadius, bottomRightCorner[1] + 30, 0],
// 					to_backward: [bottomLeftCorner[0] - orbRadius, bottomLeftCorner[1] + 30, 0],
// 					out_backward: [topLeftCorner[0] + 40, topLeftCorner[1] + orbRadius, 0]

// 				},
// 				{
// 					resting: [bottomRightCorner[0] - 15, bottomRightCorner[1] + 30, 0],
// 					out_forward: [bottomRightCorner[0] + orbRadius, bottomRightCorner[1] + 30, 0],
// 					out_backward: [bottomRightCorner[0] + orbRadius, bottomRightCorner[1] + 30, 0],
// 					to_forward: [topRightCorner[0] + orbRadius, topRightCorner[1] - 10, 0],
// 					to_backward: [topLeftCorner[0] + 40, topLeftCorner[1] + orbRadius, 0],
// 				},
// 				{
// 					resting: [topRightCorner[0] - 20, topRightCorner[1] - 30, 0],
// 					out_backward: [topRightCorner[0] + orbRadius, topRightCorner[1] - 10, 0],
// 					to_backward: [bottomRightCorner[0] + orbRadius, bottomRightCorner[1] + 30, 0],
// 				}
// 			];

// 			return positions;
// 		}
// 		return null
// 	}, [orbRadius])

// 	const getOrbAnimationConfig = useCallback((orbMovingState: string) => {
// 		const configs = {
// 			out: {
// 				mass: 1,
// 				friction: 1,
// 				clamp: true
// 			},
// 			in: {
// 				mass: 20,
// 				friction: 3,
// 				clamp: true,
// 			},
// 			to: {
// 				duration: 1,
// 			}
// 		}

// 		if (orbMovingState.includes('out')) {
// 			return configs.out
// 		} else if (orbMovingState.includes('in')) {
// 			return configs.in
// 		} else if (orbMovingState.includes('to')) {
// 			return configs.to
// 		}
// 		return undefined
// 	}, [])

// 	const orbPositions = useRef<[OrbPosition, OrbPosition, OrbPosition, OrbPosition] | null>(generateSpherePositions(viewport))
	
// 	let [orbPosition, setOrbPosition] = useState<[number, number, number] | undefined>(orbPositions.current ? orbPositions.current[0].resting : undefined) 

// 	let orbProps = useSpring({
// 		position: orbPosition,
// 		config: getOrbAnimationConfig(orbMovingState),
// 		immediate: (key: any) => key === 'position' && orbMovingState.includes('to'),
// 		onRest: () => {
// 			if (orbMovingState === 'out_forward') {
// 				console.log(orbMovingState);
// 				setOrbMovingState(() => 'to_forward')
// 			} else if (orbMovingState === 'out_backward') {
// 				setOrbMovingState(() => 'to_backward')
// 			}
// 		}
// 	})

// 	useEffect(() => {
// 		if (chapterIndex !== null && orbMovingState) {
// 			setOrbPosition(() => {
// 				console.log(chapterIndex, orbMovingState)
// 				if (orbPositions.current) {
// 					// if orbMovingState is 'in'
// 					if (orbMovingState !== 'in') {
// 						return orbPositions.current[chapterIndex][orbMovingState]
// 					} else if (orbMovingState === 'in') {
// 						return orbPositions.current[chapterIndex].resting
// 					}
// 				}
// 			})
// 		}
// 	}, [orbMovingState, chapterIndex])

// 	useEffect(() => {
// 		setCanvasViewport(() => viewport);
// 	}, [viewport, setCanvasViewport])

// 	useEffect(() => {
// 		if (canvasViewport !== null) {
// 			// if (canvasViewport.width >= 901) {
// 			// 	setOrbRadius(() => 220)
// 			// }
// 			const positions = generateSpherePositions(canvasViewport);
// 			if (positions !== undefined) {
// 				orbPositions.current = positions;
// 			}
// 		}
// 	}, [canvasViewport, generateSpherePositions])

// 	useFrame(() => {
// 		if (orbRef.current) {
// 			/*
// 				TODO: 
// 				add in a function here that moves the orb position naturally, within a limit
// 			*/
// 			orbRef.current.rotation.y = orbRef.current.rotation.y + 0.002
// 		}
// 	});

// 	const vertices = useMemo(() => {
// 		const computedVertices = [];
		
// 		for (let i = 0; i < 1800; i++) {

// 			const theta = THREE.MathUtils.randFloatSpread(360); 
// 			const phi = THREE.MathUtils.randFloatSpread(360);
			
// 			const x = orbRadius * Math.sin(theta) * Math.cos(phi);
// 			const y = orbRadius * Math.sin(theta) * Math.sin(phi);
// 			const z = orbRadius * Math.cos(theta);

// 			computedVertices.push([x, y, z]);
// 		}
// 		return computedVertices.map(v => new THREE.Vector3(...v));
// 	}, [orbRadius])

// 	return (
// 		<group>
// 			{/* <a.mesh
// 				// rotation={[-Math.PI / 2, 0, 0]}
// 				// ref={hemisphereRef}
// 				// position={sphereAnimationProps.circlePosition}
// 			>
// 				<sphereBufferGeometry
// 					attach='geometry'
// 					args={[130, 32, 32, 0, 2*Math.PI, 0, 0.7 * Math.PI]}
// 				/>
// 				<meshBasicMaterial attach='material' transparent={true} opacity={0} side={DoubleSide} />
// 			</a.mesh> */}
// 			<a.points 
// 				ref={orbRef}
// 				position={orbProps.position}
// 				// position={orbProps.pointsPosition}
// 			>	
// 				<geometry
// 					attach='geometry'
// 					vertices={vertices}
// 				/>
// 				<pointsMaterial
// 					attach='material'
// 					color={new THREE.Color(0xCC37CC)}
// 					// sizeAttenuation={false}
// 					// map={sprite}
// 					size={3}
// 				/>
// 			</a.points>
// 		</group>
// 	)
// }