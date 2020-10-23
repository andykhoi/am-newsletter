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
import { DoubleSide } from 'three/';

interface SphereProps {
	radius: number,
	setInstructionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setEmailVisible: React.Dispatch<React.SetStateAction<Boolean>>,
	sphereAnimationProps?: any,
	setGradientActive: React.Dispatch<React.SetStateAction<Boolean>>,
	setSphereState: React.Dispatch<React.SetStateAction<{
		hold: boolean;
		direction: null | 'forwards' | 'backwards';
		mountAnimating: boolean;
	}>>
	sphereState: {
		hold: boolean,
		direction: null | 'forwards' | 'backwards',
		mountAnimating: boolean
	},
	inPosition: [number, number, number],
	outPosition: [number, number, number],
	breakPoint: number,
}

export const Sphere: FunctionComponent<SphereProps> = ({
	radius,
	// inPosition,
	sphereState,
	setSphereState,
	setGradientActive,
	breakPoint,
	// outPosition,
	setEmailVisible,
	setInstructionsVisible
}) => {
	/* 
		TODO: 
			-add responsive scaling for smaller and larger mobile viewports
			-responsive outPositions depending on viewport height

			-initial animation of ease into view:
				- start position 
				- opacity fade in
				- orbLive ? --> fade and ease in to start position, 
	*/ 
	const sphereRef = useRef<any>(null);
	const {
		camera,
		camera: {
			fov
		},
		// viewport,
		size,
	}: { camera: any, viewport: any, size: any } = useThree();

	const defaultPointSize = useRef<number>(1.7);
	const inPosition: [number, number, number] = [0, 0, 0];
	const outPosition: [number, number, number] = [0, -size.height / 9, 626];
	const hemisphereRef = useRef<THREE.Points | null>(null);


	useFrame(() => {
		if (sphereRef.current) {
			return sphereRef.current.rotation.y = sphereRef.current.rotation.y + 0.003
		}
	});

	const setPosition = useCallback(() => {
		if (sphereState.mountAnimating) {
			return outPosition
		} else {
			if (sphereState.hold) {
				return outPosition
			} else {
				return inPosition
			}
		}
	}, [inPosition, sphereState, outPosition])

	const pointerUpHandler = useCallback(() => {
		if (sphereRef.current.position.z >= breakPoint) {
			setSphereState(prev => {
				const updated: typeof sphereState = {
					hold: true,
					direction: "forwards",
					mountAnimating: prev.mountAnimating
				}
				return updated
			})
		} else {
			setSphereState(prev => {
				const updated: typeof sphereState = {
					hold: false,
					direction: "backwards",
					mountAnimating: prev.mountAnimating
				}
				return updated
			})
		}
	}, [setSphereState, breakPoint, sphereState])
	
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

	const sphereAnimationProps = useSpring({
		config: { mass: 1.8, tension: 84, friction: 22, clamp: true },
		pointsPosition: setPosition(),
		opacity: sphereState.mountAnimating ? 0 : 1,
		onFrame: (arg: any) => {
			if (sphereRef.current.position.z > 0 && sphereRef.current.position.z < 50) {
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
			if (outPosition.every((position: number, index: number) => {
				if (!sphereState.mountAnimating) {
					if (index === 0) {
						return sphereRef.current.position.x === position
					} else if (index === 1) {
						return sphereRef.current.position.y === position
					} else if (index === 2) {
						return sphereRef.current.position.z === position
					}
				}
				return false
			})) {
				setGradientActive(() => true);
			}
		}
	})

	useEffect(() => {
		if (sphereRef.current) {
			sphereRef.current.material.size = defaultPointSize.current / Math.tan( ( Math.PI / 180 ) * fov / 2 )
		}
	}, [fov])

	useEffect(() => {
		if (size.height && camera) {
			camera.lookAt(0, (-size.height / 5), 0);
		}
	}, [size, camera])

	useEffect(() => {
		setSphereState(prev => {
			if (prev.mountAnimating) {
				return {
					...prev,
					mountAnimating: false
				}
			} else {
				return prev
			}
		})
	}, [setSphereState])

	
	return (
		<group>
			<a.mesh
				rotation={[-Math.PI / 2, 0, 0]}
				ref={hemisphereRef}
				onPointerDown={() => setSphereState(prev => {
					const updated: typeof sphereState = {
						hold: true,
						direction: "forwards",
						mountAnimating: prev.mountAnimating
					}
					return updated
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
				<a.pointsMaterial
					attach='material'
					color={new THREE.Color(0xCC37CC)}
					size={1.7}
					opacity={sphereAnimationProps.opacity}
				/>
			</a.points>
		</group>
	)
}