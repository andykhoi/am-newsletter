// export default {}
import React, { FunctionComponent, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';
// import { useDidUpdate } from '../hooks/useDidUpdate';
import { Box3 } from 'three';
import { DoubleSide } from 'three/';
// import { Sphere } from './Sphere';

interface OrbProps {
	pointerPosition: [number | null, number | null]
	chapterIndex: number
	orbMovingState: "out" | "to" | "resting" | "intersecting" | "in" | "subscribe" | "subscribe_hold" | "at_threshold"
	setOrbMovingState: React.Dispatch<React.SetStateAction<"out" | "resting" | "to" | "intersecting" | "in" | "subscribe" | "subscribe_hold" | "at_threshold">>
	resetPointer: () => void
	subscribeActive: boolean
	setSubscribeActive: React.Dispatch<React.SetStateAction<boolean>>
	setEmailActive: React.Dispatch<React.SetStateAction<boolean>>
	setOrbHold: React.Dispatch<React.SetStateAction<boolean>>
	orbHold: boolean
	setScrollIndicatorHeight: React.Dispatch<React.SetStateAction<number>>
	setChapterIndex: React.Dispatch<React.SetStateAction<number>>
	setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
	setButtonShadow: React.Dispatch<React.SetStateAction<string>>
	setInstructionPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>
	setInstructionActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const Orb: FunctionComponent<OrbProps> = ({
	pointerPosition,
	chapterIndex,
	orbMovingState,
	resetPointer,
	setOrbMovingState,
	subscribeActive,
	setSubscribeActive,
	setEmailActive,
	setOrbHold,
	orbHold,
	setScrollIndicatorHeight,
	setChapterIndex,
	setBackgroundColor,
	setButtonShadow,
	setInstructionPosition,
	setInstructionActive
}) => {
	const { viewport, camera } = useThree();
	const orbRef = useRef<THREE.Points | null>(null)
	const previousPosition = useRef<[number, number, number] | null>(null)
	const closestSide = useRef<string | null>(null)
	const subscribePosition = useRef<[number, number, number]>([viewport.width < 1280 ? -220 : -260, 0, 0]);

	const orbMask = useRef<any>(null);
	const orbMaskSphereBbox = useRef<THREE.Sphere>(new THREE.Sphere()) // position dependent on orbMask position

	const rectPositions = useRef<any>([
		{
			textRef1: {
				position: [0,59,0],
				geometry: [690, 26, 0]
			},
			textRef2: {
				position: [0,6,0],
				geometry: [415, 26, 0]
			},
			textRef3: {
				position: [0,-60,0],
				geometry: [355, 26, 0],
			},
		},
		{
			textRef1: {
				position: [0,51,0],
				geometry: [647, 26, 0]
			},
			textRef2: {
				position: [0,-1,0],
				geometry: [748, 26, 0]
			},
			textRef3: {
				position: [0,-51,0],
				geometry: [272, 26, 0]
			},
		},
		{
			textRef1: {
				position: null,
				geometry: undefined
			},
			textRef2: {
				position: [0,0,0],
				geometry: [682, 26, 0]
			},
			textRef3: {
				position: null,
				geometry: undefined,
			},
		},
		{
			textRef1: {
				position: null,
				geometry: undefined
			},
			textRef2: {
				position: [0,0,0],
				geometry: [537, 26, 0]
			},
			textRef3: {
				position: null,
				geometry: undefined
			},
		},
	]);

	// this is causing bug: on viewport change position of orb is changing
	// const orbPositions = useMemo<any>(() => {
	// 	let radius = 200;
	// 	if (viewport.width >= 1280) radius = 240
	// 	return [
	// 		{
	// 			pre: [-viewport.width / 2 + 100, -viewport.height / 2 - radius, 0],
	// 			start: [0,0,0]
	// 		},
	// 		{
	// 			pre: [-viewport.width / 2 + 180, viewport.height / 2 + radius, 0],
	// 			start: [-250,0,0]
	// 		},
	// 		{
	// 			pre: [viewport.width / 2 + 180, -viewport.height / 2 - 180, 0],
	// 			start: [50,0,0]
	// 		},
	// 		{
	// 			pre: [viewport.width / 2 - 200, viewport.height / 2 + radius, 0],
	// 			start: [100,0,0]
	// 		},
	// 	]
	// }, [viewport])
	const orbPositions = useMemo<any>(() => {
		let radius = 200;
		if (viewport.width >= 1280) radius = 240
		return [
			{
				pre: [-viewport.width / 2 + 100, -viewport.height / 2 - radius, 0],
				start: [0,0,0]
			},
			{
				pre: [-viewport.width / 2 + 180, viewport.height / 2 + radius, 0],
				start: [-250,0,0]
			},
			{
				pre: [viewport.width / 2 + 180, -viewport.height / 2 - 180, 0],
				start: [50,0,0]
			},
			{
				pre: [viewport.width / 2 - 200, viewport.height / 2 + radius, 0],
				start: [100,0,0]
			},
		]
	}, [])

	const orbPositionConfigs = useRef<any>({
		resting: {
			mass: 1000,
			friction: 1400,
			clamp: false
		},
		intersecting: undefined,
		out: {
			mass: 5,
			friction: 4.5,
			clamp: true,
		},
		to: {
			duration: 1
		},
		in: {
			mass: 1000,
			friction: 1400,
			clamp: false
		},
		subscribe: {
			tension: 120,
			clamp: true
		},
		subscribe_hold: {
			mass: 70,
			// friction: 50,
			tension: 140,
			clamp: true
			// duration: 600
		},
		at_threshold: {
			duration: 600
		}
	})

	// chapter rects

	const textRef1 = useRef<any>(null);
	const textBbox1 = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));

	const textRef2 = useRef<any>(null);
	const textBbox2 = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));

	const textRef3 = useRef<any>(null);
	const textBbox3 = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));

	const subscribeRef = useRef<any>(null);
	let subscribeBbox = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));

	const [orbScale, setOrbScale] = useState<[number, number, number] | null>(null)
	const [orbPosition, setOrbPosition] = useState<[number,number,number] | null>(orbPositions[chapterIndex].pre)
	const [isIntersecting, setIsIntersecting] = useState<boolean>(orbMovingState === 'intersecting' ? true : false);
	const [orbOpacity, setOrbOpacity] = useState<number>(1);
	
	const vertices = useMemo(() => {
		const computedVertices = [];
		
		for (let i = 0; i < 1800; i++) {

			const theta = THREE.MathUtils.randFloatSpread(360); 
			const phi = THREE.MathUtils.randFloatSpread(360);
			
			const x = 200 * Math.sin(theta) * Math.cos(phi);
			const y = 200 * Math.sin(theta) * Math.sin(phi);
			const z = 200 * Math.cos(theta);

			computedVertices.push([x, y, z]);
		}
		return computedVertices.map(v => new THREE.Vector3(...v));
	}, [])

	const getOrbPosition = useCallback(() => {
		if (orbRef.current !== null) {
			const currentPosition = [orbRef.current.position.x, orbRef.current.position.y, orbRef.current.position.z];
			const setPosition = orbPosition;
			let match;
			if (orbMovingState === 'subscribe') {
				match = setPosition ? currentPosition.every((coord, index) => {
					// if the coord is within 5 units away in any direction return true for that direction
					return Math.abs(coord - setPosition[index]) < 8
				}) : false
			} else {
				match = setPosition ? currentPosition.every((coord, index) => coord === setPosition[index]) : false;
			}
			if (match) {
				switch (orbMovingState) {
					case 'to':
						return 'pre'
					case 'subscribe':
						return 'subscribe'
					case 'at_threshold':
						return 'at_threshold'
					default:
						return false
				}
			}
			return false
		}
		return false
	}, [orbMovingState, orbPosition])

	const placeInstructions = useCallback(() => {
		const center = viewport.width < 1280 ? new THREE.Vector3(-220, 0, 0) :  new THREE.Vector3(-260, 0, 0);
		const radius = viewport.width < 1280 ? 200 : 240;

		center.project(camera);
		center.x = center.x * (0.5 * viewport.width) + 0.5 * viewport.width + (0.5 * radius);
		center.y = -center.y * (0.5 * viewport.height) + 0.5 * viewport.height + radius;

		setInstructionPosition(() => [center.x, center.y]);
	}, [viewport, camera, setInstructionPosition])

	const { position, opacity, transparent } = useSpring({
		position: orbPosition,
		opacity: orbOpacity,
		transparent: 0,
		config: isIntersecting ? orbPositionConfigs.current.intersecting : orbPositionConfigs.current[orbMovingState],
		onFrame: ({ opacity }: { opacity: number }) => {
			const match = getOrbPosition();
			if (match === 'pre') {
				setSubscribeActive((prev) => {
					if (prev === true) {
						return false
					}
					return false
				})
				setScrollIndicatorHeight(() => 0)
				setOrbMovingState(() => 'in');
				setOrbPosition(() => orbPositions[chapterIndex].start);
			} else if (match === 'subscribe') {
				setEmailActive(() => true)
				setInstructionActive(() => true)
			} else if (match === 'at_threshold') {
				if (opacity === 0) {
					// do not set subscribe back to active until orb is at pre position
					setChapterIndex(() => 0)
					setOrbMovingState(() => 'to')
					setEmailActive(() => false)
					setInstructionActive(() => false)
					setOrbHold(() => false)
					setOrbPosition(() => orbPositions[0].pre)
					setBackgroundColor(() => '#D695AB')
					setButtonShadow(() => '1px 2px 7px 0px rgba(189, 132, 151, 1), -1px -2px 7px rgba(246, 169, 195, 1)')
				}
			}
		}
	})

	const autoRotateOrb = useCallback((number: number) => {
		if (orbRef.current !== null) {
			orbRef.current.rotation.y += number
		}
	}, [])

	const computeBoundingAreas = useCallback(() => {
		if (orbMask.current !== null) orbMask.current.geometry.computeBoundingSphere();
		if (textRef1.current !== null) textRef1.current.geometry.computeBoundingBox();
		if (textRef2.current !== null) textRef2.current.geometry.computeBoundingBox();
		if (textRef3.current !== null) textRef3.current.geometry.computeBoundingBox();
		if (subscribeRef.current !== null) subscribeRef.current.geometry.computeBoundingBox();
	}, [])

	const updateOrbMaskSphereBboxRadius = useCallback(() => {
		if (orbMaskSphereBbox.current !== null) {
			if (viewport.width > 900 && viewport.width < 1280) {
				orbMaskSphereBbox.current.radius = orbMask.current.geometry.boundingSphere.radius;
			} else if (viewport.width >= 1280) {
				orbMaskSphereBbox.current.radius = orbMask.current.geometry.boundingSphere.radius + 40;
			}
		}
	}, [viewport])

	const updateOrbMaskSphereBboxCenter = useCallback(() => {
		if (orbMaskSphereBbox.current !== null) orbMaskSphereBbox.current.center = new THREE.Vector3(orbMask.current.position.x, orbMask.current.position.y, orbMask.current.position.z)
	}, [])

	// const atHoldThresholdAutomator = useCallback(() => {
	// 	// set orb opacity to 0, return to first chapter slide,
	// 	setBackgroundColor(() => '#D695AB')
	// 	setButtonShadow(() => '1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
	// 	setOrbOpacity(() => 0)
	// 	setChapterIndex(() => 0)
	// 	setSubscribeActive(() => false)
	// 	setOrbMovingState(() => 'out')
	// 	setEmailActive(() => false)
	// }, [setChapterIndex, setBackgroundColor, setButtonShadow, setOrbOpacity, setSubscribeActive, setEmailActive, setOrbMovingState])
	// const atHoldThresholdAutomator = useCallback(() => {
	// 	// set orb opacity to 0, return to first chapter slide,
	// 	setOrbMovingState(() => 'at_threshold');
	// }, [setOrbMovingState])

	const getClosestSide = useCallback((): string | null => {
		if (orbRef.current !== null ) {
			const distanceObj = {
				left: orbRef.current.position.x + (0.5 * viewport.width),
				right: (0.5 * viewport.width) - orbRef.current.position.x,
				top: (0.5 * viewport.height) - orbRef.current.position.y,
				bottom: orbRef.current.position.y + (0.5 * viewport.height)
			}
			
			const min = Math.min(distanceObj.left, distanceObj.right, distanceObj.top, distanceObj.bottom);

			if (min === distanceObj.left) {
				return 'left'
			} else if (min === distanceObj.right) {
				return 'right'
			} else if (min === distanceObj.bottom) {
				return 'bottom'
			} else if (min === distanceObj.top) {
				return 'top'
			}
		}
		return null
	}, [viewport])

	const getTranslatedPointerPosition = useCallback(() => {
		let position: [number, number, number] | null = null;
		if (pointerPosition[0] !== null && pointerPosition[1] !== null) {
			const x = pointerPosition[0] - window.innerWidth / 2;
			const y = -pointerPosition[1] + window.innerHeight / 2;
			position = [x, y, 0];
		}
		return position
	}, [pointerPosition])

	const isSphereIntersectingBox = useCallback((sphere: THREE.Sphere, box: Box3) => {
		var x = Math.max(box.min.x, Math.min(sphere.center.x, box.max.x));
		var y = Math.max(box.min.y, Math.min(sphere.center.y, box.max.y));
		var z = Math.max(box.min.z, Math.min(sphere.center.z, box.max.z));
	  
		var distance = Math.sqrt((x - sphere.center.x) * (x - sphere.center.x) +
								 (y - sphere.center.y) * (y - sphere.center.y) +
								 (z - sphere.center.z) * (z - sphere.center.z));
		
		return distance < sphere.radius;
	}, [])

	const moveOut = useCallback(() => {
		// using the closest side, translate out of view
		let radius: number;
		if (viewport.width > 900 && viewport.width < 1280) {
			radius = 200;
		} else {
			radius = 240;
		}

		setOrbPosition((prev) => {
			if (prev !== null && orbRef.current !== null) {
				let x = orbRef.current.position.x;
				let y = orbRef.current.position.y;
				const z = orbRef.current.position.z;
				if (closestSide.current === 'left') {
					x = (-0.5 * viewport.width) - radius;
				} else if (closestSide.current === 'bottom') {
					y = (-0.5 * viewport.height) - radius;
				} else if (closestSide.current === 'top') {
					y = (0.5 * viewport.height) + radius
				} else if (closestSide.current === 'right') {
					x = (0.5 * viewport.width) + radius;
				}
				return [x,y,z]
			}
			return null
		})
	}, [viewport])

	const isOrbIntersecting = useCallback(() => {
		return !subscribeActive && orbMovingState !== 'out' ? isSphereIntersectingBox(orbMaskSphereBbox.current, textBbox1.current) || isSphereIntersectingBox(orbMaskSphereBbox.current, subscribeBbox.current) || isSphereIntersectingBox(orbMaskSphereBbox.current, textBbox2.current) || isSphereIntersectingBox(orbMaskSphereBbox.current, textBbox3.current) : false
	}, [isSphereIntersectingBox, subscribeActive, orbMovingState])

	useEffect(() => {
		placeInstructions();
	}, [placeInstructions])

	useEffect(() => {
		computeBoundingAreas();
		
		subscribeBbox.current.setFromObject(subscribeRef.current);
		
		updateOrbMaskSphereBboxRadius()
		updateOrbMaskSphereBboxCenter();
	}, [computeBoundingAreas, updateOrbMaskSphereBboxRadius, updateOrbMaskSphereBboxCenter])

	useEffect(() => {
		setOrbMovingState(() => 'to');
		setOrbPosition(() => orbPositions[chapterIndex].pre);
		textBbox1.current.setFromObject(textRef1.current);
		textBbox2.current.setFromObject(textRef2.current);
		textBbox3.current.setFromObject(textRef3.current);
	}, [chapterIndex, setOrbMovingState, orbPositions])

	useEffect(() => {
		if (viewport.width > 900 && viewport.width < 1280) {
			setOrbScale(() => [1,1,1])
			updateOrbMaskSphereBboxRadius();
		} else {
			setOrbScale(() => [1.2, 1.2, 1.2])
			updateOrbMaskSphereBboxRadius();
		}
	}, [viewport, updateOrbMaskSphereBboxRadius])

	useEffect(() => {
		if (orbMovingState === 'out') {
			moveOut();
			resetPointer();
		} else if (orbMovingState === 'at_threshold') {
			setOrbOpacity(() => 0);
		} else if (orbMovingState === 'to') {
			setOrbOpacity((prev) => {
				if (prev === 0) {
					return 1
				}
				return prev
			})
		}
	}, [orbMovingState, moveOut, resetPointer])

	useEffect(() => {
		if (subscribeActive) {
			setOrbMovingState(() => 'subscribe')
		} else {
			setOrbOpacity(prev => {
				if (prev === 0) {
					return 1
				}
				return prev
			})
		}
	}, [subscribeActive, setOrbMovingState])

	useEffect(() => {
		setOrbMovingState((prev) => {
			if (prev === 'subscribe' && orbHold === true) {
				return 'subscribe_hold'
			} else if (prev === 'subscribe_hold' && orbHold === false) {
				return 'subscribe'
			}
			return prev
		})
	}, [orbHold, setOrbMovingState])
 
	useFrame(() => {
		if (orbRef.current !== null) {
			// console.log(orbRef.current.position);
			autoRotateOrb(0.001);

			// update the orbMaskSphereBbox to the position of the orbMask
			updateOrbMaskSphereBboxCenter();

			// calculate what side or is closest to
			closestSide.current = getClosestSide();

			// logic for orb movement
			if (!isOrbIntersecting()) {
				setIsIntersecting(() => false)
				previousPosition.current = [orbRef.current.position.x, orbRef.current.position.y, orbRef.current.position.z]
				if (orbMovingState === 'subscribe') {
					setOrbPosition(() => {
						subscribePosition.current = [viewport.width < 1280 ? -220 : -260, 0, 0];
						return [viewport.width < 1280 ? -220 : -260, 0, 0]
					})
					setScrollIndicatorHeight((prev) => {
						if (orbRef.current !== null) {
							if (subscribePosition.current[1] - orbRef.current.position.y === 0) {
								const maxHeight = 49;
								const x1 = subscribePosition.current[0];
								const currentX = orbRef.current.position.x;
								let percentage = 0
								if (currentX !== null) {
									percentage = Math.abs(x1 - currentX) / Math.abs(x1)
								}
								return percentage * maxHeight
							}
						}
						return prev
					})
				} else if (orbMovingState === 'resting') {
					setOrbPosition((prev) => {
						if (orbMovingState === 'resting') {
							if (pointerPosition[0] !== null && pointerPosition[1] !== null) return getTranslatedPointerPosition();
						}
						return prev
					})
				} else if (orbMovingState === 'in') {
					setOrbPosition((prev) => {
							if (pointerPosition[0] !== null && pointerPosition[1] !== null) {
								setOrbMovingState(() => 'resting');
								return getTranslatedPointerPosition();
							}
						return prev
					})
				} else if (orbMovingState === 'subscribe_hold') {
					setOrbPosition(() => [0, 0, 0])
					// get percentage of travel
					setScrollIndicatorHeight((prev) => {
						if (orbRef.current !== null) {
							// percentage is 100 when origin is atleast 10 units away from origin
							if (subscribePosition.current[1] - orbRef.current.position.y === 0) {
								const maxHeight = 49;
								const x1 = subscribePosition.current[0];
								const currentX = orbRef.current.position.x;
								let percentage = 0
								if (currentX !== null) {
									percentage = Math.abs(x1 - currentX) / Math.abs(x1)
								}
								// automator
								if (percentage === 1) {
									// atHoldThresholdAutomator();
									setOrbMovingState(() => 'at_threshold');
								}
								return percentage * maxHeight
							}
						}
						return prev
					})
				}
			} else {
				setIsIntersecting(() => true)
				setOrbPosition(() => previousPosition.current)
			}
		}
	})	
	
	return (
		<>
			<group
			>
				<a.mesh
					onPointerDown={() => setOrbHold((prev) => {
						if (orbMovingState === 'subscribe' || orbMovingState === 'subscribe_hold') return true
						return prev
					})}
					onPointerUp={() => setOrbHold((prev) => {
						if (orbMovingState === 'subscribe' || orbMovingState === 'subscribe_hold') return false
						return prev
					})}
					ref={orbMask}
					scale={orbScale}
					position={position}
				>
					<sphereBufferGeometry
						attach='geometry'
						args={[200, 32, 32, 0, 2*Math.PI, 0, Math.PI]}
					/>
					<meshBasicMaterial
						attach='material'
						// color="blue"
						transparent={true}
						opacity={0}
						side={DoubleSide}
					/>
				</a.mesh>
				<a.points
					onPointerDown={() => setOrbHold(() => true)}
					onPointerUp={() => setOrbHold(() => false)}
					ref={orbRef}
					scale={orbScale}
					position={position}
					// opacity={orbAnimationProps.opacity}
				>	
					<geometry
						attach='geometry'
						vertices={vertices}
					/>
					<a.pointsMaterial
						attach='material'
						color={new THREE.Color(0xCC37CC)}
						size={2.5}
						transparent={transparent}
						opacity={opacity}
					/>
				</a.points>
			</group>
			<group>
				<mesh
					ref={textRef1}
					position={rectPositions.current[chapterIndex].textRef1.position}
				>
					<boxGeometry
						attach="geometry"
						args={rectPositions.current[chapterIndex].textRef1.geometry}
					/>
					<meshBasicMaterial 
						attach="material"
						// color="blue"
						transparent={true}
						opacity={0}
					/>
				</mesh>
				<mesh
					ref={textRef2}
					position={rectPositions.current[chapterIndex].textRef2.position}
				>
					<boxGeometry
						attach="geometry"
						args={rectPositions.current[chapterIndex].textRef2.geometry}
					/>
					<meshBasicMaterial 
						attach="material"
						// color="blue"
						transparent={true}
						opacity={0}
					/>
				</mesh>
				<mesh
					ref={textRef3}
					position={rectPositions.current[chapterIndex].textRef3.position}
				>
					<boxGeometry
						attach="geometry"
						args={rectPositions.current[chapterIndex].textRef3.geometry}
					/>
					<meshBasicMaterial 
						attach="material"
						// color="blue"
						transparent={true}
						opacity={0}
					/>
				</mesh>
				<mesh
					ref={subscribeRef}
					position={[0, -viewport.height / 2 + 135, 0]}
				>
					<boxGeometry
						attach="geometry"
						args={[280, 50, 0]}
					/>
					<meshBasicMaterial 
						attach="material"
						// color="blue"
						transparent={true}
						opacity={0}
					/>
				</mesh>
			</group>			
		</>
	)
	
}
	
