import React from 'react';
import {AiFillStar} from "react-icons/ai";
import styles from '../styles/components/Review.module.scss'
import {useTranslation} from "react-i18next";

const Review = ({ review }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.review}>
            <div className={styles.review__header}>
                <div className={styles.review__author}>
                    <a href={review.author_url} rel={'noreferrer'} className={'contrast_hover'} target={'_blank'}>{review.author_name}</a>
                </div>
                <div className={styles.review__rating}>
                    <AiFillStar />
                    {review.rating}
                </div>
            </div>

            <div className={styles.review__content}>
                {review.content}
            </div>

            <div className={styles.review__date}>
                {t('published')} {review.date_diff}
            </div>
        </div>
    );
};

export default Review;