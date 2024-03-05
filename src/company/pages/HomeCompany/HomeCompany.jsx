import React from 'react'
import { StartCompany } from '../../components/StartCompany/StartCompany';
import TopBar from '../../../common/TopBar/TopBar';
import "./HomeCompany.css"
import SideBar from '../../../common/sidebar/sidebar';
import { Stories } from '../../components/Start/Stories/Stories';

const HomeCompany = () => {
  return (
    <div className="div-general">
      <TopBar />
      <SideBar/>
      <Stories/>
    </div>
  )
}

export default HomeCompany;