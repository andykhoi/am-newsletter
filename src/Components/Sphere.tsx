import React, {
	FunctionComponent,
	useRef,
	useCallback,
	useMemo,
	useEffect,
	useState,
} from 'react';
import * as THREE from 'three/';
import { useFrame, useThree } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three'
import { DoubleSide, PointsMaterial } from 'three/';

interface SphereProps {
	radius: number,
	setInstructionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setEmailVisible: React.Dispatch<React.SetStateAction<Boolean>>,
	sphereAnimationProps?: any,
	setGradientActive: React.Dispatch<React.SetStateAction<Boolean>>,
	setSphereState: React.Dispatch<React.SetStateAction<{
		hold: Boolean;
		direction: null | 'forwards' | 'backwards';
	}>>
	sphereState: {
		hold: Boolean,
		direction: null | 'forwards' | 'backwards',
	},
	startPosition: [number, number, number],
	endPosition: [number, number, number],
	breakPoint: number,
}

export const Sphere: FunctionComponent<SphereProps> = ({
	radius,
	// startPosition,
	sphereState,
	setSphereState,
	setGradientActive,
	breakPoint,
	endPosition,
	setEmailVisible,
	setInstructionsVisible
}) => {
	/* 
		TODO: 
			-add responsive scaling for smaller and larger mobile viewports
			-responsive endpositions depending on viewport height

			-swtich between ortho and perspective for initial animation
	*/ 
	const sphereRef = useRef<any>(null);
	const {
		camera: {
			fov
		},
		viewport
	}: { camera: any, viewport: any } = useThree();
	// const { viewport } = useThree();
	const defaultPointSize = useRef<number>(1.7);
	const startPosition: [number, number, number] = [0, viewport.height / 2 - 80, 0];
	const hemisphereRef = useRef<THREE.Points | null>(null);
	// const currentPosition = useRef<[number, number, number]>(startPosition);
	const currentPosition = useRef<[number, number, number]>(startPosition);
	const sphereAnimationProps = useSpring({
		config: { mass: 1.8, tension: 84, friction: 22, clamp: true },
		pointsPosition: !sphereState.hold ? startPosition : endPosition,
		circlePosition: !sphereState.hold ? startPosition : endPosition,
		onFrame: (arg: any) => {
			// console.log(sphereRef.current.position);
			currentPosition.current = arg.pointsPosition
			if (currentPosition.current[2] > 0 && currentPosition.current[2] < 50) {
				if (sphereState.direction === 'backwards') {
					setEmailVisible(() => true)
					setInstructionsVisible(() => true)
				} else {
					setEmailVisible(() => false);
					setInstructionsVisible(() => false)
				}
			}
		},
		onRest: (arg: any) => { 
			if (currentPosition.current.length === endPosition.length && currentPosition.current.every((position: number, index: number) => position === endPosition[index])) {
				setGradientActive(() => true);
			} else if (currentPosition.current.length === startPosition.length && currentPosition.current.every((position: number, index: number) => position === startPosition[index])) {
				// setInstructionsVisible(() => true);
				// setEmailVisible(() => true)
			}
		}
	})

	useFrame(() => {
		if (sphereRef.current) {
			return sphereRef.current.rotation.y = sphereRef.current.rotation.y + 0.003
		}
	});

	const pointerUpHandler = useCallback(() => {
		if (currentPosition.current[2] >= breakPoint) {
			setSphereState({
				hold: true,
				direction: 'forwards',
			});
		} else {
			setSphereState({
				hold: false,
				direction: 'backwards',
			});
		}
	}, [setSphereState, breakPoint])
	
	const vertices = useMemo(() => {
		const computedVertices = [];
		
		for (let i = 0; i < 1600; i++) {

			const theta = THREE.MathUtils.randFloatSpread(360); 
			const phi = THREE.MathUtils.randFloatSpread(360);
			
			const x = radius * Math.sin(theta) * Math.cos(phi);
			const y = radius * Math.sin(theta) * Math.sin(phi);
			const z = radius * Math.cos(theta);

			computedVertices.push([x, y, z]);
		}
		return computedVertices.map(v => new THREE.Vector3(...v));
	}, [radius])

	useEffect(() => {
		if (sphereRef.current) {
			sphereRef.current.material.size = defaultPointSize.current / Math.tan( ( Math.PI / 180 ) * fov / 2 )
		}
	}, [fov])
	
	return (
		<group>
			<a.mesh
				rotation={[-Math.PI / 2, 0, 0]}
				ref={hemisphereRef}
				onPointerDown={() => setSphereState({
					hold: true,
					direction: 'forwards',
				})}
				onPointerUp={() => pointerUpHandler()}
				position={sphereAnimationProps.circlePosition}
			>
				<sphereBufferGeometry
					attach='geometry'
					args={[130, 32, 32, 0, 2*Math.PI, 0, 0.7 * Math.PI]}
				/>
				<meshBasicMaterial attach='material' transparent={true} opacity={0} side={DoubleSide} />
			</a.mesh>
			<a.points 
				ref={sphereRef}
				// ref={sphereRef}
				position={sphereAnimationProps.pointsPosition}
				// scale={[1,1,1]}
			>	
				<geometry
					attach='geometry'
					vertices={vertices}
				/>
				<pointsMaterial
					attach='material'
					color={new THREE.Color(0xCC37CC)}
					size={1.7}
				/>
			</a.points>
		</group>
	)
}