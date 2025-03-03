import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box, Typography, IconButton, Badge } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';

import { NotificationStatus } from '../enums/notification.enum';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { UPDATE_NOTIFICATION } from '../../apollo/user/mutation';
import { Notification } from '../types/notification/notification';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { T } from '../types/common';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	transition: 'background-color 0.3s',
	'&:hover': {
		backgroundColor: status === 'WAIT' ? '#fcb6b9' : '#b3e6b3',
	},
	'& .notification-title': {
		fontWeight: 'bold',
		marginBottom: theme.spacing(0.5),
	},
	'& .notification-desc': {
		marginBottom: theme.spacing(1),
	},
	'& .notification-time': {
		alignSelf: 'flex-end',
		color: theme.palette.text.secondary,
		fontSize: '0.75rem',
	},
}));

const Top = () => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
	let open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);
	const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
	const [userNotifications, setUserNotifications] = useState<Notification[]>([]);
	const notificationOpen = Boolean(notificationAnchor);

	/** APOLLO **/

	const {
		loading: getNotificationsLoading,
		data: getNotificationsData,
		error: getNotificationsError,
		refetch: getNotificationsRefetch,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: user._id },
		skip: !user?._id,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setUserNotifications(data?.getNotifications);
		},
	});

	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

	/** LIFECYCLES **/
	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	useEffect(() => {
		if (user?._id) {
			getNotificationsRefetch();
		}
	}, [user, getNotificationsRefetch]);

	/** HANDLERS **/
	const langClick = (e: any) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: any) => {
			setLang(e.target.id);
			localStorage.setItem('locale', e.target.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.target.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: any) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const handleNotificationClick = (event: any) => {
		setNotificationAnchor(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setNotificationAnchor(null);
	};

	const handleNotificationRead = async (notification: Notification) => {
		await updateNotification({
			variables: { input: { _id: notification._id, notificationStatus: NotificationStatus.READ } },
		});
		getNotificationsRefetch();
		handleNotificationClose();

		router.push(
			notification.notificationGroup === 'ARTICLE'
				? `/community/detail?articleCategory=FREE&id=${notification.articleId}`
				: notification.notificationGroup === 'PROPERTY'
				? `property/detail?id=${notification.propertyId}`
				: notification.notificationGroup === 'MEMBER'
				? `/dealer/detail?dealerId=${notification.receiverId}`
				: '/',
		); // Default route if none match
	};

	console.log('notifications: ', userNotifications);
	const unreadNotifications = userNotifications.filter((notification) => notification.notificationStatus === 'WAIT');

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	return (
		<Stack className={'navbar'}>
			<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
				<Stack className={'container'}>
					<Box component={'div'} className={'logo-box'}>
						<Link href={'/'}>
							<img src="/img/logo/logoTop.png" alt="" />
						</Link>
					</Box>
					<Box component={'div'} className={'router-box'}>
						<Link href={'/'}>
							<div>{'Home'}</div>
						</Link>
						<Link href={'/property'} className="underline-link">
							<div>{'Stays'}</div>
						</Link>
						<Link href={'/booking'} className="underline-link">
							<div>{'Booking'}</div>
						</Link>
						<Link href={'/community?articleCategory=FREE'}>
							<div> {'Community'} </div>
						</Link>
						{user?._id && (
							<Link href={'/mypage'}>
								<div> {'My Page'} </div>
							</Link>
						)}
						<Link href={'/cs'}>
							<div> {'CS'} </div>
						</Link>
					</Box>

					<Box component={'div'} className={'user-box'}>
						{user?._id ? (
							<>
								<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
									<img
										src={
											user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
										}
										alt=""
									/>
								</div>

								<Menu
									id="basic-menu"
									anchorEl={logoutAnchor}
									open={logoutOpen}
									onClose={() => {
										setLogoutAnchor(null);
									}}
									sx={{
										mt: '10px',
									}}
								>
									<MenuItem onClick={() => logOut()}>
										<Logout fontSize="small" style={{ color: 'red', marginRight: '15px' }} />
										Logout
									</MenuItem>
								</Menu>
							</>
						) : (
							<Link href={'/account/join'}>
								<div className={'join-box'}>
									<span>{'Login'}</span>
								</div>
							</Link>
						)}

						<div className={'lan-box'}>
							{user?._id && (
								<>
									<IconButton className={'icon-cala'} onClick={handleNotificationClick}>
										<Badge badgeContent={unreadNotifications.length} color="error">
											<NotificationsOutlinedIcon className={'notification-icon'} />
										</Badge>
									</IconButton>
									<Menu
										anchorEl={notificationAnchor}
										open={notificationOpen}
										onClose={handleNotificationClose}
										PaperProps={{
											elevation: 1,
											sx: {
												marginTop: '7px',
												backgroundColor: '#ffffff93',
												color: 'black',
												minWidth: '300px',
												width: '400px',
												borderRadius: '12px',
												maxHeight: '400px',
												overflowY: 'auto',
											},
										}}
										MenuListProps={{
											sx: {
												padding: 0,
											},
										}}
									>
										{unreadNotifications.length === 0 ? (
											<MenuItem
												sx={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													justifyContent: 'center',
													color: '#fff',
													height: '100px',
												}}
											>
												{t('No new alerts')}
											</MenuItem>
										) : (
											unreadNotifications.map((notification: any) => (
												<MenuItem
													key={notification._id}
													className={'notification-items'}
													onClick={() => handleNotificationRead(notification)}
													sx={{
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'flex-start',
														backgroundColor:
															notification.notificationStatus === NotificationStatus.WAIT ? '#fff' : '#fff',
														'&:hover': {
															backgroundColor:
																notification.notificationStatus === NotificationStatus.WAIT ? '#f5f5e6' : '#ff000079',
														},
														borderRadius: '10px',
														marginBottom: '7px',
														padding: '15px 20px',
														transition: 'background-color 0.3s ease',
													}}
												>
													<div>
														<Typography
															variant="subtitle1"
															sx={{
																fontWeight: '700',
																fontFamily: 'Nunito',
																fontSize: '16px',
																display: 'flex',
																flexDirection: 'row',
																alignItems: 'center',
															}}
														>
															<NotificationsActiveIcon
																sx={{ fontSize: '16px', marginRight: '3px', color: '#e50b0b' }}
															/>{' '}
															{notification.notificationTitle}
														</Typography>
														<Typography
															variant="body2"
															sx={{ margin: '0.5px 0', fontFamily: 'Nunito', fontSize: '15px' }}
														>
															{notification.notificationDesc}
														</Typography>
														<Typography variant="caption" sx={{ color: 'gray' }}>
															{notification.createdAt}
														</Typography>
													</div>
												</MenuItem>
											))
										)}
									</Menu>
								</>
							)}
							<Button
								disableRipple
								className="btn-lang"
								onClick={langClick}
								endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
							>
								<Box component={'div'} className={'flag'}>
									{lang !== null ? (
										<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
									) : (
										<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
									)}
								</Box>
							</Button>

							<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
								<MenuItem disableRipple onClick={langChoice} id="en">
									<img className="img-flag" src={'/img/flag/langen.png'} onClick={langChoice} id="en" alt={'usaFlag'} />
									{t('English')}
								</MenuItem>
								<MenuItem disableRipple onClick={langChoice} id="kr">
									<img
										className="img-flag"
										src={'/img/flag/langkr.png'}
										onClick={langChoice}
										id="uz"
										alt={'koreanFlag'}
									/>
									{t('Korean')}
								</MenuItem>
								<MenuItem disableRipple onClick={langChoice} id="ru">
									<img
										className="img-flag"
										src={'/img/flag/langru.png'}
										onClick={langChoice}
										id="ru"
										alt={'russiaFlag'}
									/>
									{t('Russian')}
								</MenuItem>
							</StyledMenu>
						</div>
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default withRouter(Top);
