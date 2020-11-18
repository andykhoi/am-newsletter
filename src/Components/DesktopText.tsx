import React, { FunctionComponent, useRef, createRef, useEffect, useCallback, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDidUpdate } from '../hooks/useDidUpdate';

interface DesktopTextProps {
	setChapterIndex: React.Dispatch<React.SetStateAction<number>>
	chapterIndex: number | null
	wheelThreshold: number
	setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
	setButtonShadow: React.Dispatch<React.SetStateAction<string>>
	// orbMovingState: "out-forward" | "out-backward" | "to-forward" | "to-backward" | "resting"
	setOrbMovingState: React.Dispatch<React.SetStateAction<"out" | "to" | "resting" | "intersecting" | "in" | "subscribe" | "subscribe_hold" | "at_threshold">>
	subscribeActive: boolean
}

export const DesktopText: FunctionComponent<DesktopTextProps> = ({ 
	chapterIndex,
	setChapterIndex,
	wheelThreshold,
	setBackgroundColor,
	setButtonShadow,
	setOrbMovingState,
	subscribeActive
}) => {
	let chapterRefs = useRef<React.RefObject<HTMLDivElement>[]>([createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]);
	let [textTransitioning, setTextTransitioning] = useState<'out-down' | 'out-up' | 'in' | null>(null)

	const textAnimation = useSpring({
		opacity: subscribeActive ? 0 : 1,
		zIndex: subscribeActive ? -1 : 2,
		config: {
			mass: 1,
			friction: 4,
			clamp: true,
		}
	})

	const reset = useCallback(() => {
		// remove all out classes to out down
		if (chapterRefs.current !== null) {
			chapterRefs.current.forEach((chapter, index) => {
				if (chapter.current !== null) {
					chapter.current.classList.remove('out-up');
					chapter.current.classList.add('out-down');
				}
			})
		}
	}, [])
	
	useEffect(() => {
		const {
			current: chapter = null
		} = chapterRefs.current[0]

		chapter?.classList.remove('out-down')
	}, [])

	useEffect(() => {
		if (subscribeActive) {
			setBackgroundColor(() => '#231B1B')
			setTimeout(reset, 1000);
		} else {
			if (chapterRefs.current !== null && chapterRefs.current[0].current !== null) {
				if (chapterRefs.current[0].current.classList.contains('out-down')) chapterRefs.current[0].current.classList.remove('out-down') 
			}
		}
	}, [subscribeActive, setBackgroundColor, reset])

	useDidUpdate(() => {
		if (chapterIndex !== null) {
			const {
				current: chapter = null
			} = chapterRefs.current[chapterIndex]
			
			setTextTransitioning(() => 'in')
			chapter?.classList.remove('out-down', 'out-up')
		}
	}, [chapterIndex])

	const wheelHandler = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
		const { deltaY } = event;
		if (textTransitioning === null) {
			if (Math.abs(deltaY) > wheelThreshold) {
				if (chapterIndex !== null) {
					const {
						current: chapter = null
					} = chapterRefs.current[chapterIndex]
					if (deltaY > 0 && chapterIndex < 3) {
						chapter?.classList.add('out-up');
						setTextTransitioning(() => 'out-up')
						setOrbMovingState(() => 'out')
					} else if (deltaY < 0 && chapterIndex > 0) {
						chapter?.classList.add('out-down');
						setTextTransitioning(() => 'out-down')
						setOrbMovingState(() => 'out')
					}
				}
			}
		}
	}, [chapterIndex, wheelThreshold, textTransitioning, setOrbMovingState])

	return (
		<animated.div className="Text grid" style={textAnimation}>
			<div
				className="chapter out-down"
				onWheel={(e) => wheelHandler(e)}
				ref={chapterRefs.current[0]}
			>
				<span>
					<span><h2>The most damaging phrase in language is 'It's</h2></span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.06s'}}><h2>always been done that way'</h2></span>
				</span>
				<span className="spacer-top-1">
					<span
						style={{ transitionDelay: '0.09s'}}
						// set chapterIndex to next
						onTransitionEnd={() => {
							if (textTransitioning === 'out-up') {
								setChapterIndex(() => 1)
								setBackgroundColor(() => '#D695C7')
								setButtonShadow(() => '1px 2px 7px 0px rgba(190, 131, 176, 0.95), -1px -2px 7px rgba(241, 167, 224, 1)')
							} else if (textTransitioning === 'in') {
								setTextTransitioning(() => null)
							}
						}}
					>
						<h2>- Admiral Grace Hopper</h2>
					</span>
				</span>
			</div>
			<div
				className="chapter out-down"
				ref={chapterRefs.current[1]}
				onWheel={(e) => wheelHandler(e)}
			>
				<span>
					<span><h2>Andy Mag is an experiential magazine,</h2></span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.06s'}}><h2>telling meaningful stories and enhancing</h2></span>
				</span>
				<span>
					<span 
						style={{ transitionDelay: '0.09s'}}
						onTransitionEnd={() => {
							if (textTransitioning === 'out-up') {
								setChapterIndex(() => 2)
								setBackgroundColor(() => '#9C95D6')
								setButtonShadow(() => '1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3')
							} else if (textTransitioning === 'out-down') {
								setChapterIndex(() => 0)
								setBackgroundColor(() => '#D695AB')
								setButtonShadow(() => '1px 2px 7px 0px rgba(189, 132, 151, 1), -1px -2px 7px rgba(246, 169, 195, 1)')
							} else if (textTransitioning === 'in') {
								setTextTransitioning(() => null)
							}
						}}
					><h2>digital experiences.</h2></span>
				</span>
			</div>
			<div
				className="chapter out-down"
				ref={chapterRefs.current[2]}
				onWheel={(e) => wheelHandler(e)}
			>
				<span>
					<span
						onTransitionEnd={() => {
							if (textTransitioning === 'out-up') {
								setChapterIndex(() => 3)
								setBackgroundColor(() => '#95B1D6')
								setButtonShadow(() => '1px 2px 7px 0px #779FD4, -1px -2px 7px #BAC4D2')
							} else if (textTransitioning === 'out-down') {
								setChapterIndex(() => 1)
								setBackgroundColor(() => '#D695C7')
								setButtonShadow(() => '1px 2px 7px 0px rgba(190, 131, 176, 0.95), -1px -2px 7px rgba(241, 167, 224, 1)')
							} else if (textTransitioning === 'in') {
								setTextTransitioning(() => null)
							}
						}}
					><h2>Because a great story is worth remembering.</h2></span>
				</span>
			</div>
			<div
				className="chapter out-down"
				ref={chapterRefs.current[3]}
				onWheel={(e) => wheelHandler(e)}
			>
				<span>
					<span
						onTransitionEnd={() => {
							if (textTransitioning === 'out-down') {
								setChapterIndex(() => 2)
								setBackgroundColor(() => '#9C95D6')
								setButtonShadow(() => '1px 2px 7px #877DD8, -1px -2px 7px #BAB7D3')
							} else if (textTransitioning === 'in') {
								setTextTransitioning(() => null)
							}
						}}
					><h2>Subscribe to Andy Mag for updates.</h2></span>
				</span>
			</div>
		</animated.div>
	)
}