import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Footer = () => {
	const device = useDeviceDetect();

	return (
		<Stack className={'footer-container'}>
			<Stack className={'main'}>
				<Stack className={'right'}>
					<Box component={'div'} className={'top'}>
						<strong>keep yourself up to date</strong>
						<div>
							<EmailOutlinedIcon />
							<input type="text" placeholder={'Your Email'} />
							<span>Subscribe</span>
						</div>
					</Box>
					<Box component={'div'} className={'bottom'}>
						<div>
							<strong>Company</strong>
							<span>Abobut</span>
							<span>Careers</span>
							<span>Mobile</span>
						</div>
						<div>
							<strong>Contact</strong>
							<span>Help/FAQ</span>
							<span>Press</span>
							<span>Affilates</span>
						</div>
						<div>
							<strong>More</strong>
							<span>Airline</span>
							<span>Airlinefees</span>
							<span>Low fare tips</span>
						</div>
					</Box>
				</Stack>
				<Stack className={'left'}>
					<Box component={'div'} className={'footer-box'}>
						<img src="/img/logo/logoBottom.png" alt="" className={'logo'} />
					</Box>
					<Box component={'div'} className={'footer-box'}>
						<span>Book your trip in minute,</span>
						<span>get full control for much longer.</span>
					</Box>

					<Box component={'div'} className={'footer-box'}>
						<span>follow us on social media</span>
						<div className={'media-box'}>
							<InstagramIcon />
							<FacebookOutlinedIcon />
							<TwitterIcon />
							<TelegramIcon />
						</div>
					</Box>
				</Stack>
			</Stack>
			<Stack className={'second'}>
				<span>FreshTour {moment().year()}</span>
				<span>All rights reserved</span>
				<span>Privacy · Terms · Sitemap</span>
			</Stack>
		</Stack>
	);
};

export default Footer;
