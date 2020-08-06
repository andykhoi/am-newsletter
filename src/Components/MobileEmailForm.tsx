import React, { FunctionComponent } from 'react';
import { useSpring, animated } from 'react-spring';

interface MobileEmailFormProps {
	props?: any,
	emailVisible: Boolean,
	sphereState: {
		hold: Boolean;
		direction: null | 'forwards' | 'backwards';
		// position: [number, number, number] | null;
	},
}

export const MobileEmailForm: FunctionComponent<MobileEmailFormProps> = ({ sphereState, emailVisible }) => {
	const animationProps = useSpring({
		config: { mass: 1, friction: 4, clamp: true },
		opacity: !emailVisible ? 0 : 1,
	})

	return (
		<animated.div className="MobileEmailForm" style={animationProps} />
	)
}