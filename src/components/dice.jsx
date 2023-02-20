import React from "react"

export default function Main(props){
    return(
        <div className="die-face">
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}