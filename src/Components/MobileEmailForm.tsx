import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';
import { Email } from './Email';

interface MobileEmailFormProps {
	props?: any,
	emailVisible: Boolean,
	darkMode: Boolean,
	setDarkMode: React.Dispatch<React.SetStateAction<Boolean>>,
	sphereState: {
		hold: Boolean;
		direction: null | 'forwards' | 'backwards';
		// position: [number, number, number] | null;
	},
}

export const MobileEmailForm: FunctionComponent<MobileEmailFormProps> = ({ sphereState, emailVisible, darkMode, setDarkMode }) => {
	const animationProps = useSpring({
		config: { mass: 1, friction: 20, clamp: true },
		opacity: !emailVisible ? 0 : 1,
		bottom: !emailVisible ? -6 : 0,
		backgroundColor: darkMode ? '#000B23' : '#F4F4F4',
		immediate: key => ['backgroundColor'].includes(key)
	})

	const textProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#000000',
		config: { duration: 130 }
	})

	const buttonProps = useSpring({
		border: darkMode ? '2px solid #FFFFFF' : '2px solid #000000',
		color: darkMode ? '#FFFFFF' : '#000000',
		config: { duration: 130 }
	})

	return (
		<animated.div className="MobileEmailForm" style={animationProps}>
			<animated.p style={textProps}>STAY UPDATED</animated.p>
			<Email darkMode={darkMode} />
			<animated.button style={buttonProps} className="mode-switch" onClick={() => setDarkMode(() => !darkMode)}>
				{ darkMode ? 'L' : 'D'}
			</animated.button>
		</animated.div>
	)
}