function Arrow({ onClick, className }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='13'
			height='23'
			viewBox='0 0 13 23'
			fill='none'
			className={className}
			onClick={onClick}
		>
			<g clip-path='url(#clip0_7_334)'>
				<path
					d='M1.8064 1.58789L11.8064 11.5879L1.8064 21.5879'
					stroke='white'
				/>
			</g>
			<defs>
				<clipPath id='clip0_7_334'>
					<rect
						width='12'
						height='22'
						fill='white'
						transform='translate(0.806396 0.587891)'
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export default Arrow
