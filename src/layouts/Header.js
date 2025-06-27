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
	},
	{
		logo: reddit,
	},
	{
		logo: discord,
	},
	{
		logo: x,
	},
]

const LinksText = [
	{
		title: 'About Us',
	},
	{
		title: 'Earn with us',
	},
	{
		title: 'Affiliate',
	},
	{
		title: 'Sign In',
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

function Header() {
	const [burgerOpen, setBurgerOpen] = useState(false)

	const toggleBurger = () => {
		setBurgerOpen(prev => !prev)
	}

	return (
		<div className='header'>
			<div className='headerLogo'>
				<img src={logo} alt='logo' />
			</div>

			<div className='headerRight'>
				{LinksLogo.map((link, index) => (
					<div className='headerLinkLogo' key={index}>
						<img src={link.logo} alt='linksLogo' />
					</div>
				))}

				{LinksText.map((link, index) => (
					<div className='headerLinkTitle' key={index}>
						{link.title}
					</div>
				))}
			</div>

			<div className='headerArrow' onClick={toggleBurger}>
				<Arrow className={`Arrow ${burgerOpen ? 'rotated' : ''}`} />
			</div>

			<div className='headerLinkTitle mobile'>{LinksText[3].title}</div>

			<div className={`headerBurger ${burgerOpen ? 'open' : ''}`}>
				<div className='headerBurgerTitles'>
					{LinksText.map((link, index) => (
						<div className='headerLinkTitle' key={index}>
							{link.title}
						</div>
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
