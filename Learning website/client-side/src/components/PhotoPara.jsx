import React from 'react'

function PhotoPara({imgUrl , heading , paragraph }) {
  return (
<div className="container my-4">
  <img src={imgUrl} alt="A beautiful description" />
  <div className="text-container">
    <h1>{heading}</h1>
    <p>{paragraph}</p>
  </div>
</div>

  )
}

export default PhotoPara
