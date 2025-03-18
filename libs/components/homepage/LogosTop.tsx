import { Box } from '@mui/material';
import React from 'react';

const LogosTop = () => {
	return (
		<div className="h-[250px] w-full min-w-[1300px] bg-white flex justify-center items-center flex ">
			<div className="flex max-w-full flex-row items-center justify-center gap-38 md:gap-60">
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos6.svg"
					alt=""
				/>

				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos7.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos8.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos9.svg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default LogosTop;
