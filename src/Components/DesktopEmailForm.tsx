import
	React,
	{
		FunctionComponent,
		useState,
		useRef,
		useEffect
	}
from 'react';
import { useSpring, animated } from 'react-spring';

import analytics from '../utils/analytics';

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
	let [message, setMessage] = useState<string | null>(null);
	let [processing, setProcessing] = useState<boolean>(false);

	const emailDiv = useRef<HTMLDivElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

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
		if (!emailActive) {
			setEmail(() => '')
			setInputFocus(() => false)
			reset();
		}
	}, [emailActive])

	// const submitHandler = (e:any) => {
	// 	e.preventDefault();
	// 	// const url = `${process.env.REACT_APP_DEV_SERVER}/subscribe`;
	// 	const url = process.env.REACT_APP_DEV_SERVER + '/subscribe';
	// 	const body = { email }
	// 	const options = {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json; charset=utf-8',
	// 		},
	// 		body: JSON.stringify(body),
	// 	}

	// 	// will have to include logic that handles specific errors (duplicate emails, failure to fetch, etc.)
	// 	fetch(url, options)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data);
	// 		data.statusCode === 202 ? setSuccess(true) : setSuccess(false);
	// 	})
	// 	.catch(error => console.log(error))
	// }

	const reset = () => {
		setMessage(() => null);
		setSuccess(() => null);
		setProcessing(() => false);	
		// setEmail()
	}

	const submitHandler = (e:any) => {
		// do nothing if successs
		e.preventDefault();
		if (!inputFocus) {
			emailRef.current?.focus();
			return
		}
		if (!success && !processing) {
			emailRef.current?.blur();
			reset();
			const url = process.env.REACT_APP_EMAIL_URL ? process.env.REACT_APP_EMAIL_URL : null;
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
					console.log(data);
					if (data.result === 'success') {
						setSuccess(() => true);
						setMessage(() => data.message);
						analytics.logEvent('subscribed')
					} else if (data.result === 'error') {
						setSuccess(() => false);
						setMessage(() => data.error);
						analytics.logEvent('subscribe_error', {
							message: data.error,
						})
					}
					setProcessing(() => false);
				})
				.catch(error => {
					setSuccess(() => false);
					setMessage(() => 'An error occurred please try again.')
					setProcessing(() => false);
					analytics.logEvent('subscribe_error', {
						message: 'client fetch error',
					})
					console.log(error)
				})
			}
		}
	}

	return (
		<animated.div
			// className='DesktopEmail grid'
			className={`DesktopEmail grid${emailActive ? ' active' : ''}`}
			ref={emailDiv}
			style={emailDivProps}
		>
			<form
				onSubmit={submitHandler}
				// className={success ? 'desktopEmailWrapper Email success' : (success === 'false' ? 'desktopEmailWrapper Email fail' : 'desktopEmailWrapper Email')}
				className={`desktopEmailWrapper Email${success ? ' success' : ''}${inputFocus ? ' focused' : ''}`}
				ref={formRef}
			>
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
					<h4>{ success ? 'Subscribed' : 'Email' }</h4>
				</label>
				{/* { inputFocus ? <img className="submitIcon" src="../assets/paper_plane_purple.svg" alt="Submit" /> : <img className="submitIcon" src="../assets/paper_plane_white.svg" alt="Submit" /> } */}
				{ !processing ?
					<svg
						className="submitIcon"
						width="20px"
						height="13px"
						viewBox="0 0 20 13"
						version="1.1"
						onClick={() => {
							if (emailRef.current && formRef.current) {
								if (emailRef.current.checkValidity()) {
									formRef.current.dispatchEvent(new Event('submit'))
								}
							}
						}}
					>
						<g id="Desktop-v2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<g id="SIGN-UP" transform="translate(-949.000000, -420.000000)" fill={success ? '#47C34A' : inputFocus ? '#C247C3' : '#FFFFFF'} fillRule="nonzero">
								<g id="Group-3" transform="translate(668.000000, 292.000000)">
									<g id="no-box-form" transform="translate(0.000000, 99.000000)">
										<g id="Button" transform="translate(10.000000, 20.000000)">
											<g id="paper-plane" transform="translate(271.000000, 9.000000)">
												<path d="M19.6680356,0.0140867358 C13.2544664,1.37157965 6.88203906,2.71983792 0.479898134,4.07271351 C0.171333684,4.13735603 -0.0412329379,4.22508517 0.00676597665,4.26664107 C0.0410509156,4.29665367 0.0661932041,4.31974029 0.0936211553,4.34051824 C1.51758895,5.45791037 2.93927109,6.5753025 4.36781021,7.6880773 C4.49580731,7.78734974 4.5392349,7.88662218 4.53694924,8.04361116 C4.52780659,9.56271037 4.52780659,11.0841183 4.52552093,12.6032175 L4.52552093,12.7625151 C4.52552093,12.8502442 4.73808755,12.7786757 5.00093875,12.6032175 C5.92206077,11.9868049 7.51288194,10.9363639 8.4317183,10.3199513 C9.46255213,11.0702663 10.500243,11.8228899 11.5539334,12.5870568 C11.8099276,12.7717498 12.152777,12.7071072 12.321916,12.4369938 C14.8544302,8.41761431 17.375516,4.41901273 19.9217442,0.381163902 C20.0908832,0.113359177 19.9766001,-0.050555784 19.6680356,0.0140867358 Z M17.4509429,1.73865682 C17.3000892,1.83792926 17.1469498,1.9372017 16.9938104,2.03416548 C13.7961684,4.09580013 10.5985264,6.15512612 7.4054558,8.22137809 C7.26603038,8.31141588 7.13803327,8.44762691 7.05346376,8.59307258 C6.53004702,9.46805526 6.02262993,10.3522726 5.50835584,11.2341812 C5.48778488,11.2688112 5.46721392,11.3011324 5.44435729,11.3334537 C5.40778669,11.3888616 5.37799566,11.174156 5.37799566,10.8555608 L5.37799566,9.11021274 C5.37799566,8.64848045 5.38721573,8.18674817 5.37799566,7.72501588 C5.37578741,7.56802691 5.42378633,7.48722376 5.56549741,7.42027258 C7.32088628,6.56606785 9.07170383,5.70262848 10.824807,4.84380643 C13.1058983,3.72410564 15.3892752,2.60671351 17.6726522,1.48932138 C17.7092228,1.47085209 17.7457934,1.45469146 17.7869353,1.44545682 C17.8486482,1.43160485 17.7023658,1.57474186 17.4509429,1.73865682 Z" id="Shape"></path>
											</g>
										</g>
									</g>
								</g>
							</g>
						</g>
					</svg> : 
					<div className="dot-wrap"><div className="dot-flashing"></div></div>
				}
				<input
					ref={emailRef}
					onFocus={() => {
						if (!processing) reset();
						setInputFocus(() => true);
					}}
					onBlur={() => {
							if (email === undefined || email.length < 1) setInputFocus(() => false)
						}
					}
					type="email"
					name="Email"
					value={email}
					onChange={(e:any) => {
						const target = e.target;
						setEmail(() => target.value)
					}}
					required
				/>
				{ !success && 
					<div className="Error">
						<span>
							{ message }
						</span>
					</div>
				}
			</form>
			{/* <div className="hold-icon">
				<img src="../assets/holdicon_white.svg" alt="Press and hold to learn more about Andy Mag"/>
				<p>Press and hold to go back</p>
			</div> */}
		</animated.div>
		
	)
}