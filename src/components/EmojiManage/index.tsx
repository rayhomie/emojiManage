import React, { useState, useEffect } from 'react'
import './index.css'
import close from '../../assets/icon/close.png'
import search from '../../assets/icon/search.png'

const getEmoji = (url: string) => {
    return fetch(url).then(data => data.json().then(data => data.data))
}

interface propsType {
    url: Array<string>//必须传且数组长度大于1
    tabbar: Array<string>
    tabControl: Array<string>
    allStateCallback: (state: boolean) => void//子传父，父接收状态
    allState: boolean //父传子状态
}

const EmojiManage: React.FC<propsType> = (props) => {

    const [emojiList, setEmojiList] = useState([])
    const [tabControlState, setTabControlState] = useState(0)
    const [tabBarState, setTabBarState] = useState(0)
    // const [all, setAll] = useState(props.allState)//可以不用
    const [selectUrl, setSelectUrl] = useState('')
    const [moveImg, setMoveImg] = useState(false)
    useEffect(() => {
        getEmoji(props.url[0]).then(data => {
            // console.log(data)
            setEmojiList(data)
        })
    }, [])
    // 顶部控制栏
    const tabControl = (arr: Array<string>): any => {
        return arr.map((item, index) => {
            return (
                <div key={item} className='tab-control-item' style={tabControlState === index ? {
                    backgroundColor: '#5eb1f6',
                    color: 'white'
                } : {}}
                    onClick={() => { tabControlClick(index) }}
                >
                    {item}
                </div >
            )
        })
    }
    const tabControlClick = (index: number): any => {
        setTabControlState(index)
    }
    // 表情容器
    const emoji = (arr: Array<string>): any => {
        return arr.map((item, index) => {
            return (
                <img
                    className='emoji'
                    key={item}
                    src={item}
                    alt={item}
                    style={tabControlState === 0 ? {} : {
                        display: 'none'
                    }}
                    onClick={() => {
                        // console.log(arr[index])
                        setSelectUrl(arr[index])
                        setMoveImg(false)
                    }}
                />
            )
        })
    }
    // 底部控制栏
    const tabBar = (arr: Array<string>): any => {
        return arr.map((item, index: number) => {
            return (
                <div key={item} className='tab-bar-item' style={tabBarState === index ? {
                    backgroundColor: '#5eb1f6',
                    color: 'white'
                } : {}} onClick={() => { tabBarClick(index) }}>{item}</div>
            )
        })
    }
    // 底部控制栏切换
    const tabBarClick = (index: number): any => {
        tabBarState === index ? console.log() :
            getEmoji(props.url[index]).then(data => {
                console.log(index)
                setEmojiList(data)
                setTabBarState(index)
            })
    }
    return (
        <div
            className='emoji-manage-main'
            style={props.allState ? {} : { display: 'none' }}
        >
            <img
                className='close'
                src={close}
                alt='close'
                onClick={() => {
                    // setAll(all);
                    props.allStateCallback(!props.allState)//传父状态
                }}
            />
            <div className='tab-control'>
                {tabControl(props.tabControl)}
                <div className='tab-control-item-input'>
                    <input />
                    <img className='search' src={search} alt='search' />
                </div>
            </div>
            <div className="emoji-container">
                {emoji(emojiList.map(i => i['thumb_url']))}
            </div>
            <div className='tab-bar' style={tabControlState === 0 ? {} : {
                display: 'none'
            }}>
                {tabBar(props.tabbar)}
            </div>
            <div
                style={
                    (selectUrl && moveImg === false) ? {
                        transform: 'translate(130px,-220px)',
                        height: '150px',
                        width: '150px'
                    } : { display: 'none' }
                }
                onClick={() => {
                    setMoveImg(true)
                }}
            >
                <img
                    src={selectUrl}
                    alt=""
                    style={{
                        height: '150px',
                        width: '150px'
                    }}
                />
                <p>点击关闭</p>
            </div>
        </div>
    )
}





export default EmojiManage