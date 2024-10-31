// CardComponent.jsx
import React from 'react'

export const CardHome = ({ title, text, link, linkText }) => {
  return (
    <div className="col-md-6">
      <div className="card" style={{backgroundColor: "rgba(255, 255, 255, 0)"}}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontFamily: "DM Sans", fontSize: "40px", color: "#fff" }}>{title}</h5>
          <p className="card-text"style={{ fontFamily: "DM Sans", color: "#fff" }}>{text}</p>
          <a href={link} className="btn btn-primary" style={{ width: "80%", borderRadius: "25px"}}>{linkText}</a>
        </div>
      </div>
    </div>
  )
}
