import axios from 'axios';
import Menu from 'components/Menu';
import React, { useEffect, useState } from 'react';
import env from 'react-dotenv';
import { useNavigate, useParams, } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useDetailsState } from 'state/atom';
import styles from './Details.module.scss';
import { HiArrowLongLeft } from "react-icons/hi2";
import useDetails from 'state/hook/useDetails';
import SimilarMovies from './SimilarMovies';
import FavoriteButton from 'components/FavoriteButton';

export default function Details() {
    const { dataFormat, navigate, id } = useDetails()
    const program = useRecoilValue(useDetailsState)

    const data = dataFormat(program.release_date)
    return (
        <>
            <section className={styles.container}>
                <Menu />
                <img className={styles.container__backdrop} aria-hidden='true' src={`https://image.tmdb.org/t/p/original/${program.backdrop_path || program.poster_path}`} />
            </section>
            <button className={styles.details__back} onClick={() => navigate('/')}><HiArrowLongLeft className={styles.details__arrow} /> Voltar</button>
            <section className={styles.details}>
                <div className={styles.box1}>
                    <img className={styles.details__poster} src={`https://image.tmdb.org/t/p/original/${program.poster_path}`} alt={`Poster do filome ${program.title}`} />
                </div>
                <div className={styles.box2}>
                    <h2 className={styles.details__title}>{program.title}</h2>
                    <p className={styles.details__text}>{program.overview}</p>
                    <ul className={styles.details__list}>
                        <li className={styles.details__item}>Lançamento - {data}</li>
                        <li className={styles.details__item}> {program.runtime} minutos</li>
                    </ul>
                </div>
                <ul className={styles.details__genres}>{program.genres.map(genre =>
                    <li className={styles.details__genreItem} key={genre.name}>{genre.name}</li>)}
                </ul>
            </section>
            <SimilarMovies idMovie={id} />
        </>
    )
}