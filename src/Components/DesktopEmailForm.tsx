import
	React,
	{
		FunctionComponent,
		useState,
		useRef, useEffect
	}
from 'react';
import { useSpring, animated } from 'react-spring';

interface DesktopEmailProps {
	emailActive: boolean
	orbHold: boolean
}

export const Email: FunctionComponent<DesktopEmailProps> = ({
	emailActive,
	orbHold
}) => {
	let [success, setSuccess] = useState<Boolean | null>(null);
	let [email, setEmail] = useState<string | undefined>('')
	let [inputFocus, setInputFocus] = useState<boolean>(false);
	const emailDiv = useRef<HTMLDivElement | null>(null)

	const emailDivProps = useSpring({
		opacity: orbHold ? 0 : 1,
		visibility: orbHold ? 'hidden' : 'visible',
		config: {
			mass: 2,
			friction: 2,
			clamp: true
		}
	})

	useEffect(() => {
		if (emailDiv.current !== null) {
			emailActive ? emailDiv.current.classList.add('active') : emailDiv.current.classList.remove('active')
			if (inputFocus) {
				emailDiv.current.classList.add('focused') 
			} else {
				emailDiv.current.classList.remove('focused')
			}
		}
	}, [emailActive, inputFocus, email])

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
		<animated.div className='DesktopEmail grid' ref={emailDiv} style={emailDivProps}>
			<form onSubmit={submitHandler} className={success ? 'desktopEmailWrapper Email success' : (success === 'false' ? 'desktopEmailWrapper Email fail' : 'desktopEmailWrapper Email')}>
				<span>
					<span>
						<h3>STAY UPDATED WITH THE</h3>
					</span>
				</span>
				<span>
					<span style={{ transitionDelay: '0.05s'}}>
						<h3>ANDY MAG NEWSLETTER</h3>
					</span>
				</span>
				<label>
					<h4>Email</h4>
				</label>
				{ inputFocus ? <img className="submitIcon" src="../assets/paper_plane_purple.svg" alt="Submit" /> : <img className="submitIcon" src="../assets/paper_plane_white.svg" alt="Submit" /> }
				<input
					onFocus={() => setInputFocus(() => true)}
					onBlur={() => {
							if (email === undefined || email.length < 1) setInputFocus(() => false)
						}
					}
					type="email"
					value={email}
					onChange={(e:any) => setEmail(e.currentTarget.value)} required />
				{/* <input type="submit" value="SUBSCRIBE"/> */}
			</form>
			{/* <div className="hold-icon">
				<img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold to go back</p>
			</div> */}
		</animated.div>
		
	)
}