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
// import { DesktopInstructions } from './DesktopInstructions'
import { Email } from './DesktopEmailForm';

interface OrbState {
	orb_position: [number, number, number],
	move_state: 'out' | 'in' | 'to' | 'rest',
}

export const DesktopApp: FunctionComponent = () => {
	let [chapterIndex, setChapterIndex] = useState<number>(0);
	let [backgroundColor, setBackgroundColor] = useState<string>('#D695AB')
	let [subscribeActive, setSubscribeActive] = useState<boolean>(false);
	let [emailActive, setEmailActive] = useState<boolean>(false);
	let [buttonShadow, setButtonShadow] = useState<string>('1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
	const scrollIndicatorPositions = useRef<number[]>([0, 10, 19, 28.2]);
	let [scrollIndicatorPosition, setScrollIndicatorPosition] = useState<number>(scrollIndicatorPositions.current[0])
	let [scrollIndicatorHeight, setScrollIndicatorHeight] = useState<number>(0);
	let [canvasViewport, setCanvasViewport] = useState<{width: number, height: number, factor: number} | null>(null)
	let [orbMovingState, setOrbMovingState] = useState<'out' | 'resting' | 'to' | 'intersecting' | 'in' | 'subscribe' | 'subscribe_hold' | 'at_threshold'>('resting')
	let [orbHold, setOrbHold] = useState<boolean>(false);
	let [pointerPosition, setPointerPosition] = useState<[number | null, number | null]>([null, null])
	// console.log(scrollIndicatorHeight);
	let wheelThreshold = useRef<number>(40);
	let containerRef = useRef<HTMLDivElement>(null);

	const scrollIndicatorAnimate = useSpring({
		// top: subscribeActive ? 'auto' : scrollIndicatorPosition,
		top: !subscribeActive ? scrollIndicatorPosition : 'auto',
		bottom: subscribeActive ? 1 : 'auto',
		height: subscribeActive ? scrollIndicatorHeight : 19,
		config: { clamp: true },
		backgroundColor: !subscribeActive ? 'black' : 'white',
	})

	// const instructionsProps = useSpring({
	// 	opacity: orbHold ? 0 : 1
	// })

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
				<Orb setBackgroundColor={setBackgroundColor} setButtonShadow={setButtonShadow} setChapterIndex={setChapterIndex} setScrollIndicatorHeight={setScrollIndicatorHeight} orbHold={orbHold} setOrbHold={setOrbHold} setEmailActive={setEmailActive} pointerPosition={pointerPosition} chapterIndex={chapterIndex} orbMovingState={orbMovingState} resetPointer={resetPointer} setOrbMovingState={setOrbMovingState} subscribeActive={subscribeActive} setSubscribeActive={setSubscribeActive} />
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
			<div className="SocialMedia">
				<a target="_blank" rel="noopener noreferrer" href="https://www.snapchat.com/add/theandymag"><img src="../assets/snapchat.svg" alt="Snapchat" /></a>			
				<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/theandymag/"><img src="../assets/instagram.svg" alt="Instagram" /></a>			
				<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/theandymag_"><img src="../assets/twitter.svg" alt="Twitter" /></a>
			</div>
			{/* <DesktopInstructions /> */}
			<Email orbHold={orbHold} emailActive={emailActive} />
		</div>
	)
}