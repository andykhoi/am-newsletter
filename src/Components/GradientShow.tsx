import React, { FunctionComponent, useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import { useDidUpdate } from '../hooks/useDidUpdate'
import { Canvas } from 'react-three-fiber'
import { useSpring as useSpringThree, a as aThree } from 'react-spring/three'
import { useSpring, animated } from 'react-spring'
import * as THREE from 'three/';
import { Spring, Transition } from 'react-spring/renderprops';
import { config } from 'process';

interface GradientShowProps {
	props?: any
	gradientActive: Boolean,
	swipeThreshold: number,
	chapterConfigs: any,
	children: React.ReactNode
}
interface PointerState {
	active: Boolean,
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
		x_start: null,
		y_start: null,
		y_travel: null, // length of y drag, null if active is false
		x_travel: null, // length of x drag, null if active is false
		swipePercentage: null // y_travel / swipeThreshold
	})

	// need a state that everything will follow
	// animations depend on cursor and chapter, chapters are set on mount and on swipe threshold
	// chapters are used for determining what the initial and end state is
	const [chapterIndex, setChapterIndex] = useState<number>(0);
	const MAX_CHAPTERS = useRef<number>(React.Children.toArray(children).length);
	// all of these will be set to their values when on scroll
	// at swipe threshold all values will move to next position automatically
		// know the end positions of all chapters, simply need to calculate the correct ratios
		// according to the swipe percentage -- percentage == 100%, set all to endPosition
	// will have to create functions that calculate these values on each pointer move
	// the animations will animate according to active chapter
	let [textOpacity, setTextOpacity] = useState<number>(1);
	let [textShadow, setTextShadow] = useState<number>(0);
	let [lightColor, setLightColor] = useState<string>(chapterConfigs[chapterIndex].lightColor)
	let [lightPosition, setLightPosition] = useState<[number, number, number]>(chapterConfigs[chapterIndex].startLightPosition);
	let [planeColor, setPlaneColor] = useState<string>(chapterConfigs[chapterIndex].planeColor)

	// plane color
	const planeAnimation = useSpringThree({
		color: planeColor,
	})

	// light position
	const rectLightAnimation = useSpringThree({
		position: lightPosition,
		color: lightColor,
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
		setTextShadow(() => 0)
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
				const y_travel = prevState.y_start ? y_position - prevState.y_start : null;
				const x_travel = prevState.x_start ? x_position - prevState.x_start : null;
				const swipePercentage = y_travel !== null ? y_travel / swipeThreshold : null;
				const updatedValues = {
					y_travel,
					x_travel,
					swipePercentage,
				}
				return {
					...prevState, ...updatedValues
				}
			})
		}
	}, [pointerState, swipeThreshold])

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
		console.log(pointerState);
		if (pointerState.active) {
			// if |swipePercentage >= 1| set all animation properties to the starts of the next chapter
			if (pointerState.swipePercentage !== null) {
				if (Math.abs(pointerState.swipePercentage) >= 1) {
					pointerState.swipePercentage < 0 ? setChapterIndex(prevState => prevState + 1) : setChapterIndex(prevState => prevState - 1)

					// reset pointer, prevent unintended side effects from swiping for too long
					resetPointer();
				} else if (Math.abs(pointerState.swipePercentage) >= 0 && Math.abs(pointerState.swipePercentage) < 1) {
					if (pointerState.swipePercentage < 0) {
						setTextShadow(prevState => prevState + 0.7)
					} else {
						setTextShadow(prevState => prevState - 0.7)
					}
					// setLightPosition(() => )
					// calculate the correct values of position and text shadow
					// can simply keep raising these values until reaches threshold
					
					// setAnimationValues()
				}
			}
		} else {
			// reset values back to initial chapter state
			resetAnimationValues();
		}
	}, [pointerState, resetPointer, resetAnimationValues])

	useDidUpdate(() => {
		setLightColor(() => chapterConfigs[chapterIndex].lightColor);
		setLightPosition(() => chapterConfigs[chapterIndex].startLightPosition);
		setPlaneColor(() => chapterConfigs[chapterIndex].planeColor);
		setTextShadow(() => 0)
	}, [chapterIndex, chapterConfigs])

	// useEffect(() => {
	// 	// set lightposition depending on y_travel
	// 	const travelRatio = pointerState.y_travel ? pointerState.y_travel / swipeThreshold : 0;
	// 	const difference = 220 - nextPosition.current[0]
	// 	const x_pos = travelRatio !== null ? (difference * travelRatio) + 220 : 0;
	// 	// x_pos && setLightPosition([220 + x_pos, lightPosition[1], lightPosition[2]])
	// }, [pointerState, swipeThreshold, lightPosition])

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
					update={{ textShadow: `0px 0px ${textShadow}px black`, config: { mass: 1, tension: 190, friction: 20, clamp: true }}}
					enter={{ textShadow: `0px 0px 0px black`, opacity: 1 }}
					leave={{ textShadow: `0px 0px 30px black`, opacity: 0 }}
				>
					{ chapterIndex => props => React.cloneElement(React.Children.toArray(children)[chapterIndex] as React.ReactElement<any>, { style: props })}
				</Transition>
				<Canvas className="gradient">
					<ambientLight intensity={0.7} />
					<aThree.rectAreaLight
						position={rectLightAnimation.position}
						color={rectLightAnimation.color}
						rotation={[0, 0, -Math.PI/12]}
						intensity={3.1}
						width={180}
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