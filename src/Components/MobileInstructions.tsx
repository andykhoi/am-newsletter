import React, {
	FunctionComponent,
	useEffect,
	useState,
	// PointerEvent,
	useRef, 
	useCallback
} from 'react';
import { useSpring, animated } from 'react-spring';

interface MobileInstructionsProps {
	darkMode: Boolean,
	instructionsState: {
		position: 'up' | 'down',
		visible: boolean
	}
	setInstructionsState: React.Dispatch<React.SetStateAction<{
		position: 'up' | 'down';
		visible: boolean;
	}>>
}

export const MobileInstructions: FunctionComponent<MobileInstructionsProps> = ({
	instructionsState,
	darkMode,
	setInstructionsState
}) => {
	const instructionsRef = useRef<HTMLDivElement>(null);

	let [pointerState, setPointerState] = useState<any>({
		xStart: null,
		yStart: null,
		yTravel: null,
		xTravel: null,
	})

	const pointerDownHandler = (e: PointerEvent) => {
		const {
			clientX,
			clientY
		} = e
		setPointerState((prev: any) => {
			const updated = {
				xStart: clientX,
				yStart: clientY,
			}
			return { ...prev, ...updated}
		})
	}

	const pointerMoveHandler = (e: PointerEvent) => {
		const {
			clientX,
			clientY
		} = e
		setPointerState((prev: any) => {
			const yTravel = prev.yStart ? prev.yStart - clientY : null;
			const xTravel = prev.xStart ? clientX - prev.xStart : null;
			return { ...prev, yTravel, xTravel }
		})
	}

	const pointerUpHandler = () => {
		setPointerState(() => ({
			xTravel: null,
			yTravel: null,
			xStart: null,
			yStart: null,
		}))
	}

	const clickHandler = useCallback(() => {
		setInstructionsState((prev) => {
			if (prev.position === 'down') {
				return { ...prev, position: 'up'}
			}
			return prev
		})
	}, [setInstructionsState])

	// const resetPointer = () => {
	// 	setPointerState(() => ({
	// 		xTravel: null,
	// 		yTravel: null,
	// 		xStart: null,
	// 		yStart: null,
	// 	}))
	// }

	const instructionsDivProps = useSpring({
		opacity: instructionsState.visible ? 1 : 0,
		config: instructionsState.position === 'down' ? { duration: 70 } : { tension: 280, clamp: true },
	})

	const instructionsTextProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#000000',
		config: { duration: 130 }
	})

	useEffect(() => {
		if (pointerState.yTravel !== null) {
			console.log(pointerState);
			setInstructionsState((prev) => {
				if (prev.position === 'up' && pointerState.yTravel < -8) {
					// resetPointer();
					return { ...prev, position: 'down'}
				} else if (prev.position === 'down' && pointerState.yTravel > 8) {
					// resetPointer();
					return { ...prev, position: 'up'}
				}
				return prev
			})
		}
	}, [pointerState, setInstructionsState])

	useEffect(() => {
		let ref = instructionsRef.current;
		if (ref) {
			ref.addEventListener('pointerdown', (e: PointerEvent) => pointerDownHandler(e))
			ref.addEventListener('pointermove', (e: PointerEvent) => pointerMoveHandler(e))
			ref.addEventListener('pointerup', () => pointerUpHandler())
			ref.addEventListener('click', () => clickHandler())
		}
		return () => {
			if (ref) {
				ref.removeEventListener('pointerdown', (e: PointerEvent) => pointerDownHandler(e))
				ref.removeEventListener('pointermove', (e: PointerEvent) => pointerMoveHandler(e))
				ref.removeEventListener('pointerup', () => pointerUpHandler())
				ref.removeEventListener('click', () => clickHandler())
			}
		}
	}, [clickHandler])

	return (
		<animated.div
			// onPointerDown={(e: PointerEvent) => pointerDownHandler(e)}
			// onPointerMove={(e: PointerEvent) => pointerMoveHandler(e)}
			// onPointerUp={() => {
			// 	pointerUpHandler()
			// }}
			// onClick={() => {
			// 	if (instructionsState.position === 'down') {
			// 		setInstructionsState(prev => ({...prev, position: 'up'}))
			// 	}
			// }}
			ref={instructionsRef}
			style={instructionsDivProps}
			className={`hold-icon${darkMode ? ' darkMode' : ''}${instructionsState.position === 'down' ? ' down' : ''}`}
		>
			<div className="center"><div className="swiper"></div></div>
			{ !darkMode ? <img src="../assets/holdicon.svg" alt="Press and hold to learn more about Andy Mag"/> : <img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/> }
			<animated.p style={instructionsTextProps}>Press and hold to learn more about Andy Mag</animated.p>
		</animated.div>
	)
}