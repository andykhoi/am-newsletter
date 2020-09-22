import React, { FunctionComponent, useState, useRef, createRef, useCallback, useEffect } from 'react';
// import { useSpring, animated } from 'react-spring';

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
	let [ chapterIndex, setChapterIndex ] = useState<number | null>(0);
	let [wheelDirection, setWheelDirection] = useState<'up' | 'down' | null>(null)
	
	let chapterRefs = useRef<React.RefObject<HTMLDivElement>[]>([createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]);
	let wheelThreshold = useRef<number>(80);
	
	const wheelHandler = useCallback((event: React.WheelEvent<HTMLDivElement>, previous: number | null, next: number | null) => {
		// set wheel direction and chapterindex

		const { deltaY } = event;
		let direction: 'up' | 'down' | null = null;
		// deltaY < 0 ? direction = 'down' : direction = 'up';
		if (deltaY < 0) {
			direction = 'down'
		} else if (deltaY > 0) {
			direction = 'up'
		}

		if (Math.abs(deltaY) > wheelThreshold.current) {
			setChapterIndex(() => chapterIndex)
			setWheelDirection(() => direction)
		}
	}, [])

	useEffect(() => {
		if (chapterIndex !== null && wheelDirection !== null) {
			if (wheelDirection === 'up') {
				chapterRefs.current[chapterIndex].current?.classList.add('out-up')
			} else if (wheelDirection === 'down') {
				chapterRefs.current[chapterIndex].current?.classList.add('out-down')
			}
		}
	}, [chapterIndex, wheelDirection])

	//stack and overflow all text -- default is overflown down -- stages is shown, transition up, transition down -- 
	return (
		<div className="DesktopAnimation">
			<div className="Text grid">
				<div
					className="chapter"
					onWheel={(e) => wheelHandler(e, null, 1)}
					ref={chapterRefs.current[0]}
				>
					<span>
						<span><h2>The most damaging phrase in language is 'It's</h2></span>
					</span>
					<span>
						<span style={{ transitionDelay: '0.06s'}}><h2>always been done that way'</h2></span>
					</span>
					<span className="spacer-top-1">
						<span style={{ transitionDelay: '0.1s'}}><h2>- Admiral Grace Hopper</h2></span>
					</span>
				</div>
				<div
					className="chapter"
					onWheel={(e) => wheelHandler(e, 0, 2)}
					ref={chapterRefs.current[1]}
				>
					<span>
						<span>Andy Mag is an experiential magazine that</span>
					</span>
					<span>
						<span>enables readers to interact (engage) with diverse</span>
					</span>
					<span>
						<span>themes and ideas.</span>
					</span>
				</div>
				<div
					className="chapter"
					onWheel={(e) => wheelHandler(e, 1, 3)}
					ref={chapterRefs.current[2]}
				>
					<span>
						<span>Because a great story is worth remembering.</span>
					</span>
				</div>
				<div
					className="chapter"
					onWheel={(e) => wheelHandler(e, 2, null)}
					ref={chapterRefs.current[3]}
				>
					<span>
						<span>Subscribe to Andy Mag for updates.</span>
					</span>
				</div>
			</div>
		</div>
	)
}