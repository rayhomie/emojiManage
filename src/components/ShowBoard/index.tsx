import React, { useState } from 'react'
import EmojiManage from '../EmojiManage/index'
import EmojiSelect from '../EmojiSelect/index';
import './index.css'

interface propsType {

}
const ShowBoard: React.FC<propsType> = (props) => {
    const tabControlValue = ['emoji', '颜文字', '符号']
    const urlValue = [
        '/api/v1/index/package/3454?offset=0&limit=18',
        '/api/v1/index/package/3391?offset=0&limit=18',
        '/api/v1/index/package/3537?offset=0&limit=18',
        '/api/v1/index/package/3536?offset=0&limit=18',
        '/api/v1/index/package/875?offset=0&limit=18',
        'api/v1/index/package/3535?offset=0&limit=18'
    ]
    const tabbarValue = ['小锅', '小闪酱', '艾莉酱', '蛋黄酱', '高汤', '世小喵']
    const [allState, setAllState] = useState(false)
    const [selectState, setSelectState] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [inputIndex, setInputIndex] = useState(0)
    return (
        <div className='' style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,0)'
        }}
        >
            <div style={{ position: 'absolute', top: '-300px', left: '-50px' }}>
                <EmojiManage
                    url={urlValue}
                    tabbar={tabbarValue}
                    tabControl={tabControlValue}
                    allStateCallback={(state) => {
                        setAllState(state)
                    }}
                    allState={allState}
                />
            </div>
            <div
                style={{ height: '20px', width: '20px', float: 'left' }}
                onClick={() => {
                    setAllState(!allState)
                }}
            >
                🏷
            </div>
            <div
                onMouseEnter={() => {
                    setTimeout(() => {
                        setSelectState(true)
                    }, 0)
                }}
                onClick={() => {
                    setSelectState(!selectState)
                }}
                style={{ height: '20px', width: '20px', float: 'left' }}
            >
                ☺
            </div>
            <textarea
                style={{ height: '100px', width: '300px', float: 'left', clear: 'both' }}
                className='main-input'
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                onBlur={(e) => {
                    setInputIndex(e.target.selectionStart)
                }}
            />
            <div
                style={{ position: 'absolute', top: '-100px' }}
            >
                <EmojiSelect
                    EmojiSelectState={selectState}
                    EmojiSelectStateCallback={(state) => {
                        setSelectState(state)
                    }}
                    inputCallback={(value) => {//子传父，获取值
                        function solveSplice(arr: any, index: number, value: string) {
                            arr.splice(index, 0, value)
                            return arr
                        }
                        setInputValue(solveSplice(inputValue.split(''), inputIndex, value).join(''))
                    }}
                />
            </div>
        </div>
    )
}
export default ShowBoard