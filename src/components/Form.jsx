'use client'
import axios from 'axios'
import {useEffect, useState} from "react";
import InputContainer from "@/components/InputContainer";
import Row from "@/components/Row";
import BrowserSelect from "@/components/BrowserSelect";
import CustomOptions from "@/components/CustomOptions";

axios.defaults.baseURL = 'http://38.54.122.209:5000'

const Form = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState(16)

    const [operatingSystems, setOperatingSystem] = useState([])
    const [selectedOs, setSelectedOs] = useState()

    const [browsers, setBrowsers] = useState()
    const [selectedBrowsers, setSelectedBrowsers] = useState([])
    const browserSelect = browserToSelect => {
        setBrowsers(prev => prev.filter(browser => browser !== browserToSelect))
        setSelectedBrowsers(prev => [...prev, browserToSelect])

    }
    const browserUnselect = browserToUnselect => {
        setSelectedBrowsers(prev => prev.filter(browser => browser !== browserToUnselect))
        setBrowsers(prev => [...prev, browserToUnselect])
    }

    const [options, setOptions] = useState([{name: '', value: ''}])
    const addOption = () => setOptions(prev => [...prev, {name: '', value: ''}])
    const deleteOption = (i) => {
        const newOptions = [...options]
        newOptions.splice(i, 1)
        setOptions(newOptions)
    }
    const onChangeOptionName = (e, i) => {
        const name = e.target.value
        setOptions(prev => prev.map((option, index) => {
            if (i === index) return {...option, name}
            return option
        }))
    }
    const onChangeOptionValue = (e, i) => {
        const value = e.target.value
        setOptions(prev => prev.map((option, index) => {
            if (i === index) return {...option, value}
            return option
        }))
    }

    const submit = async () => {
        try {

            const custom_parameters = {}
            const emptyOptionName = options.some(option => option.name === '') ? ' Немає назв(и) в кастомних параметрах' : ''
            console.log({emptyOptionName})

            const emptyName = name === '' ? 'Немає імені' : ''
            const emptyBrowsers = !selectedBrowsers.length ? 'Не вибрано жодного браузера' : ''
            if (emptyOptionName || emptyName || emptyBrowsers) {
                setError(`${emptyName} ${emptyBrowsers} ${emptyOptionName}`)
                return
            }
            setError('')
            options.forEach(({name, value}) => {
                custom_parameters[name] = value
            })
            const data = {
                name,
                age,
                "system": selectedOs,
                "browsers": selectedBrowsers,
                custom_parameters
            }
            const req = await axios.post('/post_test', data)
            console.log(req)
        } catch (e) {
            setError('невідома помилка. детільніше в консолі')
            console.log(e)
        }

    }

    //fetch data
    useEffect(() => {
        const getData = async () => {
            const {data} = await axios.get('/get_test')
            const {system, browsers} = data
            setOperatingSystem(system)
            setBrowsers(browsers)
            setSelectedOs(system[0])
        }
        try {
            getData()

        } catch (e) {
            console.log('err on get data', e)
        }

    }, [])

    return (
        <div className={'max-w-3xl w-96 flex flex-col gap-4'}>
            <Row>
                <InputContainer>
                    <label htmlFor="" className={'w-12'}>Name</label>
                    <input value={name} onChange={e => setName(e.target.value)}
                           className={'text-black text-sm px-2 py-1 rounded max-w-[140px]'} type="text"/>
                </InputContainer>
                <InputContainer variant={'row'}>
                    <label htmlFor="">Age</label>
                    <select value={age} onChange={e => setAge(e.target.value)}
                            className={'px-2 py-1 rounded text-black text-sm'} name=""
                            id="">
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                    </select>
                </InputContainer>
            </Row>
            <Row>
                <InputContainer>
                    <label htmlFor="" className={'w-12'}>OS</label>
                    <select value={selectedOs} onChange={e => setSelectedOs(e.target.value)}
                            className={'px-2 py-1 rounded w-[140px] text-black text-sm'} name="" id="">
                        {operatingSystems.map(os => <option key={os} value={os}>{os}</option>)}

                    </select>
                </InputContainer>
            </Row>
            <Row>
                <BrowserSelect browsers={browsers} selected={selectedBrowsers}
                               browserUnselect={browserUnselect} browserSelect={browserSelect}/>
            </Row>
            <Row>
                <CustomOptions options={options} add={addOption} remove={deleteOption}
                               onChangeOptionName={onChangeOptionName}
                               onChangeOptionValue={onChangeOptionValue}/>
            </Row>
            <button onClick={submit} type={'button'} className={'bg-blue-600 text-white rounded py-2 mt-4'}>Send
            </button>
            {error ? <span className={'text-red-600 text-sm'}>{error}</span> : <></>}
        </div>
    );
};

export default Form;
