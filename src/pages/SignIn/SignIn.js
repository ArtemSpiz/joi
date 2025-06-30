import Header from '../../layouts/Header'
import Eye from '../../assets/svg/Eye'
import Girl from '../../assets/img/girl1.png'
import './SignIn.css'
import { useState } from 'react'
import GoggleBtn from '../../ui/GoggleBtn'

function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState({ email: '', password: '' })
	const [showPassword, setShowPassword] = useState(false)

	const validate = () => {
		const newErrors = { email: '', password: '' }

		if (!email.trim()) {
			newErrors.email = 'Email is required'
		}

		if (!password.trim()) {
			newErrors.password = 'Password is required'
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long'
		}

		setErrors(newErrors)

		return !newErrors.email && !newErrors.password
	}

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
		if (validate()) {
			submitAccount()
		}
	}

	return (
		<div className='signIn'>
			<Header activePage='signin' />
			<div className='signInImageMobil'>
				<img src={Girl} alt='Girl' />
			</div>
			<div className='signInContentWrapper'>
				<div className='signInContent'>
					<div className='signInTitles'>
						<div className='signInTitle'>SIGN IN JOI AI</div>
						<div className='signInText'>Enter your email and password</div>
					</div>

					<form onSubmit={handleSubmit} className='signInVerify'>
						<div className='signInInputs'>
							<div className='Errors'>
								<input
									className={`signInEmail ${errors.email ? 'inputError' : ''}`}
									type='email'
									placeholder='Your email'
									value={email}
									onChange={e => setEmail(e.target.value)}
									onFocus={() => {
										setErrors(prev => ({ ...prev, email: '' }))
									}}
								/>
								{errors.email && (
									<div className='signInError'>{errors.email}</div>
								)}
							</div>

							<div className='Errors'>
								<div className='signInPassword'>
									<input
										type={showPassword ? 'text' : 'password'}
										className={`signInPasInput ${
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
										className='signInEye'
										onClick={() => setShowPassword(prev => !prev)}
									>
										<Eye isActive={showPassword} className={'Eye'} />
									</div>
								</div>

								{errors.password && (
									<div className='signInError'>{errors.password}</div>
								)}
							</div>
						</div>
						<div className='signInBtns'>
							<button type='submit' className='signInWhite'>
								Continue
							</button>
							<div className='signInButtonsText'>
								<div className='signInline'></div>
								<span>or</span>
								<div className='signInline'></div>
							</div>
							<GoggleBtn className={'signInGoggleBtn'} />

							<div className='signInAnother'>
								<a className='signInForgot' href='/recovery-password'>
									Forgot password?
								</a>
								<div className='signInCircle'></div>
								<a className='signInCreate' href='/signup'>
									Create an account
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SignIn
