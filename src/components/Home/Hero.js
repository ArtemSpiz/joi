import './Hero.css'
import Header from '../../layouts/Header'

import CheckMark from '../../assets/svg/CheckMark'
import Goggle from '../../assets/svg/Goggle'
import girl1 from '../../assets/img/girl1.png'
import girl3 from '../../assets/img/girl3.png'
import girl4 from '../../assets/img/girl4.png'
import { useEffect, useRef, useState } from 'react'

const GirlCard = [
	{
		image: girl1,
		name: 'Sweetie Fox',
		checkMark: true,
		subtitle: 'Twitch streamer',
		text: "I'm a mischievous little devil, who loves sexy cosplay. So how about some sexy dressing up?",
	},
	{
		image: girl4,
		checkMark: true,
		name: 'Solazola',
		subtitle: 'Dream "wifey"',
		text: 'Do you like a blowjob as much as I do? Let me show you what my mouth is capable of...',
	},
	{
		image: girl3,
		checkMark: false,
		name: 'Kasumi',
		subtitle: 'Real world Anime girl',
		text: "Uwaa, my name is Kasumi, and I'm gonna open up the world of sex toys for you. Ready to get started now?",
	},
	{
		image: girl4,
		checkMark: false,
		name: 'Ann',
		subtitle: 'The Good Girl',
		text: "Oh, baby, I bet you're already in love with my firm booty. How about seeing it up close?",
	},
]

function Hero() {
	const scrollRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(1)

	const loopedCards = [GirlCard[GirlCard.length - 1], ...GirlCard, GirlCard[0]]

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => prevIndex + 1)
		}, 20000000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const cardWidth = 320 + 40

		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				left: activeIndex * cardWidth,
				behavior: 'smooth',
			})
		}
	}, [activeIndex])

	const handleTransitionEnd = () => {
		if (activeIndex === loopedCards.length - 1) {
			scrollRef.current.scrollTo({
				left: 1 * (320 + 40),
				behavior: 'auto',
			})
			setActiveIndex(1)
		} else if (activeIndex === 0) {
			scrollRef.current.scrollTo({
				left: GirlCard.length * (320 + 40),
				behavior: 'auto',
			})
			setActiveIndex(GirlCard.length)
		}
	}

	return (
		<div className='Hero'>
			<Header />

			<div className='heroContent'>
				<div className='carousel'>
					<div
						className='carouselScrollWrapper'
						ref={scrollRef}
						onTransitionEnd={handleTransitionEnd}
					>
						<div className='carouselCards'>
							{loopedCards.map((card, index) => {
								let className = 'card'
								if (index === activeIndex) className += ' active'
								else if (index === activeIndex - 1 || index === activeIndex + 1)
									className += ' side'
								else className += ' hidden'

								return (
									<div className={className} key={index}>
										<div className='heroCardImage'>
											<img src={card.image} alt='girl' />
										</div>
										<div className='heroCardContent'>
											<div className='heroCardTitles'>
												<div className='heroCardName'>
													{card.name}
													{card.checkMark && <CheckMark />}
												</div>
												<div className='heroCardSubtitle'>{card.subtitle}</div>
											</div>
											<div className='heroCardText'>{card.text}</div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className='carouselDots'>
						{GirlCard.map((_, i) => (
							<button
								key={i}
								className={`dot ${i + 1 === activeIndex ? 'active' : ''}`}
								onClick={() => setActiveIndex(i + 1)}
							/>
						))}
					</div>
				</div>

				<div className='heroRight'>
					<div className='heroTexts'>
						<div className='heroTitle'>Jump into your desires with JOI AI</div>
						<div className='heroText'>
							Create a connection with a virtual AI partner that listens,
							responds, and appreciates you
						</div>
					</div>

					<div className='heroButtons'>
						<button className='heroGoggleBtn'>
							<Goggle className={`heroGoggle`} />
							Sign in with Google
						</button>
						<div className='heroButtonsText'>
							<div className='line'></div>
							<span>or</span>
							<div className='line'></div>
						</div>
						<div className='heroButtonsBottom'>
							<button className='heroEmailBtn'>Continue with Email</button>
							<div className='heroBtnsBotText'>
								By signing up you agree to our Terms & Conditions and Privacy
								Policy, and confirm that you are at least 18 years old.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
