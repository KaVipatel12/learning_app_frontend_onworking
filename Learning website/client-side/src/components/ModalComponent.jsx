import React from 'react'

function ModalComponent({alert, alertTitle, alertMessage, confirm, buttonStyle, titleColor, func, loading}) {
  return (
<div>
  <button type="button" className={`btn box-button btn-${buttonStyle}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
    {alert}
  </button>
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color : titleColor}}>{alertTitle}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          {alertMessage}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          {loading ? (
            <button className="btn btn-danger" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" aria-hidden="true" />
            <span className="visually-hidden" role="status">Loading...</span>
            </button>
       ): (
            <button type="button" className={`btn btn-${buttonStyle}`} onClick={func}>{confirm} </button>
        )}

        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ModalComponent
