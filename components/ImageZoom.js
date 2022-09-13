import {useMemo, useState} from "react";
import {observer} from "mobx-react-lite";

const ImageZoom = ({ src, alt }) => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const style = useMemo(() => {
        return {
            backgroundImage: `url(${src})`,
            backgroundPosition: `${x}% ${y}%`
        }
    }, [src, x, y])

    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        setX((e.pageX - left) / width * 100)
        setY((e.pageY - top) / height * 100)
    }

    return <figure onMouseMove={handleMouseMove} style={style}>
        <img src={src} alt={alt}/>
    </figure>
}

export default observer(ImageZoom)