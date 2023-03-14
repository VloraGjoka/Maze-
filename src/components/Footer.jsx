import React from "react";
import "./Footer.css"
const Footer = () =>{
    return(
        <div className="mainFooter">
            <p>Vlora GJOKA, <span>&copy;{new Date().getFullYear()}</span> <code>All right reserved</code></p>
        </div>
    )
}
export default Footer