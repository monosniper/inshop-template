import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useDebounce} from "use-debounce";
import {$promoTypes} from "../../utils/config";
import shop from "../../store/shop";

const PromoField = ({promocode, isCorrect, setPromoForUpd}) => {
    const { t, i18n } = useTranslation();
    const [promo, setPromo] = useState(null)
    const [value] = useDebounce(promo, 500)
    const [isCorrectText, setIsCorrectText] = useState(null)

    const handleChangePromo = (e) => {
        setPromo(e.target.value)
    }

    useEffect(() => {
        if(value) {
            setPromoForUpd(value.trim())

        }
    }, [value])

    useEffect(() => {
        setIsCorrectText(isCorrect !== null ? <p style={{color: isCorrect ? '#37c737' : 'red'}}>
            {isCorrect ? t('promo_correct') + ' ' + promocode.data.code + ': ' : t('promo_incorrect')} {isCorrect ? '-'+(promocode.data.type === $promoTypes.percent ? promocode.data.value + '%' : promocode.data.value + shop.options.currency) : ''}
        </p> : null)
    }, [isCorrect])

    return (
        <Field title={t('promocode')} editable subText={isCorrectText}>
            <input value={promo} onChange={handleChangePromo} placeholder={'Промокод'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default PromoField;