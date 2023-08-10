'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CarProps } from '@/types';
import CustomButton from '@/components/CustomButton';
import { calculateCarRent, generateCardImageUrl } from '@/utils';
import CardDetails from '@/components/CardDetails';

interface CarCardProps {
	car: CarProps;
}

export default function CarCard({ car }: CarCardProps) {
	const { city_mpg, year, make, model, transmission, drive } = car;
	const carRent = calculateCarRent(city_mpg, year);

	const [isOpen, setIsOpen] = useState(false);
	console.log(isOpen);
	return (
		<>
			<div className={'car-card group'}>
				<div className={'car-card__content'}>
					<h2 className={'car-card__content-title'}>
						{make} {model}
					</h2>
				</div>
				<p className={'flex mt-6  text-[32px]'}>
					<span className={'self-start text-[14px] font-semibold'}>
						$
					</span>
					{carRent}
					<span className={'self-end text-[14px] font-medium'}>
						/day
					</span>
				</p>
				<div className={'relative w-full h-40 my-3 object-contain'}>
					<Image
						src={generateCardImageUrl(car)}
						alt={model}
						fill
						priority={true}
						className={'object-contain'}
					/>
				</div>
				<div className={'relative flex w-full mt-2'}>
					<div
						className={
							'flex group-hover:invisible w-full justify-between text-gray-500'
						}
					>
						<div
							className={
								'flex flex-col justify-center items-center gap-2'
							}
						>
							<Image
								src={'/steering-wheel.svg'}
								alt={'car wheel'}
								width={20}
								height={20}
							/>
							<p className={'text-[14px]'}>
								{transmission === 'a' ? 'Automatic' : 'Manual'}
							</p>
						</div>
						<div
							className={
								'flex flex-col justify-center items-center gap-2'
							}
						>
							<Image
								src={'/tire.svg'}
								alt={'car tire'}
								width={20}
								height={20}
							/>
							<p className={'text-[14px]'}>{drive.toUpperCase()}</p>
						</div>
						<div
							className={
								'flex flex-col justify-center items-center gap-2'
							}
						>
							<Image
								src={'/gas.svg'}
								alt={'car gar'}
								width={20}
								height={20}
							/>
							<p className={'text-[14px]'}>{city_mpg} MPG</p>
						</div>
					</div>
					<div className={'car-card__btn-container'}>
						<CustomButton
							title={'View More'}
							containerStyles={
								'w-full rounded-full py-[16px] bg-primary-blue cursor-pointer'
							}
							textStyles={
								'text-white text-[14px] leading-[17px] font-bold'
							}
							rightIcon={'/right-arrow.svg'}
							handleClick={(prev) => {
								setIsOpen(true);
							}}
						/>
					</div>
				</div>
				<CardDetails
					isOpen={isOpen}
					closeModal={() => setIsOpen(false)}
					car={car}
				/>
			</div>
		</>
	);
}
