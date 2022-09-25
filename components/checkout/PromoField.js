import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useDebounce} from "use-debounce";
import {$promoTypes} from "../../utils/config";
import shop from "../../store/shop";
import {showMessage} from "../../utils/showMessage";
import {showError} from "../../utils/showError";

const PromoField = ({promo, setPromo, setPromoForUpd}) => {
    const { t, i18n } = useTranslation();
    const [value] = useDebounce(promo, 500)
    const [isCorrect, setIsCorrect] = useState(null)
    const [promocode, setPromocode] = useState(null)
    const [isCorrectText, setIsCorrectText] = useState(null)

    const handleChangePromo = (e) => {
        setPromo({
            code: e.target.value,
            isCorrect,
            data: promocode
        })
    }

    useEffect(() => {
        if(value) {
            if(value.code.trim() !== '') {
                shop.checkPromo(value.code.trim()).then(rs => {
                    if(rs) {
                        setPromocode(rs)
                        setIsCorrect(true)
                        setPromoForUpd({
                            code: promo.code,
                            isCorrect: true,
                            data: rs
                        })
                    } else {
                        setPromocode(null)
                        setIsCorrect(false)
                        setPromoForUpd({
                            code: promo.code,
                            isCorrect: false,
                            data: null
                        })
                    }
                })
            } else {
                setIsCorrect(null)
            }
        }
    }, [value])

    useEffect(() => {
        setIsCorrectText(isCorrect !== null ? <p style={{color: isCorrect ? '#37c737' : 'red'}}>
            {isCorrect ? t('promo_correct') + ' ' + promocode.code + ': ' : t('promo_incorrect')} {isCorrect ? '-'+(promocode.type === $promoTypes.percent ? promocode.value + '%' : promocode.value + shop.options.currency) : ''}
        </p> : null)
    }, [isCorrect])

    return (
        <Field title={t('promocode')} editable subText={isCorrectText}>
            <input value={promo.code} onChange={handleChangePromo} placeholder={'Промокод'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default PromoField;