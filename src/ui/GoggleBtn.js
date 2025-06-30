import Goggle from '../assets/svg/Goggle'

function GoggleBtn({ className }) {
	const handleGoogleLogin = () => {
		const params = new URLSearchParams(window.location.search)

		const getCookie = name => {
			const value = `; ${document.cookie}`
			const parts = value.split(`; ${name}=`)
			if (parts.length === 2) return parts.pop().split(';').shift()
			return ''
		}

		const rtkClickID =
			localStorage.getItem('rtkclickid-store') ||
			getCookie('rtkclickid-store') ||
			''

		const utmObj = {
			rtkeid: rtkClickID,
			click_id: rtkClickID,
			cmpid: params.get('cmpid'),
			pubid: params.get('pubid'),
			prelandername: params.get('prelandername'),
			utm_source: params.get('utm_source'),
			utm_medium: params.get('utm_medium'),
			utm_campaign: params.get('utm_campaign'),
		}

		const loginUrl =
			'https://swipey.ai/api/v1/auth/google/login?state=' +
			encodeURIComponent(JSON.stringify(utmObj))

		const width = 500
		const height = 500

		const left = window.screenX + (window.outerWidth - width) / 2
		const top = window.screenY + (window.outerHeight - height) / 2

		window.open(
			loginUrl,
			'googleLogin',
			`width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
		)
	}

	return (
		<a onClick={handleGoogleLogin} className={className}>
			<Goggle className={`signInGoggle`} />
			Sign in with Google
		</a>
	)
}

export default GoggleBtn
