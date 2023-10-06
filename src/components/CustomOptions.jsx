import React from 'react';
import InputContainer from "@/components/InputContainer";

const CustomOptions = ({options, remove, add, onChangeOptionValue, onChangeOptionName}) => {
    return (

        <div className={'w-full'}>
            <div className={'flex items-center gap-2 my-4'}>
                <h3 className={'mx-auto w-fit'}>Custom Options</h3>
                <button onClick={add} className={'w-8 h-8 rounded bg-blue-600 text-white font-bold'}>+</button>
            </div>
            <ul className={'list-none flex flex-col gap-2 w-full h-80 overflow-y-scroll'}>
                {
                    options.map(({name, value}, i) =>
                        <li key={i} className={'flex gap-2'}>
                            <InputContainer>
                                <label htmlFor="" className={'text-sm'}>Name</label>
                                <input className={'text-black text-sm px-2 py-1 rounded max-w-[120px]'}
                                       placeholder={'name'} value={name} onChange={e => onChangeOptionName(e, i)}
                                       type="text"/>

                            </InputContainer>
                            <InputContainer>
                                <label htmlFor="" className={'text-sm'}>Value</label>

                                <input className={'text-black text-sm px-2 py-1 rounded max-w-[120px]'}
                                       placeholder={'value'} value={value} onChange={e => onChangeOptionValue(e, i)}
                                       type="text"/>

                            </InputContainer>
                            <button onClick={()=>remove(i)} className={'w-7 h-7 bg-red-600 rounded'}>-</button>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default CustomOptions;
