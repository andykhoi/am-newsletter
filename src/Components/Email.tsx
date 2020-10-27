import React, { FunctionComponent, useState } from 'react'
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

	const submitHandler = (e:any) => {
		e.preventDefault();

		// const url = `${process.env.REACT_APP_DEV_SERVER}/subscribe`;
		const url = process.env.REACT_APP_DEV_SERVER + '/subscribe';
		const body = { email }
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(body),
		}

		// will have to include logic that handles specific errors (duplicate emails, failure to fetch, etc.)
		fetch(url, options)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			data.statusCode === 202 ? setSuccess(true) : setSuccess(false);
		})
		.catch(error => console.log(error))
	}

	const emailInputProps = useSpring({
		color: darkMode ? '#FFFFFF' : '#000000',
		borderBottom: darkMode ? '1.5px solid #FFFFFF' : '1.5px solid #000000',
		config: { duration: 130 }
	})

	const submitButtonProps = useSpring({
		background: darkMode ? '#754AAD' : '#EE84FF',
		// boxShadow: darkMode ? 'inset 0px 0px 1px 0px #FFFFFF' : 'inset 0px 0px 2px 1px #FFFFFF',
		boxShadow: darkMode ? '21px 17px 45px rgba(14, 28, 33, .8)' : '8px 8px 24px rgba(176, 195, 210, .8)',
		color: darkMode ? '#FFFFFF' : '#2E476E',
		immediate: key => key === 'boxShadow'
	})

	return (
		// if null do nothing, if false show fail, if true show success
		<form onSubmit={submitHandler} className={success ? 'Email success' : (success === 'false' ? 'Email fail' : 'Email')}>
			<animated.input className={darkMode ? 'darkmode' : ''} style={emailInputProps} type="email" value={email} placeholder='email' onChange={(e:any) => setEmail(e.currentTarget.value)} required />
			<animated.input style={submitButtonProps} type="submit" value="Subscribe"/>
		</form>
	)
}

// what is going on? Requesting data from directmailmac via fetch on the frontend is being blocked
// potentially because I'm requesting from my localhost which is identified as the origin, making a 
// request from the localhost to directmail is defined as a cross-origin request,

// Wrong, for now, -- the preflight OPTIONS request that the browser sends to the server is returning with a 
// 401. This may be a bug on their server configs. However, if it is the case I still don't know if 
// a cross-origin request from localhost is allowed/will work. Even then, I shouldn't be exposing the 
// API key to the frontend. So I will have to create a server folder and configure a quick server to
// request to from the app, which then will post request to the API, responding to the frontend with a success -- 
// allowing the component to make necessary changes to styling.