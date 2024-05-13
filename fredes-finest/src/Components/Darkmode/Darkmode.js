import React from "react";


const Darkmode = () => {
    const setDarkmode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    }

    const setLightmode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
    }

    const toggleTheme = (e) => {
        if(e.target.checked) setDarkmode();
        else setLightmode();
    }

    setDarkmode();

    return ( 
        <div className="dark-mode">
            <input
                className="dark-mode-input"
                type="checkbox"
                id="dark-mode-toggle"
                onChange={toggleTheme}
            />
            <label className="dark-mode-label" htmlFor="dark-mode-toggle"/>
        </div>
     );
}
 
export default Darkmode;