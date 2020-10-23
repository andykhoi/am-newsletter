import React, { FunctionComponent, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useDidUpdate } from '../hooks/useDidUpdate'
import { Canvas } from 'react-three-fiber'
import { useSpring as useSpringThree, a as aThree } from 'react-spring/three'
import { useSpring, animated } from 'react-spring'
import * as THREE from 'three/';
import { Transition } from 'react-spring/renderprops';

interface GradientShowProps {
	props?: any
	gradientActive: Boolean,
	swipeThreshold: number,
	chapterConfigs: any,
	chapterIndex: number | null,
	darkMode: Boolean,
	setChapterIndex: React.Dispatch<React.SetStateAction<number | null>>,
	setGradientActive: React.Dispatch<React.SetStateAction<Boolean>>,
	setSphereState: React.Dispatch<React.SetStateAction<{
		hold: boolean;
		direction: null | 'forwards' | 'backwards';
		mountAnimating: boolean;
	}>>
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

export const GradientShow2: FunctionComponent<GradientShowProps> = ({ gradientActive, swipeThreshold, children, chapterConfigs, setGradientActive, setSphereState, chapterIndex, setChapterIndex, darkMode }) => {
	const planeRef = useRef<THREE.Object3D | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);

	const MAX_CHAPTERS = useRef<number>(React.Children.toArray(children).length);
	const MAX_TEXT_SHADOW = useRef<number>(7);
	const scrollIndicatorPositions = useRef<number[]>([25, 33.8, 42.7, 51.5]);
	// const MAX_TEXT_OPACITY = useRef<number>(1);

	let [pointerState, setPointerState] = useState<PointerState>({
		active: false,
		initial_y_direction: null,
		x_start: null,
		y_start: null,
		y_travel: null, // length of y drag, null if active is false
		x_travel: null, // length of x drag, null if active is false
		swipePercentage: null // y_travel / swipeThreshold
	})	
	let [textOpacity, setTextOpacity] = useState<number>(1);
	let [textShadow, setTextShadow] = useState<number>(0);
	let [textColor, setTextColor] = useState<string>(chapterConfigs[0].textColor)
	let [lightColor, setLightColor] = useState<string>(chapterConfigs[0].lightColor)
	let [lightPosition, setLightPosition] = useState<[number, number, number]>([0,0,0]);
	let [lightRotation, setLightRotation] = useState<[number, number, number]>([0,0,0]);
	let [planeColor, setPlaneColor] = useState<string>(chapterConfigs[0].planeColor)
	let [lightIntensity, setLightIntensity] = useState<number>(chapterConfigs[0].lightIntensity)
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])
	const unmountLightColor = useMemo(() => darkMode ? '#000000' : '#FFFFFF', [darkMode])
	
	// plane color
	const planeAnimation = useSpringThree({
		color: planeColor,
	})

	// light position
	const rectLightAnimation = useSpringThree({
		position: lightPosition,
		color: lightColor,
		rotation: lightRotation,
		intensity: lightIntensity,
		config: {
			mass: 1,
			friction: 8,
			tension: 70,
			clamp: true
		},
		onRest: (arg: any) => {
			if (chapterIndex === null && lightPosition.every(coord => coord === 0)) {
				setGradientActive(() => false);
				setSphereState(() => ({
					hold: false,
					direction: 'backwards',
					mountAnimating: false
				}))
				setTimeout(() => setChapterIndex(() => 0), 500);
			}
		} 
	});

	// scrollIndicator 
	const scrollIndicatorAnimate = useSpring({
		backgroundColor: darkMode ? '#FFFFFF' : '#000000',
		top: scrollIndicatorPosition,
		opacity: chapterIndex === null ? '0' : '1',
		config: { clamp: true }
		// config: { mass: 1, friction: 1, tension: 100, clamp: true }
	})

	// container opacity & z-index
	const gradientContainerAnimation = useSpring({
		zIndex: !gradientActive ? -1 : 4,
		opacity: !gradientActive ? 0 : 1,
		immediate: key => key === 'zIndex',
	});

	const unmount = useCallback(() => {
		setChapterIndex(() => null);
	}, [setChapterIndex])

	// reset pointer to default, unactive state
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

	// reset react-spring animation values to defaults
	const resetAnimationValues = useCallback(() => {
		setLightColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].lightColor
		});
		setTextColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].textColor;
		});
		setLightIntensity(() => {
			return chapterIndex === null ? 2 : chapterConfigs[chapterIndex].lightIntensity;
		})
		setPlaneColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].planeColor;
		});
		setLightPosition(() => [0,0,0]);
		setTextShadow(() => 0);
		setTextOpacity(() => 1);
	}, [chapterIndex, chapterConfigs, unmountLightColor])

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
					if (prevState.initial_y_direction === 'up') {
						if (swipePercentage && swipePercentage < 0) {
							if (Math.abs(swipePercentage) < 0.10) swipePercentage = 0;
							updatedValues = {
								y_travel,
								x_travel,
								swipePercentage,
							}
						}
					} else if (prevState.initial_y_direction === 'down' && chapterIndex !== null && chapterIndex > 0) {
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
			initial_y_direction,
		} = pointerState;
		if (active) {
			if (swipePercentage !== null) {
				const absSwipePercentage = Math.abs(swipePercentage);
				if (absSwipePercentage >= 1) {
					// define unmounting scenario here
					// swipePercentage < 0 ? setChapterIndex(prevState => prevState + 1) : setChapterIndex(prevState => prevState - 1)
					if (swipePercentage < 0) {
						if (chapterIndex === MAX_CHAPTERS.current - 1) {
							// unmount
							unmount();
						} else {
							setChapterIndex(prevState => {
								if (prevState !== null) {
									return prevState + 1
								}
								return prevState
							});
						}
					} else {
						setChapterIndex(prevState => {
							if (prevState !== null) {
								return prevState - 1
							}
							return prevState
						});
					}
					resetPointer();
				} else if (absSwipePercentage >= 0 && absSwipePercentage < 1) {
					setTextShadow(() => 4 + (absSwipePercentage * MAX_TEXT_SHADOW.current))
					setTextOpacity(() => 1 - (absSwipePercentage * 0.5))
					if (absSwipePercentage >= 0.70) {
						setLightPosition(() => [48, 120, 72])
					} else if (absSwipePercentage >= 0.50) {
						setLightPosition(() => [36, 90, 54])
					} else if (absSwipePercentage >= 0.10) {
						setLightPosition(() => [27, 67.5, 40.5])
					}
				}
			} else if (initial_y_direction === null) {
				setTextShadow(() => 3.5)
				// setTextOpacity(() => 0.8)
				setLightPosition(() => [10, -52.5, 31.5])
			} else if (chapterIndex === 0) {
				if (initial_y_direction === 'down') resetPointer();
			}
		} else {
			resetAnimationValues();
		}
	}, [pointerState, chapterIndex, resetPointer, resetAnimationValues, unmount, setChapterIndex])

	useDidUpdate(() => {
		setLightColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].lightColor;
		});
		setTextColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].textColor;
		});
		setLightIntensity(() => {
			return chapterIndex === null ? 2 : chapterConfigs[chapterIndex].lightIntensity;
		})
		setPlaneColor(() => {
			return chapterIndex === null ? unmountLightColor : chapterConfigs[chapterIndex].planeColor;
		});
		setLightPosition(() => [0,0,0])
		setTextOpacity(() => 1)
		setTextShadow(() => 0)
		setScrollIndicatorPosition((prevState) => {
			return chapterIndex === null ? prevState : scrollIndicatorPositions.current[chapterIndex]
		})
	}, [chapterIndex, chapterConfigs, unmountLightColor])

	return (
		<animated.div className="GradientShow"
			style={gradientContainerAnimation}
			ref={containerRef}
		>
			<animated.div className="scroll-indicator" style={scrollIndicatorAnimate} />
			<div className="grid">
				<Transition
					items={chapterIndex}
					from={{ opacity: 0, textShadow: `0px 0px 0px ${textColor}`, immediate: (key: any) => key === 'textShadow' }}
					update={{ opacity: textOpacity, textShadow: `0px 0px ${textShadow}px ${textColor}`, config: { mass: 1, tension: 190, friction: 20, clamp: true }}}
					enter={{ opacity: 1 }}
					leave={{ textShadow: `0px 0px ${MAX_TEXT_SHADOW}px black`, opacity: 0, config: { mass: 1, friction: 10, clamp: true }}}
				>
					{ chapterIndex => (props) => {
						if (chapterIndex !== null) {
							return React.cloneElement(React.Children.toArray(children)[chapterIndex] as React.ReactElement<any>, { style: props })
						}
						return null
					}}
				</Transition>
				<Canvas className="gradient">
					{/* <ambientLight intensity={0.5} /> */}
					<aThree.rectAreaLight
						position={rectLightAnimation.position}
						color={rectLightAnimation.color}
						rotation={rectLightAnimation.rotation}
						intensity={rectLightAnimation.intensity}
						// distance={2}/
						width={150}
						height={550}
						// decay={0}
						lookAt={() => planeRef.current && planeRef.current.position} />
					<mesh position={[0, 0, -80]} ref={planeRef}>
						<planeBufferGeometry attach='geometry' args={[1000, 1000]} />
						<aThree.meshPhysicalMaterial attach='material' color={planeAnimation.color} />
					</mesh>
				</Canvas>
			</div>
		</animated.div>
	)
}