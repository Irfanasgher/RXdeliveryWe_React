import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import { Taxi, ThLarge, Truck, Stethoscope, Users } from '../../../Icons';
import { getUserRole } from '../../../modules/common/utils';
import { roles } from '../../../constants/strings';

import './SideBar.scss';

const SideBar = () => {
  const location = useLocation();
  const [key, setKey] = useState();

  useEffect(() => {
    menuList.map((item) => {
      let condition = location.pathname.startsWith(item.path);
      if (condition) {
        setKey(item.id);
      }
      return 0;
    });
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  let menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <ThLarge />,
      path: '/dashboard',
      accessRight: [roles.tenantAdmin, roles.tenantUser],
    },
    {
      id: 2,
      name: 'Create Delivery',
      icon: <Taxi />,
      path: '/createDelivery',
      accessRight: [roles.tenantUser],
    },
    {
      id: 3,
      name: 'View Deliveries',
      icon: <Truck />,
      path: '/viewDeliveries',
      accessRight: [roles.tenantUser],
    },
    {
      id: 10,
      name: 'Register Pharmacy',
      icon: <Stethoscope />,
      path: '/registerPharmacy',
      accessRight: [roles.tenantAdmin],
    },
    {
      id: 11,
      name: 'Register Pharmacist',
      icon: <Users />,
      path: '/registerPharmacist',
      accessRight: [roles.tenantAdmin],
    },
  ];

  return (
    <>
      <Menu
        id="SideMenu"
        style={{ backgroundColor: '#F1F5F8' }}
        defaultSelectedKeys={key}
        mode={'inline'}
        theme={'light'}
        selectedKeys={[`${key}`]}
      >
        {menuList.map(
          (menu) =>
            menu?.accessRight?.includes(getUserRole()) && (
              <Menu.Item key={menu.id} icon={menu.icon}>
                <Link to={menu.path}>{menu.name}</Link>
              </Menu.Item>
            )
        )}
      </Menu>
    </>
  );
};

export default SideBar;
