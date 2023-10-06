import React from 'react';

const Row = ({children}) => {
    return (
        <div className={'flex w-full items-center justify-between'}>
            {children}
        </div>
    );
};

export default Row;
