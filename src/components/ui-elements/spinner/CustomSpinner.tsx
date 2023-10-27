import { Spin } from 'antd';
import React, { Children } from 'react';
import classes from './CustomSpinner.module.css';

const CustomSpinner: React.FC<{ isLoading?: boolean }> = ({ isLoading, children }) => {
    return (
        <div className={classes.container}>
            <Spin size='large' spinning={isLoading}>
                {children}
            </Spin>
        </div>
    )
}

export default CustomSpinner;