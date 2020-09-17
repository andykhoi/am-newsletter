import React, { FunctionComponent, useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { useDidUpdate } from '../hooks/useDidUpdate'
import { Canvas } from 'react-three-fiber'
import { useSpring as useSpringThree, a as aThree } from 'react-spring/three'
import { useSpring, animated } from 'react-spring'
import * as THREE from 'three/';
import { Spring, Transition } from 'react-spring/renderprops';

interface GradientShowProps {
	props?: any
	gradientActive: Boolean,
	swipeThreshold: number,
	chapterConfigs: any,
	children: React.ReactNode
}
interface PointerState {
	active: Boolean,
	initial_y_direction: 'up' | 'down' | null
	x_start: number | null
	y_start: number | null
	y_travel: number | null
	x_travel: number | null
	swipePercentage: number | null
}

// will have to reset to initial state when user presses Icon

export const GradientShow: FunctionComponent<GradientShowProps> = ({ gradientActive, swipeThreshold, children, chapterConfigs }) => {
	const planeRef = useRef<THREE.Object3D | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

	let [pointerState, setPointerState] = useState<PointerState>({
		active: false,
		initial_y_direction: null,
		x_start: null,
		y_start: null,
		y_travel: null, // length of y drag, null if active is false
		x_travel: null, // length of x drag, null if active is false
		swipePercentage: null // y_travel / swipeThreshold
	})

	const [chapterIndex, setChapterIndex] = useState<number>(0);
	const MAX_CHAPTERS = useRef<number>(React.Children.toArray(children).length);

	const MAX_TEXT_SHADOW = useRef<number>(10);
	const MAX_TEXT_OPACITY = useRef<number>(1);
	
	let [textOpacity, setTextOpacity] = useState<number>(1);
	let [textShadow, setTextShadow] = useState<number>(0);
	let [lightColor, setLightColor] = useState<string>(chapterConfigs[chapterIndex].lightColor)
	let [lightPosition, setLightPosition] = useState<[number, number, number]>(chapterConfigs[chapterIndex].startLightPosition);
	let [lightRotation, setLightRotation] = useState<[number, number, number]>(chapterConfigs[chapterIndex].startLightRotation);
	let [planeColor, setPlaneColor] = useState<string>(chapterConfigs[chapterIndex].planeColor)
	let [lightIntensity, setLightIntensity] = useState<number>(chapterConfigs[chapterIndex].lightIntensity)

	// plane color
	const planeAnimation = useSpringThree({
		color: planeColor,
	})

	// light position
	const rectLightAnimation = useSpringThree({
		position: lightPosition,
		color: lightColor,
		rotation: lightRotation,
		intensity: lightIntensity
	});

	// container opacity & z-index
	const gradientContainerAnimation = useSpring({
		zIndex: !gradientActive ? -1 : 4,
		opacity: !gradientActive ? 0 : 1,
		immediate: key => key === 'zIndex',
	});

	const resetPointer = useCallback(() => {
		setPointerState(() => ({
			active: false,
			initial_y_direction: null,
			x_start: null,
			y_start: null,
			y_travel: null,
			x_travel: null,
			swipePercentage: null
		}))
	}, [])

	const resetAnimationValues = useCallback(() => {
		setLightColor(() => chapterConfigs[chapterIndex].lightColor);
		setLightPosition(() => chapterConfigs[chapterIndex].startLightPosition);
		setPlaneColor(() => chapterConfigs[chapterIndex].planeColor);
		setTextShadow(() => 0);
		setTextOpacity(() => 1);
	}, [chapterIndex, chapterConfigs])

	const pointerDownHandler = useCallback((e: PointerEvent) => {
		const y_start = e.clientY;
		const x_start = e.clientX;
		setPointerState(prevState => {
			const updatedValues = {
				active: true,
				x_start,
				y_start,
			}
			return {
				...prevState, ...updatedValues
			}
		})
	}, [])

	const pointerUpHandler = useCallback((e: PointerEvent) => {
		resetPointer();
	}, [resetPointer])

	const pointerMoveHandler = useCallback((e: PointerEvent) => {
		if (pointerState.active) {
			e.preventDefault();
			const y_position = e.clientY;
			const x_position = e.clientX;
			setPointerState(prevState => {
				let updatedValues;
				const y_travel = prevState.y_start ? y_position - prevState.y_start : null;
				const x_travel = prevState.x_start ? x_position - prevState.x_start : null;
				
				if (prevState.initial_y_direction === null) {
					let initial_y_direction: 'up' | 'down' | null = null;
					if (y_travel) {
						if (y_travel < 0) {
							initial_y_direction = 'up';
						} else if (y_travel > 0) {
							initial_y_direction = 'down';
						}
					}
					updatedValues = {
						y_travel,
						x_travel,
						initial_y_direction,
					}
				} else if (prevState.initial_y_direction !== null) {
					let swipePercentage = y_travel !== null ? y_travel / swipeThreshold : null;
					if (prevState.initial_y_direction === 'up' && chapterIndex < MAX_CHAPTERS.current - 1) {
						if (swipePercentage && swipePercentage < 0) {
							if (Math.abs(swipePercentage) < 0.10) swipePercentage = 0;
							updatedValues = {
								y_travel,
								x_travel,
								swipePercentage,
							}
						}
					} else if (prevState.initial_y_direction === 'down' && chapterIndex > 0) {
						if (swipePercentage && swipePercentage > 0) {
							if (Math.abs(swipePercentage) < 0.10) swipePercentage = 0;
							updatedValues = {
								y_travel,
								x_travel,
								swipePercentage,
							}
						}
					}	
				}

				return {
					...prevState, ...updatedValues
				}
			})
		}
	}, [pointerState, swipeThreshold, chapterIndex])

	useEffect(() => {
		const el = containerRef.current
		if (el) {
			el.addEventListener('pointerdown', pointerDownHandler)
			el.addEventListener('pointermove', pointerMoveHandler, false)
			el.addEventListener('pointerup', pointerUpHandler)
		}
		return () => {
			if (el) {
				el.removeEventListener('pointerdown', pointerDownHandler)
				el.removeEventListener('pointermove', pointerMoveHandler, false)
				el.removeEventListener('pointerup', pointerUpHandler)
			}
		}	
	}, [pointerMoveHandler, pointerDownHandler, pointerUpHandler])

	useEffect(() => {
		const { 
			active,
			swipePercentage,
		} = pointerState;

		if (active) {
			if (swipePercentage !== null) {
				const absSwipePercentage = Math.abs(swipePercentage);
				if (absSwipePercentage >= 1) {
					swipePercentage < 0 ? setChapterIndex(prevState => prevState + 1) : setChapterIndex(prevState => prevState - 1)
					resetPointer();
				} else if (absSwipePercentage >= 0 && absSwipePercentage < 1) {
					// do not set higher than max text shadow
					console.log(absSwipePercentage);
					setTextShadow(() => absSwipePercentage * MAX_TEXT_SHADOW.current)
					setTextOpacity(() => MAX_TEXT_OPACITY.current - absSwipePercentage)
					// setLightPosition(() => )
				}
			}
		} else {
			resetAnimationValues();
		}
	}, [pointerState, resetPointer, resetAnimationValues])

	useDidUpdate(() => {
		setLightColor(() => chapterConfigs[chapterIndex].lightColor);
		setLightPosition(() => chapterConfigs[chapterIndex].startLightPosition);
		setLightRotation(() => chapterConfigs[chapterIndex].startLightRotation);
		setLightIntensity(() => chapterConfigs[chapterIndex].lightIntensity)
		setPlaneColor(() => chapterConfigs[chapterIndex].planeColor);
		setTextOpacity(() => 1)
		setTextShadow(() => 0)
	}, [chapterIndex, chapterConfigs])

	return (
		<animated.div className="GradientShow"
			style={gradientContainerAnimation}
			ref={containerRef}
		>
			<div className="grid">
				{/* changes to the chapterIndex will force transition leave -- only have to set textShadow inbetween */}
				<Transition
					items={chapterIndex}
					// config={{ }}
					from={{ opacity: 0 }}
					update={{ textShadow: `0px 0px ${textShadow}px black`, opacity: textOpacity, config: { mass: 1, tension: 190, friction: 20, clamp: true }}}
					enter={{ textShadow: `0px 0px 0px black`, opacity: 1 }}
					leave={{ textShadow: `0px 0px ${MAX_TEXT_SHADOW}px black`, opacity: 0 }}
				>
					{ chapterIndex => props => React.cloneElement(React.Children.toArray(children)[chapterIndex] as React.ReactElement<any>, { style: props })}
				</Transition>
				<Canvas className="gradient">
					<ambientLight intensity={0.7} />
					<aThree.rectAreaLight
						position={rectLightAnimation.position}
						color={rectLightAnimation.color}
						rotation={rectLightAnimation.rotation}
						intensity={rectLightAnimation.intensity}
						// distance={2}/
						width={200}
						height={600}
						lookAt={() => planeRef.current && planeRef.current.position} />
					<mesh position={[0, 0, -150]} ref={planeRef}>
						<planeBufferGeometry attach='geometry' args={[1000, 1000]} />
						<aThree.meshPhysicalMaterial attach='material' color={planeAnimation.color} />
					</mesh>
				</Canvas>
			</div>
		</animated.div>
	)
}