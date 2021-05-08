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
            },
            {
                title: 'הוספת שליח',
                path: '/deliveries/add_new_delivery_man',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'הוספת משלוח',
                path: '/deliveries/add_new_delivery',
                icon: <IoIcons.IoIosPaper />
            },
            {
                title: 'אישור מסלולי חלוקה',
                path: '/deliveries/unapproved_route',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'מסעדות',
        icon: <IoIcons.IoIosRestaurant />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'דף ניהול מסעדות',
                path: '/restaurants',
                icon: <IoIcons.IoIosRestaurant />
            },
            {
                title: 'הוספת מסעדה',
                path: '/restaurants/add_new_restaurant',
                icon: <IoIcons.IoIosPaper />
            }
        ]

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
        title: 'ניהול מוקדנים',
        icon: <IoIcons.IoIosPhonePortrait />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'ניהול מוקדנים',
                path: '/phone_receptionist/phone_receptionist_management',
                icon: <IoIcons.IoIosPhonePortrait />,
                cName: 'sub-nav'
            },
            {
                title: 'הוספת מוקדן חדש',
                path: '/phone_receptionist/add_phone_receptionist',
                icon: <IoIcons.IoIosPersonAdd/>,
                cName: 'sub-nav'
            }
        ]
    },
    {
        title: 'התנתק',
        icon: <IoIcons.IoIosLogOut/>

    }
];