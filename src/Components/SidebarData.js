import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Overview',
        path: '/overview',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Deliveries',
        path: '/deliveries',
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Deliveries Management',
                path: '/deliveries/DeliveriesManagement',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'Deliveries History',
                path: '/deliveries/DeliveriesHistory',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Daily Reports',
                path: '/reports/DailyReports',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Weekly Reports',
                path: '/reports/WeeklyReports',
                icon: <IoIcons.IoIosPaper />,
                cName: 'sub-nav'
            },
            {
                title: 'Monthly Reports',
                path: '/reports/MonthlyReports',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Login',
        path: '/login',
        icon: <IoIcons.IoMdHelpCircle />
    }
];