import React, { FunctionComponent, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import { a, useSpring } from 'react-spring/three';
import { useDidUpdate } from '../hooks/useDidUpdate';
import { Box3 } from 'three';
import { DoubleSide } from 'three/';
// import { Sphere } from './Sphere';

interface OrbProps {
	pointerPosition: [number | null, number | null]
}

export const Orb: FunctionComponent<OrbProps> = ({ pointerPosition }) => {
	// create an orb modeled after a ball
	const { viewport } = useThree();
	const orbRef = useRef<THREE.Points | null>(null)
	const textRef = useRef<any>(null);
	const subscribeRef = useRef<any>(null);
	const orbCover = useRef<any>(null);
	const [orbScale, setOrbScale] = useState<[number, number, number] | null>(null)
	const [orbPosition, setOrbPosition] = useState<[number,number,number] | null>([-viewport.width / 2, -viewport.height / 2, 0])
	const [orbCoverPosition, setOrbCoverPosition] = useState<[number,number,number] | null>([-viewport.width / 2, -viewport.height / 2, 0])
	const [isIntersecting, setIntersecting] = useState<boolean>(false);

	// const closest = useRef<THREE.Vector3>(new THREE.Vector3());
	let textBbox = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));
	let orbSphereBbox = useRef<THREE.Sphere | null>(null) // position dependent on orbCover position
	let subscribeBbox = useRef<Box3>(new Box3(new THREE.Vector3(), new THREE.Vector3()));

	// const [orbRotation, setOrbRotation] = useState<[number, number, number]>([0,0,0.001]);
	const orbCoverAnimationProps = useSpring({
		position: orbCoverPosition,
		// rotation: orbRotation,
		config: { mass: 1000, friction: isIntersecting ? 400 : 1900, clamp: false },
		// onFrame: (position: [number, number, number] | null) => {
		// 	console.log(position);
		// }
	})

	const orbAnimationProps = useSpring({
		position: orbPosition,
		config: { mass: 1000, friction: isIntersecting ? 400 : 1900, clamp: false },
	})

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

	useEffect(() => {
		if (viewport.width > 900 && viewport.width < 1000) {
			setOrbScale(() => [1,1,1])
		} else {
			setOrbScale(() => [1.2, 1.2, 1.2])
		}
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

	useDidUpdate(() => {
		// only set position to pointer if transitioning state is resting
		// setOrbPosition(() => {
		// 	// only allow for movement of + 50 in either x or y direction -- in the direction of the pointer
		// 	if (isIntersecting && orbRef.current !== null) {
		// 		// push orb back 
		// 		return [orbRef.current.position.x - 20, orbRef.current.position.y, 0]
		// 	} else {
		// 		if (pointerPosition[0] !== null && pointerPosition[1] !== null) {
		// 			let x = pointerPosition[0] - window.innerWidth / 2;
		// 			let y = -pointerPosition[1] + window.innerHeight / 2;
		// 			// let orbX = orbRef.current?.position.x;
		// 			// let orbY = orbRef.current?.position.y;
	
		// 			// // find the line 
		// 			// let slope;
		// 			// if (orbX !== undefined && orbY !== undefined) {
		// 			// 	if (orbX < x) {
		// 			// 		slope = (y - orbY) / (x - orbX)
		// 			// 	} else {
		// 			// 		slope = (orbY - y) / (orbX - x)
		// 			// 	}
						
		// 			// }
		// 			return [x, y, 0]
		// 		}
		// 	}	
		// 	return null
		// })
		setOrbCoverPosition(() => {
			return getTranslatedPointerPosition();
		})
	}, [pointerPosition])

	// const sphereIntersectsBox = useCallback((sphere: THREE.Sphere, box: THREE.Box3) => {
	// 	closest.current.set(sphere.center.x, sphere.center.y, sphere.center.z);
   	// 	closest.current.clamp(box.min, box.max);

    // 	let distance =  sphere.center.distanceToSquared(closest.current);
    // 	return distance < (sphere.radius * sphere.radius);
	// }, [])

	const sphereIntersectsBox = useCallback((sphere: THREE.Sphere, box: Box3) => {
		// get box closest point to sphere center by clamping
		var x = Math.max(box.min.x, Math.min(sphere.center.x, box.max.x));
		var y = Math.max(box.min.y, Math.min(sphere.center.y, box.max.y));
		var z = Math.max(box.min.z, Math.min(sphere.center.z, box.max.z));
	  
		// this is the same as isPointInsideSphere
		var distance = Math.sqrt((x - sphere.center.x) * (x - sphere.center.x) +
								 (y - sphere.center.y) * (y - sphere.center.y) +
								 (z - sphere.center.z) * (z - sphere.center.z));
		
		return distance < sphere.radius;
	  }, [])
 
	useFrame(() => {
		if (orbRef.current !== null && textRef.current !== null) {
			orbRef.current.rotation.y += 0.001
			orbRef.current.rotation.z += 0.001
			
			// pull animated value from useSpring and set this position to orbSphereBbox -- if interects anything do not apply animated value position, if not apply position
			orbCover.current.geometry.computeBoundingSphere();
			orbSphereBbox.current = new THREE.Sphere(orbCover.current.position, orbCover.current.geometry.boundingSphere.radius + 40)
		
			textRef.current.geometry.computeBoundingBox();
			subscribeRef.current.geometry.computeBoundingBox();
			
			textBbox.current.setFromObject(textRef.current);
			subscribeBbox.current.setFromObject(subscribeRef.current);
			
			if (!(sphereIntersectsBox(orbSphereBbox.current, textBbox.current) || sphereIntersectsBox(orbSphereBbox.current, subscribeBbox.current))) {
				orbRef.current.position.x = orbCover.current.position.x
				orbRef.current.position.y = orbCover.current.position.y
				orbRef.current.position.z = orbCover.current.position.z
			}

			// console.log(sphereIntersectsBox(orbSphereBbox.current, textBbox.current), sphereIntersectsBox(orbSphereBbox.current, subscribeBbox.current))
			
			// console.log(sphereIntersectsBox(orbSphereBbox, subscribeBbox))
			/* BUG: need a circular bounding box for the orb!!!!!!!!!!!!!!!!!!!!!!!! */
			// console.log(subscribeBbox.intersectsBox(orbBbox), textBbox.intersectsBox(orbBbox))
			// if (orbBbox.intersectsBox(subscribeBbox) || orbBbox.intersectsBox(textBbox)) {
			// 	// console.log(orbBbox);
			// 	setIntersecting(() => true);
			// } else {
			// 	setIntersecting(() => false);
			// }
		}
	})
	// console.log(orbAnimationProps.position)
	return (
		<group
		>
			<a.mesh
				ref={orbCover}
				scale={orbScale}
				position={orbCoverAnimationProps.position}
			>
				<sphereBufferGeometry
					attach='geometry'
					args={[200, 32, 32, 0, 2*Math.PI, 0, Math.PI]}
				/>
				<meshBasicMaterial
					attach='material'
					color="blue"
					// transparent={false}
					// opacity={0}
					side={DoubleSide}
				/>
			</a.mesh>
			<a.points
				ref={orbRef}
				scale={orbScale}
				position={orbAnimationProps.position}
				// rotation={rotation}
			>	
				<geometry
					attach='geometry'
					vertices={vertices}
				/>
				<pointsMaterial
					attach='material'
					color={new THREE.Color(0xCC37CC)}
					size={3}
				/>
			</a.points>
			{/* add barrier here and do calculations to determine if orb is colliding
				if colliding stopMovement
			*/}
			<mesh
				ref={textRef}
				position={[0,0,0]}
			>
				<boxGeometry
					attach="geometry"
					args={[700, 200, 0]}
				/>
				<meshBasicMaterial 
					attach="material"
					color="blue"
				/>
			</mesh>
			<mesh
				ref={subscribeRef}
				position={[0, -viewport.height / 2.7, 0]}
			>
				<boxGeometry
					attach="geometry"
					args={[400, 60, 0]}
				/>
				<meshBasicMaterial 
					attach="material"
					color="blue"
				/>
			</mesh>
		</group>
	)
	
}