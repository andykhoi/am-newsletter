import React, { FunctionComponent, useState, useRef, createRef, useCallback, useEffect, useMemo } from 'react';
import { usePrevious } from '../hooks/usePrevious';
import { useDidUpdate } from '../hooks/useDidUpdate';
import { useSpring, animated } from 'react-spring';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three/';

import { DesktopText } from './DesktopText';
import { DesktopOrb } from './DesktopOrb';

export const DesktopApp: FunctionComponent = () => {
	/*
		a couple things to rangle here:

		-state
		-timing of moving parts
		-state changes
		-sphere animation
	*/

	/* 
		-state:

		chapterIndex
		wheelDirection
		sphereState (to be passed to components to read)
		emailActive
		subscribeActive
		backgroundColor
		buttonShadow
		buttonText
	*/
	/*  
		-timing of moving parts:

		chapter change: sphere, text, scroll indicator
		end of text animation: background color, button color, shadow color, sphere
		
		subscribe click: text, shadow, button, sphere, scroll indicator
		subscribe sphere moveend (to center): instructions, email input, email text

		subscribe sphere hold: sphere 
		subscribe sphere hold threshold: instructions, email input, email text, background color
		subscribe sphere moveend (to corner): text, shadow, button text, scroll indicator
	*/
	/* 
		-state changes:

		scroll threshold: chapterIndex=, wheelDirection=
		chapterIndex -> sphereState=, backgroundColor=, buttonShadow=

		subscribeClick: subscribeActive=
		subscribeActive -> backgroundColor=, sphereState=

		sphereState @ center: emailActive=

		sphere hold: sphereState=

		sphere hold @ threshold: subscribeActive=
		subscribeActive -> sphereState=, emailActive=

		sphereState @ corner: chapterIndex=
		chapterIndex -> backgroundColor=, buttonShadow=
	*/
	/*
		-sphere animation:

		sphereState positioning
		useFrame updating

		pathing: linear transitioning, natural non-transitioning

	*/
	// depending on the direction of the swipe: cause the leave to move in that direction
	// on load chapter 1 text translates up
	let [chapterIndex, setChapterIndex] = useState<number>(0);
	let [backgroundColor, setBackgroundColor] = useState<string>('#D695AB')
	let [subscribeActive, setSubscribeActive] = useState<boolean>(false);
	let [buttonShadow, setButtonShadow] = useState<string>('1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
	const scrollIndicatorPositions = useRef<number[]>([0, 9, 18, 27]);
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])
	let [containerWidth, setContainerWidth] = useState<number | null>(null);
	let [containerHeight, setContainerHeight] = useState<number | null>(null);
	
	// const { viewport } = useThree()

	let wheelThreshold = useRef<number>(40);
	let containerRef = useRef<HTMLDivElement>(null);

	const scrollIndicatorAnimate = useSpring({
		top: scrollIndicatorPosition,
		opacity: chapterIndex === null ? '0' : '1',
		config: { clamp: true },
		backgroundColor: 'black',
	})

	useEffect(() => {
		setScrollIndicatorPosition(() => scrollIndicatorPositions.current[chapterIndex])
	}, [chapterIndex])

	useEffect(() => {
		if (containerRef.current) {
			setContainerHeight(() => containerRef.current ? containerRef.current.clientHeight : null);
			setContainerWidth(() => containerRef.current ? containerRef.current.clientWidth : null);
			window.addEventListener('resize', () => {
				setContainerWidth(() => containerRef.current ? containerRef.current.clientWidth : null);
				setContainerHeight(() => containerRef.current ? containerRef.current.clientHeight : null);
			})
		}
	}, [])

	// useEffect(() => {
	// 	if (containerWidth !== null && containerHeight !== null) {
	// 		const aspect = containerWidth / containerHeight;
	// 		camera.aspect = aspect;
	// 		camera.updateProjectMatrix();
	// 	}
	// }, [containerWidth, containerHeight, camera])

	return (
		<div
			ref={containerRef}
			className="DesktopAnimation"
			style={{
				backgroundColor: backgroundColor
			}}
		>
			<Canvas
				className="Orb"
				style={{
					position: 'absolute'
				}}
				orthographic
				camera={{
					left: containerWidth ? -containerWidth / 2 : undefined,
					right: containerWidth ? containerWidth / 2 : undefined,
					top: containerHeight ? containerHeight / 2 : undefined,
					bottom: containerHeight ? -containerHeight / 2 : undefined,
					near: 300,
					far: -300
				}}
			>	
				<DesktopOrb containerWidth={containerWidth} containerHeight={containerHeight} chapterIndex={chapterIndex} />
			</Canvas>
			<div className="logo" onClick={() => setChapterIndex(() => 0)}>
				<img src='../assets/logo.svg' alt='Logo' />
				<animated.div className="scroll-indicator" style={scrollIndicatorAnimate} />
			</div>
			<DesktopText chapterIndex={chapterIndex} setChapterIndex={setChapterIndex} wheelThreshold={wheelThreshold.current} setBackgroundColor={setBackgroundColor} setButtonShadow={setButtonShadow} />
			<div className="SubscribeButton">
				<button
					onClick={() => setSubscribeActive(() => true)}
					style={{
						boxShadow: buttonShadow
					}}
				>
					SUBSCRIBE
				</button>
			</div>
		</div>
	)
}