'use client'
import React, {useState} from 'react';

const BrowserSelect = ({browsers = [], selected = [], browserUnselect, browserSelect}) => {
    const [showBrowsers, setShowBrowsers] = useState(false)
    const toggleShowBrowsers = () => setShowBrowsers(prev => !prev)
    return (
        <div className={'w-full flex flex-col'}>
            <label htmlFor="">Browser</label>
            <div className={'w-full flex'}>

                <ul className={'w-full h-8 p-1 bg-white list-none flex items-center gap-1   '}>
                    {
                        selected.map(browser =>
                            <li className={'h-6 w-fit px-1 rounded bg-gray-400 cursor-pointer'} onClick={() => browserUnselect(browser)}
                                key={browser}>{browser}</li>
                        )
                    }
                </ul>
                <div className={'w-8 h-8 relative'}>
                    <button onClick={toggleShowBrowsers} type={'button'} className={'w-8 h-8 bg-blue-600 text-white font-bold text-lg'}>+</button>
                    {
                        showBrowsers ?

                            <ul className={'absolute left-8 top-0'}>
                                {browsers.map(browser =>
                                    <li onClick={() => browserSelect(browser)}
                                        className={'bg-blue-800 p-2 cursor-pointer text-white'} key={browser}>{browser}</li>
                                )}
                            </ul>

                            :

                            <></>
                    }

                </div>

            </div>

        </div>

    );
};

export default BrowserSelect;
