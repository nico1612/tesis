// CardComponent.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CardHome = ({ title, text, link, linkText }) => {
  const navigate=useNavigate()
  const ir =()=>{
navigate(link)
  }
  return (
    <div className="col-md-6">
      <div className="card" style={{backgroundColor: "rgba(255, 255, 255, 0)"}}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontFamily: "DM Sans", fontSize: "40px", color: "#fff" }}>{title}</h5>
          <p className="card-text"style={{ fontFamily: "DM Sans", color: "#fff" }}>{text}</p>
          <p onClick={()=>ir()} className="btn btn-primary" style={{ width: "80%", borderRadius: "25px"}}>{linkText}</p>
        </div>
      </div>
    </div>
  )
}
