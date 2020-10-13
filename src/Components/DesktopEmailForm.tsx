import React, { FunctionComponent, useState } from 'react';

// import { Email } from './Email';

// export const DesktopEmail: FunctionComponent = () => {
// 	// return <Email darkMode={false} />
// }

// interface EmailProps {
// 	darkMode: Boolean,
// }

export const Email: FunctionComponent = () => {
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

	return (
		<form onSubmit={submitHandler} className={success ? 'Email success' : (success === 'false' ? 'Email fail' : 'Email')}>
			<input type="email" value={email} placeholder='email' onChange={(e:any) => setEmail(e.currentTarget.value)} required />
			{/* <input type="submit" value="SUBSCRIBE"/> */}
		</form>
	)
}