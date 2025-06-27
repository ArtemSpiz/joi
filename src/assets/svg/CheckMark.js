function CheckMark({ className }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='13'
			height='14'
			viewBox='0 0 13 14'
			fill='none'
			className={className}
		>
			<circle cx='6.5' cy='7' r='6.5' fill='#8773FF' />
			<path
				d='M3 7.5L5.5 9.5L10 4.5'
				stroke='white'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}

export default CheckMark
