import React from 'react'
import AppBar from '../../../../../global_components/user/appbar'
import Footer from '../../../../../global_components/user/footer'
import EditProfileBody from './components/edit_profile_body'

const EditProfile = () => {
  return (
    <>
    <AppBar id="0"></AppBar>
      <main>
        <EditProfileBody />
      </main>
      <Footer></Footer>
    </>
  )
}

export default EditProfile
