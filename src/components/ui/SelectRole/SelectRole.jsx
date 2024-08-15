import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as FilterList} from '../../../img/FilterList.svg';
import style from "./SelectRole.module.scss"

const SelectRole = ({textValue, options, selectOptions, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const node = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !node.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onSelect(option);
    };

    const handleVisible = (value) => {
        setIsOpen(value)
    }

    return (
        <div ref={node} className={style.SelectFilter_Root}>
            <div className={style.SelectFilter_Main} onClick={() => handleVisible(!isOpen)}>
                {(selectOptions?.value === "default")? textValue: selectOptions.name}
                <span><FilterList/></span>
            </div>
            {isOpen && (
                <div className={style.SelectFilter_SelectItems}>
                    {options.map((option, index) => (
                        <div className={
                            (option?.name === selectOptions?.name) ? `${style.SelectFilter_SelectItems_ItemsList} ${style.SelectFilter_SelectItems_ItemsList_Active}` : style.SelectFilter_SelectItems_ItemsList
                        } key={index} onClick={() => handleOptionClick(option)}>
                            {option?.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectRole;