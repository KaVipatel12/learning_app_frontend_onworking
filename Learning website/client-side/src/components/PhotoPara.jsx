import React from 'react'

function PhotoPara({imageUrl , heading , paragraph }) {
  return (
<div className="container-para my-4">
  <img src={imageUrl} alt="A beautiful description"/>
  <div className="text-container">
    <h1 style={{color : "#1f2735"}}>{heading}</h1>
    <p style={{color : "grey"}} >{paragraph}</p>
  </div>
</div>

  )
}

export default PhotoPara
