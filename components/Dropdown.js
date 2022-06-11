import React, {useEffect, useState} from 'react';
import styles from "../styles/components/Dropdown.module.scss";

const Dropdown = (props) => {

    const [isOpen, setOpen] = useState(false);
    const [pageY, setPageY] = useState(0);
    const [pageX, setPageX] = useState(0);

    useEffect(() => {
        return () => {
            window.removeEventListener('click', globalClickListener)
        }
    }, [])

    const handleToggle = (event) => {
        setPageY(event.clientY)
        setPageX(event.clientX)
        event.stopPropagation()
        setOpen(!isOpen)
        window.addEventListener('click', globalClickListener)
    }

    const globalClickListener = () => {
        setOpen(false)
        window.removeEventListener('click', globalClickListener)
    }

    return (
        <div className={styles.dropdown}>
            <div className={styles.dropdown__target} onClick={handleToggle}>
                {props.target}
            </div>
            {isOpen ? (
                <div style={{top: `${pageY}px`, left: `${pageX}px`}} className={styles.dropdown__menu}>
                    {props.options.map((option, i) => (
                        <div key={'option-'+i} className={styles.dropdown__item} onClick={option.handle}>
                            {option.title}
                        </div>
                    ))}
                    {props.children}
                </div>
            ) : <></>}
        </div>
    );
};

export default Dropdown;