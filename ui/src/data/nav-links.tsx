import React from 'react'
import { FaConnectdevelop,  FaTerminal, FaUser, FaUserEdit,  FaUsersCog } from 'react-icons/fa'
import { Route } from 'types/route'
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

// 这里是默认的主菜单设置，但是会被服务器的配置所覆盖！
export const navLinks: Route[] = [
    {
        title: '首页大盘',
        url: '/home',
        icon: "FaHome"
    },
    {
        title: '应用监控',
        url: '/apps',
        icon: "FaThLarge",
        children: [
            {
                title: '应用列表',
                url: '/apps/list',
            },
            {
                title: '接口统计',
                url: '/apps/api',
            }
        ]
    },
    {
        title: '服务器监控',
        url: '/servers',
        icon: "FaRegChartBar"
    }
]


export const accountLinks = [
    {
        title: 'user',
        url: '/account/setting',
        baseUrl: '/account/setting',
        icon: <FaUserEdit />
    }
]

export const adminLinks = [
    {
        title: 'auditLog',
        url: '/admin/audit',
        baseUrl: '/admin/audit',
        icon: <MdOutlineAdminPanelSettings />
    },
    {
        title: 'user',
        url: '/admin/users',
        baseUrl: '/admin/users',
        icon: <FaUser />
    }
]

export const cfgLinks = [
    {
        title: 'datasource',
        url: '/cfg/datasources',
        baseUrl: '/cfg/datasources',
        icon: <FaConnectdevelop />
    },
    {
        title: 'variable',
        url: '/cfg/variables',
        baseUrl: '/cfg/variables',
        icon: <FaTerminal />
    },
    {
        title: 'team',
        url: '/cfg/teams',
        baseUrl: '/cfg/teams',
        icon: <FaUsersCog />
    },
    {
        title: 'user',
        url: '/cfg/users',
        baseUrl: '/cfg/users',
        icon: <FaUser />
    }
]


export const newLinks = [
    {
        title: 'NewDashboard',
        url: '/new/dashboard',
        baseUrl: '/new/dashboard',
        // icon: <FaUsersCog />
    },
    {
        title: 'ImportDashboard',
        url: '/new/import',
        baseUrl: '/new/import',
        // icon: <FaUsersCog />
    },
    {
        title: 'NewDatasource',
        url: '/new/datasource',
        baseUrl: '/new/datasource',
        // icon: <FaUsersCog />
    },
]
