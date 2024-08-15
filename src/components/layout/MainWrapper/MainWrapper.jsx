import React from 'react';
import style from './MainWrapper.module.scss';

const MainWrapper = ({children}) => {
    return (
        <div className={style.MainWrapper}>
            {children}
        </div>
    );
};

export default MainWrapper;