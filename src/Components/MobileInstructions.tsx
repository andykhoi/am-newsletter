import React, {
	FunctionComponent,
	useEffect,
	useState,
	PointerEvent
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
			setInstructionsState((prev) => {
				if (prev.position === 'up' && pointerState.yTravel < -20) {
					// resetPointer();
					return { ...prev, position: 'down'}
				} else if (prev.position === 'down' && pointerState.yTravel > 20) {
					// resetPointer();
					return { ...prev, position: 'up'}
				}
				return prev
			})
		}
	}, [pointerState, setInstructionsState])

	return (
		<animated.div
			// className={darkMode ? "hold-icon darkMode" : "hold-icon"}
			onPointerDown={(e: PointerEvent) => pointerDownHandler(e)}
			onPointerMove={(e: PointerEvent) => pointerMoveHandler(e)}
			onPointerUp={() => {
				pointerUpHandler()
			}}
			onClick={() => {
				if (instructionsState.position === 'down') {
					setInstructionsState(prev => ({...prev, position: 'up'}))
				}
			}}
			style={instructionsDivProps}
			className={`hold-icon${darkMode ? ' darkMode' : ''}${instructionsState.position === 'down' ? ' down' : ''}`}
		>
			<div className="center"><div className="swiper"></div></div>
			{ !darkMode ? <img src="../assets/holdicon.svg" alt="Press and hold to learn more about Andy Mag"/> : <img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/> }
			<animated.p style={instructionsTextProps}>Press and hold to learn more about Andy Mag</animated.p>
		</animated.div>
	)
}