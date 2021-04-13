import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'דף בקרה',
        path: '/',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'משלוחים',
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'דף ניהול שליחים',
                path: '/deliveries/DeliveryMan_Management',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'היסטוריית משלוחים',
                path: '/deliveries/DeliveriesHistory',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {   title: 'ניהול מסעדות',
        path: '/restaurants',
        icon: <IoIcons.IoIosRestaurant />,
    },
    {
        title: 'דו"חות',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'דו"ח יומי',
                path: '/reports/DailyReports',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'דו"ח שבועי',
                path: '/reports/WeeklyReports',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'דו"ח חודשי',
                path: '/reports/MonthlyReports',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'התנתק',
        path: '/',
        icon: <IoIcons.IoIosLogOut />
    }
];