import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../Actions"
import phoneReceptionistService from "../Services/phoneReceptionistService";
import Firebase from "../Components/Firebase"
import {removeUserSession} from "../Utils/Common"
import { useHistory } from "react-router-dom";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const SubMenu = ({ item ,showSideBar}) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const dispatch = useDispatch();
    const phoneReceptionistID = useSelector(state => state.currentPhoneReceptionistID);
    const history = useHistory();

    const HandleLogout = () => {
        Firebase.logout().then(() => {
            dispatch(logout());
            phoneReceptionistService.phoneReceptionistLogout(phoneReceptionistID).then(() => {
                removeUserSession();
                history.push("/");
                window.location.reload()
            }).catch(error => {
                console.error(error.message);
            });
        }).catch(error => {
            console.error(error.message);
        });
    }
    return (
        <>
            <SidebarLink to={item.path} onClick={(item.subNav && showSubnav) || (item.title === "התנתק" ? HandleLogout : null)}>
                <div onClick={showSideBar}>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index} onClick={showSideBar}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                );
            })}
        </>
    );
};

export default SubMenu;