import Header from '../../layouts/Header'
import './Forgot.css'
import { useState } from 'react'

function Forgot() {
	const [email, setEmail] = useState('')

	return (
		<div className='forgot'>
			<Header />

			<div className='forgotContentWrapper'>
				<div className='forgotContent'>
					<div className='forgotTitles'>
						<div className='forgotTitle'>Password recovery</div>
						<div className='forgotText'>
							Enter your email and check your inbox
						</div>
					</div>

					<form className='forgotVerify'>
						<div className='Errors'>
							<input
								className='forgotEmail'
								type='email'
								placeholder='Your email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className='forgotBottom'>
							<div className='forgotBtns'>
								<a href='/' className='forgotBack'>
									Back
								</a>
								<button type='submit' className='forgotWhite'>
									Continue
								</button>
							</div>
							<div className='forgotSubtext'>
								By clicking “Continue” you agree with the{' '}
								<a className='forgotSubtextLink' href='https://joi.com/terms/'>
									Terms & Conditions
								</a>{' '}
								and{' '}
								<a
									className='forgotSubtextLink'
									href='https://joi.com/privacy/'
								>
									Privacy Policy
								</a>
							</div>
							<div className='forgotAnother'>
								<div className='forgotQuestion'>Don't have an account yet?</div>
								<a className='forgotCreate' href='/signup'>
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

export default Forgot
