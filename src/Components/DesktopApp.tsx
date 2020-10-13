import
	React,
	{
		FunctionComponent,
		useState,
		useRef,
		useEffect,
		useCallback,
	} 
from 'react';
import { useSpring, animated } from 'react-spring';
import { Canvas } from 'react-three-fiber';

import { DesktopText } from './DesktopText';
// import { DesktopOrb } from './DesktopOrb';
import { Orb } from './DesktopOrb3';
import { Email } from './DesktopEmailForm';

interface OrbState {
	orb_position: [number, number, number],
	move_state: 'out' | 'in' | 'to' | 'rest',
}

export const DesktopApp: FunctionComponent = () => {
	let [chapterIndex, setChapterIndex] = useState<number>(0);
	let [backgroundColor, setBackgroundColor] = useState<string>('#D695AB')
	let [subscribeActive, setSubscribeActive] = useState<boolean>(false);
	let [buttonShadow, setButtonShadow] = useState<string>('1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
	const scrollIndicatorPositions = useRef<number[]>([0, 9, 18, 27]);
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])
	let [canvasViewport, setCanvasViewport] = useState<{width: number, height: number, factor: number} | null>(null)
	let [orbMovingState, setOrbMovingState] = useState<'out' | 'resting' | 'to' | 'intersecting' | 'in' | 'subscribe'>('in')
	let [pointerPosition, setPointerPosition] = useState<[number | null, number | null]>([null, null])

	let wheelThreshold = useRef<number>(40);
	let containerRef = useRef<HTMLDivElement>(null);

	const scrollIndicatorAnimate = useSpring({
		top: scrollIndicatorPosition,
		opacity: chapterIndex === null ? '0' : '1',
		config: { clamp: true },
		backgroundColor: !subscribeActive ? 'black' : 'white',
	})

	useEffect(() => {
		setScrollIndicatorPosition(() => scrollIndicatorPositions.current[chapterIndex])
	}, [chapterIndex])

	const resetPointer = useCallback(() => {
		setPointerPosition(() => [null, null])
	}, [])

	const subscribeButtonProps = useSpring({
		opacity: subscribeActive ? 0 : 1,
		config: {
			mass: 1,
			friction: 4,
			clamp: true,
		}
	})

	return (
		<div
			ref={containerRef}
			className="DesktopAnimation"
			style={{
				backgroundColor: backgroundColor
			}}
			onPointerMove={(e) => {
				const {
					clientX,
					clientY
				} = e;
				setPointerPosition(() => {
					return [clientX, clientY]
				})
			}}
		>
			<Canvas
				className="Orb"
				style={{
					position: 'absolute'
				}}
				orthographic
				camera={{
					left: canvasViewport ? -canvasViewport.width / 2 : undefined,
					right: canvasViewport ? canvasViewport.width / 2 : undefined,
					top: canvasViewport ? canvasViewport.height / 2 : undefined,
					bottom: canvasViewport ? -canvasViewport.height / 2 : undefined,
					near: 300,
					far: -300
				}}
			>	
				<Orb pointerPosition={pointerPosition} chapterIndex={chapterIndex} orbMovingState={orbMovingState} resetPointer={resetPointer} setOrbMovingState={setOrbMovingState} subscribeActive={subscribeActive} setSubscribeActive={setSubscribeActive} />
			</Canvas>
			<div className="logo" onClick={() => setChapterIndex(() => 0)}>
				{ !subscribeActive ? <img src='../assets/logo.svg' alt='Logo' /> : <img src='../assets/logo_white.svg' alt='Logo' />}
				<animated.div className="scroll-indicator" style={scrollIndicatorAnimate} />
			</div>
			<DesktopText chapterIndex={chapterIndex} setChapterIndex={setChapterIndex} wheelThreshold={wheelThreshold.current} setBackgroundColor={setBackgroundColor} setButtonShadow={setButtonShadow} setOrbMovingState={setOrbMovingState} subscribeActive={subscribeActive} />
			<animated.div className="SubscribeButton" style={subscribeButtonProps}>
				<button
					onClick={() => setSubscribeActive(() => true)}
					style={{
						boxShadow: buttonShadow
					}}
				>
					SUBSCRIBE
				</button>
			</animated.div>
			{/* <Email /> */}
		</div>
	)
}