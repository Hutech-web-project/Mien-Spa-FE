import React from 'react'
import HomeCustomerTreatment from './home_customer_treatment'
import HomeFacility from './home_facility'
import HomeFeedback from './home_feedback'
import HomeTeamOfExperts from './home_team_of_experts'

const HomeBody = () => {
  return (
    <>
    <HomeFacility/>
    <HomeTeamOfExperts/>
    <HomeCustomerTreatment/>
    <HomeFeedback/>
    
    </>
  )
}
export default HomeBody