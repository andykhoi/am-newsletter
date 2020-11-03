import React, {
	FunctionComponent,
	PointerEvent,
	// TouchEvent,
	// useCallback,
	useEffect,
	useRef,
	useState
} from 'react';

// controlling overflowed span components
// on chapter change -- animate to next 

// const isElementAtBottom = (e: HTMLDivElement) => {
// 	return e.scrollTop === (e.scrollHeight - e.offsetHeight);
// }

interface ColorShowProps {
	chapterIndex: number,
	colorShowActive: boolean,
	setColorShowActive: React.Dispatch<React.SetStateAction<boolean>>
	setChapterIndex: React.Dispatch<React.SetStateAction<number>>
	setSphereState: React.Dispatch<React.SetStateAction<{
		hold: boolean;
		direction: null | 'forwards' | 'backwards';
		mountAnimating: boolean;
	}>>
	darkMode: Boolean
}

export const ColorShow: FunctionComponent<ColorShowProps> = ({
	chapterIndex,
	colorShowActive,
	setColorShowActive,
	setChapterIndex,
	setSphereState,
	darkMode
}) => {
	const container = useRef<HTMLDivElement>(null);
	// let [preventTouch, setPreventTouch] = useState<boolean>(false);
	let [transitioning, setTransitioning] = useState<boolean>(false);
	let [initialized, setInitialized] = useState<boolean>(false);
	let [pointerState, setPointerState] = useState<any>({
		xStart: null,
		yStart: null,
		yTravel: null,
		xTravel: null,
	})
	// console.log(container.current ? isElementAtBottom(container.current) : null)
	const backgroundColors = useRef<any>({
		lightMode: ['#E4F0FA', '#D64773', '#CBCBCB', '#000000'],
		darkMode: ['#000000', '#D64773', '#E4F0FA', '#F9FAFC']
	})

	const arrowColors = useRef<any>({
		lightMode: ['#6E81A0', '#FFFFFF', '#D64773', '#CBCBCB'],
		darkMode: ['#6E81A0', '#000000', '#D64773', '#009CDF']
	})

	let [backgroundColor, setBackgroundColor] = useState<string>(backgroundColors.current.lightMode[chapterIndex]);
	let [arrowColor, setArrowColor] = useState<string>(arrowColors.current.lightMode[chapterIndex])

	const getActiveSlideIndex = (): number => {
		if (container.current) {
			let active = -1;
			const slides = container.current.children;
			for (let i = 0; i < slides.length; i++) {
				if (!slides[i].classList.contains('out-down') && !slides[i].classList.contains('out-up')) {
					active = i
					break;
				}
			}
			return active
		}
		return -1
	}

	const pointerDownHandler = (e: PointerEvent) => {
		const {
			clientX,
			clientY,
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
			clientY,
		} = e
		setPointerState((prev: any) => {
			const yTravel = prev.yStart ? prev.yStart - clientY : null;
			const xTravel = prev.xStart ? clientX - prev.xStart : null;
			return { ...prev, yTravel, xTravel }
		})
	}

	// const pointerDownHandler = (e: TouchEvent) => {
	// 	const {
	// 		touches
	// 	} = e
	// 	const {
	// 		clientY,
	// 		clientX
	// 	} = touches[0]
	// 	setPointerState((prev: any) => {
	// 		const updated = {
	// 			xStart: clientX,
	// 			yStart: clientY,
	// 		}
	// 		return { ...prev, ...updated}
	// 	})
	// }

	// const pointerMoveHandler = (e: TouchEvent) => {
	// 	const {
	// 		touches
	// 	} = e
	// 	const {
	// 		clientY,
	// 		clientX
	// 	} = touches[0]
	// 	setPointerState((prev: any) => {
	// 		const yTravel = prev.yStart ? prev.yStart - clientY : null;
	// 		const xTravel = prev.xStart ? clientX - prev.xStart : null;
	// 		return { ...prev, yTravel, xTravel }
	// 	})
	// }

	const pointerUpHandler = () => {
		setPointerState(() => ({
			xTravel: null,
			yTravel: null,
			xStart: null,
			yStart: null,
		}))
	}

	// const resizeHandler = () => {
	// 	setPreventTouch((prev) => {
	// 		if (container.current) {
	// 			if (container.current.clientHeight === window.innerHeight) {
	// 				return true
	// 			} else {
	// 				return false
	// 			}
	// 		}
	// 		return prev
	// 	})
	// }

	useEffect(() => {
		const next = () => {
			if (container.current) {
				const active = getActiveSlideIndex();
				if (active >= 0 && active < container.current.children.length - 2) {
					setTransitioning(() => true);
					const activeSlide = container.current.children[active]
					const activeSlideLastSpan = activeSlide.children[activeSlide.children.length - 1];
					const activeSlideTransitionTarget = activeSlideLastSpan.children[0];
					
					const nextSlide = container.current.children[chapterIndex];
					const nextSlideLastSpan = nextSlide.children[nextSlide.children.length - 1];
					const nextSlideTransitionTarget = nextSlideLastSpan.children[0]
					
					// Because of transitionDelay
					const activeCb = () => {
						// change background color -- account for dark mode
						nextSlide.classList.remove('out-down');
						setBackgroundColor((prev) => {
							if (darkMode) {
								return backgroundColors.current.darkMode[chapterIndex]
							} else {
								return backgroundColors.current.lightMode[chapterIndex]
							}
						})
						setArrowColor(() => {
							if (darkMode) {
								return arrowColors.current.darkMode[chapterIndex]
							} else {
								return arrowColors.current.lightMode[chapterIndex]
							}
						})
						activeSlideTransitionTarget.removeEventListener('transitionend', activeCb);
					}
					activeSlideTransitionTarget.addEventListener('transitionend', activeCb);

					const nextCb = () => {
						setTransitioning(() => false);
						nextSlideTransitionTarget.removeEventListener('transitionend', nextCb);
					}
					nextSlideTransitionTarget.addEventListener('transitionend', nextCb);
					
					activeSlide.classList.add('out-up');
				}
			}
		}

		const back = () => {
			if (container.current) {
				const active = getActiveSlideIndex();
				if (active > 0) {
					setTransitioning(() => true);
					const activeSlide = container.current.children[active]
					const activeSlideLastSpan = activeSlide.children[activeSlide.children.length - 1];
					const activeSlideTransitionTarget = activeSlideLastSpan.children[0];
					
					const nextSlide = container.current.children[chapterIndex];
					const nextSlideLastSpan = nextSlide.children[nextSlide.children.length - 1];
					const nextSlideTransitionTarget = nextSlideLastSpan.children[0]
					
					// Because of transitionDelay
					const activeCb = () => {
						nextSlide.classList.remove('out-up');
						setBackgroundColor((prev) => {
							if (darkMode) {
								return backgroundColors.current.darkMode[chapterIndex]
							} else {
								return backgroundColors.current.lightMode[chapterIndex]
							}
						})
						setArrowColor(() => {
							if (darkMode) {
								return arrowColors.current.darkMode[chapterIndex]
							} else {
								return arrowColors.current.lightMode[chapterIndex]
							}
						})
						activeSlideTransitionTarget.removeEventListener('transitionend', activeCb);
					}
					activeSlideTransitionTarget.addEventListener('transitionend', activeCb);

					const nextCb = () => {
						setTransitioning(() => false);
						nextSlideTransitionTarget.removeEventListener('transitionend', nextCb);
					}
					nextSlideTransitionTarget.addEventListener('transitionend', nextCb);
					
					activeSlide.classList.add('out-down');
				}
			}
		}

		if (chapterIndex >= 0 && colorShowActive && initialized) {
			// setPreventTouch((prev) => {
			// 	if (container.current) {
			// 		// console.
			// 		if (container.current.clientHeight === window.innerHeight) {
			// 			return true
			// 		} else {
			// 			return false
			// 		}
			// 	}
			// 	return prev
			// })
			if (getActiveSlideIndex() < chapterIndex) {
				next();
				// setPreventTouch(() => true)
			} else if (getActiveSlideIndex() > chapterIndex) {
				back();
			}
		}
	}, [chapterIndex, colorShowActive, initialized, darkMode])

	useEffect(() => {
		if (darkMode && !initialized) {
			setBackgroundColor(() => backgroundColors.current.darkMode[0])
		} else if (!darkMode && !initialized) {
			setBackgroundColor(() => backgroundColors.current.lightMode[0])
		}
	}, [darkMode, initialized])

	// useEffect(() => {
	// 	window.addEventListener('resize', resizeHandler);
	// 	return () => window.removeEventListener('resize', resizeHandler);
	// }, [])
	
	useEffect(() => {
		const reset = () => {
			if (container.current) {
				// console.log(colorShowActive);
				setTransitioning(() => true);
				const active = getActiveSlideIndex();
				const activeSlide = container.current.children[active]
				const activeSlideLastSpan = activeSlide.children[activeSlide.children.length - 1];
				const activeSlideTransitionTarget = activeSlideLastSpan.children[0];

				let containerCb = () => {
					if (container.current) {
						setSphereState(prev => {
							const updated: any = {
								hold: false,
								direction: "backwards",
								mountAnimating: prev.mountAnimating
							}
							return updated
						})
						setTimeout(() => {
							if (container.current) {
								for (let i = 0; i < container.current.children.length - 1; i++) {
									container.current.children[i].classList.remove('out-up');
									container.current.children[i].classList.add('out-down');
								}
								setChapterIndex(() => 0)
								setBackgroundColor((prev) => {
									if (darkMode) {
										return backgroundColors.current.darkMode[0]
									} else {
										return backgroundColors.current.lightMode[0]
									}
								})
								setArrowColor(() => {
									if (darkMode) {
										return arrowColors.current.darkMode[0]
									} else {
										return arrowColors.current.lightMode[0]
									}
								})
								// setPreventTouch(() => false)
								setInitialized(() => false);
							}
						}, 1000)
						container.current.removeEventListener('transitionend', containerCb);
					}
				}
				container.current.addEventListener('transitionend', containerCb);

				let activeCb = () => {
					if (container.current) {	
						setTransitioning(() => false);
						container.current.classList.remove('active');
						activeSlideTransitionTarget.removeEventListener('transitionend', activeCb);
					}
				}
				activeSlideTransitionTarget.addEventListener('transitionend', activeCb);

				if (active === 0) {
					activeSlide.classList.add('out-down');
				} else {
					activeSlide.classList.add('out-up');
				}
			}
		}
	
		const init = () => {
			if (container.current) {
				container.current.classList.add('active');
				container.current.children[0].classList.remove('out-down');
				setInitialized(() => true);
			}
		}

		if (colorShowActive && !initialized) {
			console.log('init')
			init();
		} else if (!colorShowActive && initialized) {
			reset();
		}
	}, [colorShowActive, initialized, setSphereState, setChapterIndex, darkMode])

	useEffect(() => {
		if (pointerState.yTravel > 0 && pointerState.yTravel >= 100) {
			setChapterIndex(prev => {
				if (container.current) {
					if (prev < container.current.children.length - 2 && !transitioning) {
						return prev + 1
					} else if (prev === container.current.children.length -  2) {
						setColorShowActive(() => false)
					}
				}
				return prev
			})
			setPointerState(() => ({
				xTravel: null,
				yTravel: null,
				xStart: null,
				yStart: null,
			}))
		} else if (pointerState.yTravel < 0 && pointerState.yTravel <= -100) {
			setChapterIndex(prev => {
				if (container.current && !transitioning) {
					if (prev > 0) {
						return prev - 1
					} else if (prev === 0) {
						setColorShowActive(() => false)
					}
				}
				return prev
			})
			setPointerState(() => ({
				xTravel: null,
				yTravel: null,
				xStart: null,
				yStart: null,
			}))
		}
	}, [pointerState, setChapterIndex, transitioning, setColorShowActive])

	return (
		<div
			className="ColorShow grid"
			ref={container}
			onPointerDown={(e: PointerEvent) => pointerDownHandler(e)}
			onPointerMove={(e: PointerEvent) => pointerMoveHandler(e)}
			onPointerUp={() => pointerUpHandler()}
			// onTouchStart={(e: TouchEvent) => pointerDownHandler(e)}
			// onTouchMove={(e: TouchEvent) => pointerMoveHandler(e)}
			// onTouchEnd={() => pointerUpHandler()}
			style={{
				background: backgroundColor,
				// touchAction: preventTouch ? 'none' : 'auto'
			}}
		>
			<div className="ColorShowText out-down" style={{ color: darkMode ? '#E066DB' : '#334669'}}>
				<span>
					<span>
						<h4>The most dangerous phrase</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.05s'}}>
						<h4>in language is 'It's always</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.1s'}}>
						<h4>been done that way'"</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.15s'}}>
						<p style={{ color: darkMode ? '#FFFFFF' : '#334669'}}>Admiral Grace Hopper</p>
					</span>
				</span>
			</div>
			<div className="ColorShowText out-down" style={{ color: darkMode ? '#000000' : '#FFFFFF'}}>
				<span>
					<span>
						<h4>Andy Mag is an experiential</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.05s'}}>
						<h4>magazine that enables</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.1s'}}>
						<h4>readers to interact (engage)</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.15s'}}>
						<h4>with diverse themes and </h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.2s'}}>
						<h4>ideas.</h4>
					</span>
				</span>
			</div>
			<div className="ColorShowText out-down" style={{ color: '#D64773'}}>
				<span>
					<span>
						<h4>Because a great story is</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.05s'}}>
						<h4>worth remembering.</h4>
					</span>
				</span>
			</div>
			<div className="ColorShowText out-down" style={{ color: darkMode ? '#009CDF' : '#CBCBCB'}}>
				<span>
					<span>
						<h4>Subscribe to Andy Mag for</h4>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.05s'}}>
					<h4>updates.</h4>
					</span>
				</span>
			</div>
			<div
				className="Arrows"
				style={{ opacity: colorShowActive ? 1 : 0 }}
			>
				<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z" fill={arrowColor}/>
				</svg>
				<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M11.3691 6.74592C11.757 6.35382 11.7536 5.72383 11.3615 5.33594L6.74686 0.770747C6.35477 0.382855 5.72478 0.386251 5.33688 0.778347L0.771692 5.39302C0.3838 5.78512 0.387195 6.41511 0.779292 6.803C1.17139 7.19089 1.80138 7.1875 2.18927 6.7954L6.0583 2.89449L9.95916 6.75352C10.3513 7.14141 10.9912 7.12796 11.3691 6.74592Z" fill={arrowColor} />
				</svg>
			</div>
		</div>
	)
}