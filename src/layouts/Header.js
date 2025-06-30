import './Header.css'

import inst from '../assets/img/instagram.png'
import discord from '../assets/img/discord.png'
import x from '../assets/img/x.png'
import reddit from '../assets/img/reddit.png'
import logo from '../assets/img/logoHeader.png'
import Arrow from '../assets/svg/Arrow'
import { useState } from 'react'

const LinksLogo = [
	{
		logo: inst,
		href: 'https://www.instagram.com/swipeyai/#',
	},
	{
		logo: reddit,
		href: 'https://www.reddit.com/user/SwipeyAI/',
	},
	{
		logo: discord,
		href: 'https://discord.com/invite/5KYctXJSTZ',
	},
	{
		logo: x,
		href: 'https://x.com/SwipeyAI',
	},
]

const LinksText = [
	{
		title: 'Earn with us',
		href: 'https://swipey.ai/become-verified-model',
	},
	{
		title: 'Affiliate',
		href: 'https://swipey.ai/affiliate-program',
	},
	{
		title: 'Sign In',
		href: '/signin ',
	},
]

const Links = [
	{
		title: 'Terms',
	},
	{
		title: 'Privacy Policy',
	},
	{
		title: 'Refund Policy',
	},
	{
		title: 'Safety Guidelines',
	},
	{
		title: 'Support',
	},
]

function Header({ activePage }) {
	const [burgerOpen, setBurgerOpen] = useState(false)

	const toggleBurger = () => {
		setBurgerOpen(prev => !prev)
	}

	return (
		<div className='header'>
			<div className='headerLogo'>
				<a href='/'>
					<img src={logo} alt='logo' />
				</a>
			</div>

			<div className='headerRight'>
				{LinksLogo.map((link, index) => (
					<a href={link.href} className='headerLinkLogo' key={index}>
						<img src={link.logo} alt='linksLogo' />
					</a>
				))}

				{LinksText.map((link, index) => (
					<a
						href={link.href}
						className={`headerLinkTitle  ${
							activePage === link.title.toLowerCase().replace(' ', '')
								? 'activeMobil'
								: ''
						}`}
						key={index}
					>
						{link.title}
					</a>
				))}
			</div>

			<div className='headerArrow' onClick={toggleBurger}>
				<Arrow className={`Arrow ${burgerOpen ? 'rotated' : ''}`} />
			</div>

			<div
				className={`headerLinkTitle mobile ${
					activePage === 'signin' ? 'activeMobil' : ''
				}`}
			>
				{LinksText[2].title}
			</div>

			<div className={`headerBurger ${burgerOpen ? 'open' : ''}`}>
				<div className='headerBurgerTitles'>
					{LinksText.map((link, index) => (
						<a
							href={link.href}
							className={`headerLinkTitle ${
								activePage === link.title.toLowerCase().replace(' ', '')
									? 'active'
									: ''
							}`}
							key={index}
						>
							{link.title}
						</a>
					))}
				</div>

				<div className='headerBurgerIcons'>
					{LinksLogo.map((link, index) => (
						<div className='headerLinkLogo' key={index}>
							<img src={link.logo} alt='linksLogo' />
						</div>
					))}
				</div>

				<div className='headerBurgerLinks'>
					{Links.map((link, index) => (
						<div className='headerLink' key={index}>
							{link.title}
						</div>
					))}
				</div>

				<div className='headerBurgerSubtitle'>
					© 2025 Joi AI. All rights reserved.
				</div>
			</div>
		</div>
	)
}

export default Header
