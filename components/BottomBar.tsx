import React from 'react';
import { Button } from './ui/button';
import { Link, MoveUpRight } from 'lucide-react';
import { Input } from './ui/input';

export default function BottomBar() {
	return (
		<div className='p-1 rounded-3xl bg-white flex items-center justify-between w-full md:w-1/2 mx-auto mb-4'>
			<div className='flex items-center gap-1'>
				<div className='bg-gray-100 cursor-pointer size-10 flex items-center justify-center rounded-full border'>
					<Link className='size-4' />
				</div>
				<div>
					<textarea
						className='md:w-[30rem] w-[14rem] flex-grow h-5 outline-none'
						placeholder='Ask anything...'
					/>
				</div>
			</div>
			{/* <div className='border flex-grow'>hi</div> */}
			<Button className='rounded-3xl'>
				<span className='text-sm font-medium'>Send</span>
				<MoveUpRight className='size-3 ml-1' />
			</Button>
		</div>
	);
}
