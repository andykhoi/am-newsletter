import React, {
	FunctionComponent,
	useRef,
	useState,
	useContext
} from 'react';
import { useSpring, animated } from 'react-spring';
import { Email } from './Email';
import { ViewportContext } from '../context/viewportContext'

interface MobileEmailFormProps {
	props?: any,
	emailVisible: Boolean,
	darkMode: Boolean,
	setDarkMode: React.Dispatch<React.SetStateAction<Boolean>>,
	// setInstructionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
	// instructionsVisible: boolean,
	sphereState: {
		hold: Boolean;
		direction: null | 'forwards' | 'backwards';
		// position: [number, number, number] | null;
	},
}

export const MobileEmailForm: FunctionComponent<MobileEmailFormProps> = ({ sphereState, emailVisible, darkMode, setDarkMode }) => {
	let [indicatorPosition, setIndicatorPosition] = useState<number>(0)
	let emailWrap = useRef<HTMLDivElement>(null);

	const { currentDeviceWidth } = useContext(ViewportContext);

	const animationProps = useSpring({
		// config: { mass: 1, friction: 8, clamp: true },
		config: { duration: 150 },
		opacity: !emailVisible ? 0 : 1,
		bottom: !emailVisible ? -6 : 0,
		background: darkMode ? '#2E3138' : '#F9FAFC',
		// borderImage: darkMode ? 'linear-gradient(to top, #26282C, 70%, #363940) 1 0%' : 'linear-gradient(to right, #FFFFFF, #E5EFFA) 1 0%',
		boxShadow: darkMode ? '0px 4px 13px rgba(29, 30, 35, .9)' : '0px 14px 18px rgba(31, 36, 39, .75)',
		immediate: key => ['background', 'boxShadow'].includes(key),
		// onRest: ({ opacity }) => {
		// 	!instructionsVisible && setInstructionsVisible((prev) => {
		// 		if (opacity === 1 && sphereState.direction === "backwards") {
		// 			return true
		// 		}
		// 		return prev
		// 	})
		// }
	})

	const textProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#334669',
		config: { duration: 130 }
	})

	const buttonProps = useSpring({
		// border: darkMode ? '2px solid #FFFFFF' : '2px solid #000000',
		background: darkMode ? '#2C3036' : '#E6EEF8',
		color: darkMode ? '#FFFFFF' : '#000000',
		boxShadow: !darkMode ? '-4px -2px 10px rgba(255, 255, 255, 1), 4px 2px 18px rgba(170, 187, 201, 0.9)' : '-2px -1px 7px rgba(72, 78, 83, 0.75), 3px 1px 7px rgba(22, 26, 28, 0.9)',
		config: { duration: 130 },
		immediate: key => ['background', 'boxShadow'].includes(key)
	})

	const scrollHandler = () => {
		setIndicatorPosition((prev) => {
			if (emailWrap.current) {
				// position of right over deviceWidth will determine left position of indicator 1 -> 0, 0 -> 20
				const ratio = emailWrap.current.getBoundingClientRect().right / currentDeviceWidth;
				const position = Math.abs(ratio * 14 - 14);
				return position
			}
			return prev
		})
	}

	return (
		<animated.div
			className={`MobileEmailForm${darkMode ? ' darkMode' : ''}`}
			style={animationProps}
			onScroll={scrollHandler}
		>
			<div className="EmailScrollWrap" ref={emailWrap}>
				
				<animated.h5 style={textProps}>Stay Updated</animated.h5>
				<Email darkMode={darkMode} />
			</div>
			<div className="SocialMedia">
				<div className="wrap">
					<a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/theandymag/">
						<div className="Instagram">
							{/* <img src="../assets/insta_mob.svg" alt="Instagram Icon" /> */}
							<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
									<g id="iconfinder_social_media_social_media_logo_instagram_1907115" transform="translate(1.000000, 1.000000)" stroke={ darkMode ? '#FFFFFF' : '#334669' } stroke-width="1.7">
										<rect id="_Path_" x="0.5" y="0.5" width="21" height="21" rx="5.48"></rect>
										<circle id="_Path_2" cx="11" cy="11" r="5.5"></circle>
										<circle id="_Path_3" cx="17" cy="4" r="1"></circle>
									</g>
								</g>
							</svg>
						</div>
					</a>
					<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/theandymag_">
						<div className="Twitter">
							<svg width="26px" height="22px" viewBox="0 0 26 22" version="1.1">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
									<g id="iconfinder_social_media_social_media_logo_twitter_1907088" transform="translate(1.000000, 1.000000)" stroke={ darkMode ? '#FFFFFF' : '#334669' } stroke-width="1.7">
										<path d="M2,1.5 C4.46412296,4.52103589 8.10469752,6.34132317 12,6.5 C11.74,5.44 11.72,2.56 13.74,1.36 C14.5611589,0.820204201 15.5175598,0.522195237 16.5,0.5 C17.7960362,0.502936929 19.0320411,1.04663408 19.91,2 C20.9625082,1.77597167 21.9743241,1.39148161 22.91,0.86 C22.5815299,1.93319032 21.8696286,2.8479836 20.91,3.43 C21.8257755,3.35075883 22.7234001,3.12803993 23.57,2.77 C22.932796,3.71942235 22.1259711,4.54319732 21.19,5.2 C21.9,11.57 16.19,19.49 8.07,19.49 C5.43633866,19.5044043 2.84679132,18.8138583 0.57,17.49 C3.07816554,17.8022519 5.60538878,17.0801882 7.57,15.49 C5.37621226,15.3608781 3.44221638,14.007081 2.57,11.99 C3.57,12.31 4.52,12.47 5.07,11.99 C2.76336164,11.4030668 1.11127727,9.37753832 1,7 C1.6672614,7.65242084 2.5668653,8.0122624 3.5,8 C1.41649739,6.53226244 0.770354561,3.73231019 2,1.5 Z" id="_Path_"></path>
									</g>
								</g>
							</svg>
							{/* <img src="../assets/twit_mob.svg" alt="Twitter Icon" /> */}
						</div>
					</a>
					<a target="_blank" rel="noopener noreferrer" href="https://www.snapchat.com/add/theandymag">
						<div className="Snapchat">
							<svg width="26px" height="24px" viewBox="0 0 26 24" version="1.1">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
									<g id="iconfinder_social_media_social_media_logo_snapchat_1907098" transform="translate(1.000000, 1.000000)" stroke={ darkMode ? '#FFFFFF' : '#334669' } stroke-width="1.7">
										<path d="M18.25,12.14 L20.44,10.43 C20.7705691,10.1693447 20.9024997,9.72957596 20.77,9.33 L20.77,9.33 C20.6134239,8.85587688 20.1311127,8.56990472 19.64,8.66 L18.1,9 C17.9370051,9.02973077 17.7698674,8.97678796 17.6537166,8.85863452 C17.5375658,8.74048109 17.4874875,8.57246288 17.52,8.41 C18.28,3.73 15.84,0.5 12,0.5 C8.16,0.5 5.71,3.73 6.48,8.37 C6.5291022,8.5382089 6.48656515,8.71984747 6.36788078,8.84876325 C6.2491964,8.97767903 6.07168655,9.03505693 5.9,9 L4.36,8.67 C3.8683085,8.57329094 3.38095762,8.85544145 3.22,9.33 L3.22,9.33 C3.08750029,9.72957596 3.21943091,10.1693447 3.55,10.43 L5.75,12.14 C5.93253185,12.28138 5.99452574,12.5293556 5.9,12.74 C4.84270267,14.9082818 2.8548371,16.4764869 0.5,17 C0.63,18.69 3.5,17.38 4,18 C4.31261438,18.4389037 4.48674926,18.9613084 4.5,19.5 L6.5,19.5 C8,19.5 9.81,21.5 12,21.5 C14.19,21.5 16,19.5 17.5,19.5 L19.5,19.5 C19.5132507,18.9613084 19.6873856,18.4389037 20,18 C20.5,17.38 23.38,18.69 23.5,17 C21.1414197,16.4792424 19.1493954,14.9106613 18.09,12.74 C17.9976275,12.5271043 18.0638865,12.2786328 18.25,12.14 Z" id="_Path_"></path>
									</g>
								</g>
							</svg>
							{/* <img src="../assets/snap_mob.svg" alt="Snapchat Icon" /> */}
						</div>
					</a>
					<a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/playlist/4FwbDv3IN0IeKszud1U0OC?si=dYtV_c9aQC2Fl2UBAUI4ww">
						<div className="Spotify">
							<svg width="26px" height="26px" viewBox="0 0 26 26" version="1.1">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
									<g id="iconfinder_social_media_social_media_logo_spotify_1907096" transform="translate(1.000000, 1.000000)" stroke={ darkMode ? '#FFFFFF' : '#334669' } stroke-width="1.7">
										<circle id="_Path_" cx="12" cy="12" r="11.5"></circle>
										<path d="M5.5,15.5 C8.92,14.67 13.84,14.78 17,17" id="_Path_2"></path>
										<path d="M5,12 C10.77,11 15,11.47 18.5,14" id="_Path_3"></path>
										<path d="M4.5,8.5 C9.19,6.84 15.81,7.16 20,10" id="_Path_4"></path>
									</g>
								</g>
							</svg>
							{/* <img src="../assets/spotify_mob.svg" alt="Spotify Icon" /> */}
						</div>
					</a>
				</div>
			</div>
			<animated.button style={buttonProps} className="mode-switch" onClick={() => setDarkMode(() => !darkMode)}>
				{ darkMode ? 'L' : 'D'}
			</animated.button>
			<div className="Dots">
				<div className="wrap">
					<div className="indicator" style={{
						background: darkMode ? '#754AAD' : '#EE84FF',
						left: indicatorPosition
					}}/>
					<div className="page" style={{
						background: darkMode ? '#656565' : '#C4C4C4'
					}}/>
					<div className="page" style={{
						background: darkMode ? '#656565' : '#C4C4C4'
					}}/>
				</div>
			</div>
		</animated.div>
	)
}