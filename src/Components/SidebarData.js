import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'דף בקרה',
        path: '/overview',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'משלוחים',
        //path: '/deliveries',
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
    {
        title: 'דו"חות',
        path: '/reports',
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
        title: 'דף התחברות',
        path: '/login',
        icon: <IoIcons.IoMdHelpCircle />
    }
];