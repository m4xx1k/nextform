import React from 'react';

const InputContainer = ({children, width='', variant='row'}) => {
    return (
        <div className={`flex ${variant==='column'? 'flex-col':' items-center'} gap-1 ${width} rounded`}>
            {children}
        </div>
    );
};

export default InputContainer;
