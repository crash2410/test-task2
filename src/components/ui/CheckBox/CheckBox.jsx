import React from 'react';
import style from "./CheckBox.module.scss"

const CheckBox = ({labelText, inputValue, onChange, name}) => {
    return (
        <div>
            <input type="checkbox" className={style.CustomCheckbox} id={name} name={name}
                   value={inputValue} checked={inputValue} onChange={(e) => onChange(e)}/>
            <label htmlFor={name}>{labelText}</label>
        </div>
    );
};

export default CheckBox;