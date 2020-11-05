import React, {
	FunctionComponent,
	useRef,
	useState,
	useContext,
} from 'react'
import { useSpring, animated } from 'react-spring';

import { ViewportContext } from '../context/viewportContext';

interface EmailProps {
	darkMode: Boolean,
}

export const Email: FunctionComponent<EmailProps> = ({ darkMode }) => {
	let [success, setSuccess] = useState<Boolean | null>(null);
	let [email, setEmail] = useState<string>('')
	let [message, setMessage] = useState<string | null>(null)
	let [processing, setProcessing] = useState<boolean>(false);
	const { lockViewport, unlockViewport, currentDeviceHeight, lockedViewportHeight, lockedViewportWidth } = useContext(ViewportContext);

	// let [lockedViewport, setLockedViewport] = useState<any>(null)

	const reset = () => {
		setMessage(() => null);
		setSuccess(() => null);
		setProcessing(() => false);
	}

	const formRef = useRef<HTMLFormElement>(null);
	const submitHandler = (e:any) => {
		// do nothing if successs
		e.preventDefault();
		if (!success && !processing) {
			// unlockViewport();
			reset();
			const url = process.env.REACT_APP_EMAIL_URL ? process.env.REACT_APP_EMAIL_URL : null;
			// const body = { email };
			const options: any = {
				method: 'POST',
				// mode: 'no-cors',
				// headers: {
				// 	'Content-Type': 'application/json; charset=utf-8',
				// },
				body: formRef.current ? new FormData(formRef.current) : null,
			}
	
			if (url && !processing) {
				setProcessing(() => true);
				fetch(url, options)
				.then(res => {
					return res.json()
				})
				.then(data => {
					if (data.result === 'success') {
						setSuccess(() => true);
						setMessage(() => data.message);
					} else if (data.result === 'error') {
						setSuccess(() => false);
						setMessage(() => data.error);
					}
					setProcessing(() => false);
				})
				.catch(error => {
					setSuccess(() => false);
					setMessage(() => 'An error occurred please try again.')
					setProcessing(() => false);
					// console.log(error)
				})
			}
		}
	}

	const emailInputProps = useSpring({
		color: darkMode ? email.length > 0 ? '#FFFFFF' : '#464950' : email.length > 0 ? '#334669' : '#D8DCE6',
		borderBottom: darkMode ?  email.length > 0 ? '2px solid #FFFFFF' : '2px solid #464950' : email.length > 0 ? '2px solid #334669' : '2px solid #D8DCE6',
		config: { duration: 0 },
		// immediate: (key) => key === 'color'
	})

	const submitButtonProps = useSpring({
		background: success ? '#68ec52' : darkMode ? '#754AAD' : '#EE84FF',
		boxShadow: darkMode ? '21px 17px 45px rgba(14, 28, 33, .8)' : '5px 6px 25px rgba(176, 195, 210, .8)',
		color: success ? '#000000' : darkMode ? '#FFFFFF' : '#2E476E',
		immediate: key => key === 'boxShadow'
	})

	return (
		// if null do nothing, if false show fail, if true show success
		<form ref={formRef} onSubmit={submitHandler} className={ darkMode ? 'Email darkmode' : 'Email'}>
			<animated.input
				style={emailInputProps} name="Email"
				type="email"
				value={email}
				placeholder='email'
				onChange={(e:any) => setEmail(e.currentTarget.value)}
				onFocus={() => {
					reset();
					if (!lockedViewportHeight && !lockedViewportWidth) {
						lockViewport();
					}
				}}
				onBlur={() => {
					if (currentDeviceHeight === lockedViewportHeight) {
						unlockViewport();
					}
					
				}}
				required
			/>
			<div className="submitWrapper">
				<animated.input style={submitButtonProps} type="submit" value={success ? 'Subscribed' : processing ? '' : 'Subscribe'} />
				{processing && <div className="dot-wrap"><div className="dot-flashing"></div></div> }
			</div>
			{success === false && <p className="error">{message}</p> }
		</form>
	)
}
