import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as SortTable} from '../../../img/SortTable.svg';
import style from './SelectSort.module.scss'

const SelectSort = ({textValue, options, selectOptions, onSelect}) => {
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
                {(selectOptions?.value === "default")? textValue: selectOptions.text}
                <span><SortTable/></span>
            </div>
            {isOpen && (
                <div className={style.SelectFilter_SelectItems}>
                    {options.map((option, index) => (
                        <div className={
                            (option?.text === selectOptions?.text) ? `${style.SelectFilter_SelectItems_ItemsList} ${style.SelectFilter_SelectItems_ItemsList_Active}` : style.SelectFilter_SelectItems_ItemsList
                        } key={index} onClick={() => handleOptionClick(option)}>
                            {option?.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectSort;