import React from 'react'
import { StartCompany } from '../../components/StartCompany/StartCompany';
import TopBar from '../../../common/TopBar/TopBar';
import "./HomeCompany.css"

const HomeCompany = () => {
  return (
    <div className='container-company'>
      <TopBar />
      <StartCompany />
    </div>
  )
}

export default HomeCompany;