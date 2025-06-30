import './Hero.css'
import Header from '../../layouts/Header'

import CheckMark from '../../assets/svg/CheckMark'
import girl1 from '../../assets/img/girl1.png'
import girl3 from '../../assets/img/girl3.png'
import girl4 from '../../assets/img/girl4.png'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import GoggleBtn from '../../ui/GoggleBtn'

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

const loopedCards = [...GirlCard, ...GirlCard, ...GirlCard]
const MIDDLE_INDEX = GirlCard.length

function Hero() {
	const [activeIndex, setActiveIndex] = useState(0)
	const scrollRef = useRef(null)
	const cardWidth = 300

	const swiperRef = useRef(null)

	useEffect(() => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.update()
		}
	}, [])
	const handleSlideChange = swiper => {
		setActiveIndex(swiper.realIndex)
	}

	const centerScroll = index => {
		if (!scrollRef.current) return
		const scrollTo =
			index * cardWidth - scrollRef.current.offsetWidth / 2 + cardWidth / 2
		scrollRef.current.scrollTo({
			left: scrollTo,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		const el = scrollRef.current
		if (!el) return

		const onScroll = () => {
			const scrollLeft = el.scrollLeft
			const center = scrollLeft + el.offsetWidth / 2
			const index = Math.round(center / cardWidth)
			const normalizedIndex = index % GirlCard.length
			setActiveIndex((normalizedIndex + GirlCard.length) % GirlCard.length)

			if (
				index < GirlCard.length ||
				index >= loopedCards.length - GirlCard.length
			) {
				const newScroll =
					(MIDDLE_INDEX + normalizedIndex) * cardWidth -
					el.offsetWidth / 2 +
					cardWidth / 2
				requestAnimationFrame(() => {
					el.scrollLeft = newScroll
				})
			}
		}

		el.addEventListener('scroll', onScroll)
		return () => el.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		centerScroll(GirlCard.length + activeIndex)
	}, [])

	return (
		<div className='Hero'>
			<Header />

			<div className='heroContent'>
				<div className='carousel'>
					<Swiper
						ref={swiperRef}
						modules={[Navigation, Pagination, Autoplay]}
						onSlideChange={handleSlideChange}
						loop={true}
						centeredSlides={true}
						slidesPerView={3}
						initialSlide={GirlCard.length}
						autoplay={{ delay: 10000 }}
						pagination={{ clickable: true }}
						className='carouselCards'
						breakpoints={{
							0: { slidesPerView: 1 },
							786: { slidesPerView: 1 },
							1280: { slidesPerView: 3 },
						}}
					>
						{GirlCard.map((card, index) => (
							<SwiperSlide
								key={index}
								className={activeIndex === index ? 'active' : 'inactive'}
							>
								{({ isActive }) => (
									<div className={`card ${isActive ? 'active' : 'inactive'}`}>
										<div className='heroCardImage'>
											<img src={card.image} alt={card.name} />
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
								)}
							</SwiperSlide>
						))}
					</Swiper>
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
						<GoggleBtn className={'heroGoggleBtn'} />

						<div className='heroButtonsText'>
							<div className='line'></div>
							<span>or</span>
							<div className='line'></div>
						</div>
						<div className='heroButtonsBottom'>
							<a className='heroEmailBtn' href='/signup'>
								Continue with Email
							</a>
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
