import React from 'react'
import { Container } from 'reactstrap'
import ImageUpload from './UploadImg'

const EditProfile = () => {
  return (
    <div>
      <Container>
        <div style={{marginTop:"20px", padding:"20px"}}>

            <ImageUpload/>
        </div>
      </Container>
    </div>
  )
}

export default EditProfile
