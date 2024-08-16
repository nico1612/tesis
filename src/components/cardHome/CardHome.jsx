// CardComponent.jsx
import React from 'react'

export const CardHome = ({ title, text, link, linkText }) => {
  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <a href={link} className="btn btn-primary">{linkText}</a>
        </div>
      </div>
    </div>
  )
}
