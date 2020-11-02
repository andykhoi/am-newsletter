import { resolveTxt } from 'dns';
import React, { FunctionComponent, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring';

// email form should add email to mailing list on directmailmac 
// on success there should be some indication on the frontend -- turns green with a success message
// on failure there should be some indication on the frontend -- turns red with an error message

// make an api call to directmailmac with the email address
interface EmailProps {
	darkMode: Boolean,
}

export const Email: FunctionComponent<EmailProps> = ({ darkMode }) => {
	let [success, setSuccess] = useState<Boolean | null>(null);
	let [email, setEmail] = useState<string | undefined>('')
	let [message, setMessage] = useState<string | null>(null)
	let [processing, setProcessing] = useState<boolean>(false);

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
		color: darkMode ? '#FFFFFF' : '#000000',
		borderBottom: darkMode ? '1.5px solid #FFFFFF' : '1.5px solid #000000',
		config: { duration: 130 }
	})

	const submitButtonProps = useSpring({
		background: success ? '#61F04A' : darkMode ? '#754AAD' : '#EE84FF',
		boxShadow: darkMode ? '21px 17px 45px rgba(14, 28, 33, .8)' : '5px 5px 30px rgba(176, 195, 210, .8)',
		color: success ? '#000000' : darkMode ? '#FFFFFF' : '#2E476E',
		immediate: key => key === 'boxShadow'
	})

	return (
		// if null do nothing, if false show fail, if true show success
		<form ref={formRef} onSubmit={submitHandler} className={ darkMode ? 'Email darkmode' : 'Email'}>
			<animated.input
				className={darkMode ? 'darkmode' : ''}
				style={emailInputProps} name="Email"
				type="email"
				value={email}
				placeholder='email'
				onChange={(e:any) => setEmail(e.currentTarget.value)}
				onFocus={() => {
					reset();
				}}
				required
			/>
			<div className="submitWrapper">
				<animated.input style={submitButtonProps} type="submit" value={success ? 'Subscribed' : processing ? '' : 'Subscribe'} />
				{processing && <div className="dot-wrap"><div className="dot-flashing"></div></div> }
				{/* <div className="dot-wrap"><div className="dot-flashing"></div></div> */}
			</div>
			{success === false && <p className="error">{message}</p> }
		</form>
	)
}

// on focus -- clear message? 
