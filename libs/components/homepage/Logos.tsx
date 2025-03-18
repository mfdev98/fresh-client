import React from 'react';

const Logos = () => {
	return (
		<div className="h-[250px] w-full min-w-[1300px] bg-white flex justify-center items-center flex ">
			<div className="flex max-w-full flex-row items-center justify-center gap-34 md:gap-40">
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos1.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos2.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos3.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos4.svg"
					alt=""
				/>
				<img
					className="cursor-pointer transition-transform duration-300 hover:scale-110"
					src="/img/logo/logos5.svg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default Logos;
