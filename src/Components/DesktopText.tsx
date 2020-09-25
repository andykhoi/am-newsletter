import React, { FunctionComponent, useRef, createRef, useEffect, useCallback, useState } from 'react';
import { useDidUpdate } from '../hooks/useDidUpdate';

interface DesktopTextProps {
	setChapterIndex: React.Dispatch<React.SetStateAction<number>>
	chapterIndex: number | null
	wheelThreshold: number
	setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
	setButtonShadow: React.Dispatch<React.SetStateAction<string>>
}

export const DesktopText: FunctionComponent<DesktopTextProps> = ({ chapterIndex, setChapterIndex, wheelThreshold, setBackgroundColor, setButtonShadow }) => {
	let chapterRefs = useRef<React.RefObject<HTMLDivElement>[]>([createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]);
	let [textTransitioning, setTextTransitioning] = useState<'out-down' | 'out-up' | 'in' | null>(null)

	useEffect(() => {
		const {
			current: chapter = null
		} = chapterRefs.current[0]

		chapter?.classList.remove('out-down')
	}, [])

	useDidUpdate(() => {
		if (chapterIndex !== null) {
			const {
				current: chapter = null
			} = chapterRefs.current[chapterIndex]

			chapter?.classList.remove('out-down', 'out-up')
			setTextTransitioning(() => 'in')
		}
	}, [chapterIndex])

	const wheelHandler = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
		const { deltaY } = event;
		if (Math.abs(deltaY) > wheelThreshold) {
			if (chapterIndex !== null) {
				const {
					current: chapter = null
				} = chapterRefs.current[chapterIndex]
				if (deltaY > 0 && chapterIndex < 3) {
					chapter?.classList.add('out-up');
					setTextTransitioning(() => 'out-up')
				} else if (deltaY < 0 && chapterIndex > 0) {
					chapter?.classList.add('out-down');
					setTextTransitioning(() => 'out-down')
				}
			}
		}
	}, [chapterIndex, wheelThreshold])

	return (
		<div className="Text grid">
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
					<span><h2>Andy Mag is an experiential magazine that</h2></span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.06s'}}><h2>enables readers to interact (engage) with diverse</h2></span>
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
								setButtonShadow(() => '1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
							}
						}}
					><h2>themes and ideas.</h2></span>
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
								setButtonShadow(() => '1px 2px 7px 0px #576F6F6F, -1px -2px 7px #A6D3D3D3')
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
							}
						}}
					><h2>Subscribe to Andy Mag for updates.</h2></span>
				</span>
			</div>
		</div>
	)
}