import React, { useState } from 'react'

interface propsType {
    message?: string
}
const Hello: React.FC<propsType> = (props) => {
    const [count, setCount] = useState<number>(0)
    return (<div>
        <h2>{props.message}</h2>
        <h2 onClick={() => setCount(count + 1)}>{count}</h2>
    </div>)
}

Hello.defaultProps = {
    message: 'Default Hello'
}

export default Hello