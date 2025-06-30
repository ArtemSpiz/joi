import Header from '../../layouts/Header'
import Eye from '../../assets/svg/Eye'
import Girl from '../../assets/img/girl1.png'
import './SignUp.css'
import { useState } from 'react'
import ArrowSign from '../../assets/svg/ArrowSign'

function SignUp() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [identityOpen, setIdentityOpen] = useState(false)
	const [identity, setIdentity] = useState('')
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		name: '',
		identity: '',
	})

	const [showPassword, setShowPassword] = useState(false)

	const getClickIdFromCookies = () => {
		const match = document.cookie.match(/rtkclickid-store=([^;]+)/)
		return match ? match[1] : null
	}

	const submitAccount = async () => {
		const clickId = getClickIdFromCookies()
		if (!clickId) {
			alert('Click ID not found in cookies.')
			return
		}

		const utm = JSON.parse(localStorage.getItem('utm_data') || '{}')

		try {
			const response = await fetch('https://swipey.ai/api/v1/auth/pre-lander', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': '3b6b40c8-8b6d-4094-8e67-93fc80ae99cb',
				},
				body: JSON.stringify({
					email,
					password,
					clickId,
					...utm,
				}),
			})

			const data = await response.json()

			if (data.success && data.loginUrl) {
				const redirectUrl = new URL(data.loginUrl)
				window.location.href = redirectUrl.toString()
			} else {
				alert(data.message || 'Something went wrong.')
			}
		} catch (error) {
			console.error('API error:', error)
			alert('Failed to create account.')
		}
	}

	const handleSubmit = e => {
		e.preventDefault()

		const newErrors = { email: '', password: '', name: '', identity: '' }

		if (!name.trim()) {
			newErrors.name = 'Name is required'
		}
		if (!email.trim()) {
			newErrors.email = 'Email is required'
		}
		if (!password.trim()) {
			newErrors.password = 'Password is required'
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long'
		}
		if (!identity) {
			newErrors.identity = 'Identity is required'
		}

		setErrors(newErrors)

		if (
			!newErrors.email &&
			!newErrors.password &&
			!newErrors.name &&
			!newErrors.identity
		) {
			submitAccount()
		}
	}

	return (
		<div className='signUp'>
			<Header />
			<div className='signUpImageMobil'>
				<img src={Girl} alt='Girl' />
			</div>
			<div className='signUpContentWrapper'>
				<div className='signUpContent'>
					<div className='signUpTitles'>
						<div className='signUpTitle'>
							Create <span>an account</span>
						</div>
						<div className='signUpText'>
							Use your real email and strong password to keep your data safe
						</div>
					</div>

					<form onSubmit={handleSubmit} className='signUpVerify'>
						<div className='signUpInputs'>
							<div className='signUpInf'>
								<div className='Errors'>
									<input
										className={`signUpName ${errors.name ? 'inputError' : ''}`}
										placeholder='Your Name'
										value={name}
										onChange={e => setName(e.target.value)}
										onFocus={() => {
											setErrors(prev => ({ ...prev, name: '' }))
										}}
									/>
									{errors.name && (
										<div className='signUpError'>{errors.name}</div>
									)}
								</div>

								<div className='Errors IdentityWrapper'>
									<div
										onClick={() => {
											setIdentityOpen(prev => !prev)
											setErrors(prev => ({ ...prev, identity: '' }))
										}}
										className={`signUpIdentity ${
											errors.identity ? 'inputError' : ''
										}`}
									>
										{identity || 'Identity'} <ArrowSign />
									</div>

									<div
										className={`identityDropdown ${identityOpen ? 'show' : ''}`}
									>
										<div
											className='identityDropdownText'
											onClick={() => {
												setIdentity('Male')
												setIdentityOpen(false)
												setErrors(prev => ({ ...prev, identity: '' }))
											}}
										>
											Male
										</div>
										<div
											className='identityDropdownText'
											onClick={() => {
												setIdentity('Female')
												setIdentityOpen(false)
												setErrors(prev => ({ ...prev, identity: '' }))
											}}
										>
											Female
										</div>
									</div>
									{errors.identity && (
										<div className='signUpError'>{errors.identity}</div>
									)}
								</div>
							</div>
							<div className='Errors'>
								<input
									className={`signUpEmail ${errors.email ? 'inputError' : ''}`}
									type='email'
									placeholder='Your email'
									value={email}
									onChange={e => setEmail(e.target.value)}
									onFocus={() => {
										setErrors(prev => ({ ...prev, email: '' }))
									}}
								/>
								{errors.email && (
									<div className='signUpError'>{errors.email}</div>
								)}
							</div>

							<div className='Errors'>
								<div className='signUpPassword'>
									<input
										type={showPassword ? 'text' : 'password'}
										className={`signUpPasInput ${
											errors.password ? 'inputError' : ''
										}`}
										placeholder='Password'
										value={password}
										onChange={e => setPassword(e.target.value)}
										onFocus={() => {
											setErrors(prev => ({ ...prev, password: '' }))
										}}
									/>

									<div
										className='signUpEye'
										onClick={() => setShowPassword(prev => !prev)}
									>
										<Eye isActive={showPassword} className={'Eye'} />
									</div>
								</div>

								{errors.password && (
									<div className='signUpError'>{errors.password}</div>
								)}
							</div>
						</div>
						<div className='signUpBtns'>
							<button type='submit' className='signUpWhite'>
								Continue
							</button>

							<div className='signUpSubText'>
								By signing up you agree to our
								<a href='https://joi.com/terms/'> Terms & Conditions </a> and
								<a href='https://joi.com/privacy/'> Privacy Policy,</a> and
								confirm that you are at least 18 years old.
							</div>

							<div className='signUpAnother'>
								<a
									className='signUpForgot'
									href='http://swipey.ai/?open_modal=reset-password'
								>
									Forgot password?
								</a>
								<div className='signUpCircle'></div>
								<a className='signUpCreate' href='/signin '>
									Log in for JOI AI
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SignUp
