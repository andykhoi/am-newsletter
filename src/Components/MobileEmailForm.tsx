import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
import { Email } from './Email';

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
		color: darkMode ? '#FFFFFF' : '#000000',
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

	return (
		<animated.div className="MobileEmailForm" style={animationProps}>
			<animated.p style={textProps}>Stay Updated</animated.p>
			<Email darkMode={darkMode} />
			<animated.button style={buttonProps} className="mode-switch" onClick={() => setDarkMode(() => !darkMode)}>
				{ darkMode ? 'L' : 'D'}
			</animated.button>
		</animated.div>
	)
}