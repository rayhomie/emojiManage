import React, { useState, useEffect } from 'react'
import { setTimeout } from 'timers';
import './index.css';

interface propsType {
    EmojiSelectState: boolean
    EmojiSelectStateCallback: (state: boolean) => void
    inputCallback: (value: string) => void
}
const emojiList = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
    '😋', '😍', '😎', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩',
    '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮',
    '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤',
    '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞',
    '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬',
    '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒',
    '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭',
    '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '☠️', '👻', '👽',
    '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾',
    '🙈', '🙊', '🙉', '💔', '💙', '💚', '💛', '🧡', '💜', '🖤',
]

const EmojiSelect: React.FC<propsType> = (props) => {
    const [allState, setAllState] = useState(props.EmojiSelectState)
    const [leaveAnim, setLeaveAnim] = useState(false)
    const emojiBoard = (arr: Array<string>): any => {
        return arr.map((item, index) => {
            return (
                <div
                    id={item}
                    key={item}
                    style={{ height: '24px', width: '20px' }}
                    onClick={() => {
                        console.log(item);
                        props.inputCallback(item)
                    }}
                >
                    {item}
                </div>
            )
        })
    }
    useEffect(() => {
        setAllState(props.EmojiSelectState)
    }, [props.EmojiSelectState])
    return (
        <div
            className={leaveAnim ? 'emoji-select-main leave' : 'emoji-select-main'}
            style={allState ? {} : { display: 'none' }}
            onMouseEnter={() => {
                setTimeout(() => {
                    setAllState(true)
                    props.EmojiSelectStateCallback(true)
                }, 0)
            }}
            onMouseLeave={() => {
                setTimeout(() => {
                    setLeaveAnim(true)
                    setTimeout(() => {
                        setAllState(false)
                        props.EmojiSelectStateCallback(false)
                        setLeaveAnim(false)
                    }, 1000)
                }, 100)
            }}
        >
            {emojiBoard(emojiList)}
        </div>
    )
}

export default EmojiSelect