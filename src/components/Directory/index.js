import React from 'react'

import ShopWomen from '../../ assets/shop_women.jpg'
import ShopMen from '../../ assets/men.jpg'
import './styles.scss'

const Directory = props => {
	return (
		<div className='directory'>
			<div className='wrap'>
				<div
					className='item'
					style={{
						backgroundImage: `url(${ShopWomen})`,
					}}>
					<a>Shop Womens</a>
				</div>
				<div
					className='item'
					style={{
						backgroundImage: `url(${ShopMen})`,
					}}>
					<a>Shop Men</a>
				</div>
			</div>
		</div>
	)
}

export default Directory
