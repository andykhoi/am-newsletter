import React, { FunctionComponent, useState } from 'react'

// email form should add email to mailing list on directmailmac 
// on success there should be some indication on the frontend -- turns green with a success message
// on failure there should be some indication on the frontend -- turns red with an error message

// make an api call to directmailmac with the email address

export const Email: FunctionComponent = () => {
	// let [success, setSuccess] = useState<Boolean | null>(null);
	let [email, setEmail] = useState<string | undefined>('')

	const submitHandler = (e:any) => {
		// this should create a request to the directmailmac api
		// on success should create a message 'success' on failure should 'fail'
		e.preventDefault();

		const url = 'http://localhost:3000/subscribe';
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ email }),
		}

		fetch(url, options).then(res => res.json()).then(data => console.log(data));
	}

	return (
		<form onSubmit={submitHandler}>
			<input type="email" value={email} onChange={(e:any) => setEmail(e.currentTarget.value)} required />
			<input type="submit"/>
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