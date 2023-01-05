import axios from 'axios';
import Menu from 'components/Menu';
import React, { useEffect, useState } from 'react';
import env from 'react-dotenv';
import { useNavigate, useParams, } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useDetailsState } from 'state/atom';
import styles from './Details.module.scss';
import { HiArrowLongLeft } from "react-icons/hi2";

export default function Details() {
    const { id } = useParams()
    const navigate = useNavigate()

    const setProgram = useSetRecoilState(useDetailsState)
    const program = useRecoilValue(useDetailsState)
    // console.log(program)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${env.API_KEY}&language=pt-BR`)
            .then((res) => {
                // console.log(res)
                setProgram(res.data)
            })
            .catch((err) => {

            })
        axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${env.API_KEY}&language=pt-BR`)
            .then(res => {
                if (res.data.results.BR) {
                    console.log(res.data.results.BR)
                } else {
                    console.log('Não está disponivel nos Servidores brasileiros')
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const dataFormat = (data: string) => {
        const arr = data.split('-')
        const ano = arr[0]
        const mes = arr[1]
        const dia = arr[2]

        return (`${dia}/${mes}/${ano}`)
    }
    const data = dataFormat(program.release_date)
    return (
        <>
            <section className={styles.container}>
                <Menu />
                <img className={styles.container__backdrop} aria-hidden='true' src={`https://image.tmdb.org/t/p/original/${program.backdrop_path || program.poster_path}`} />
            </section>
            <section className={styles.details}>
                <button className={styles.details__back} onClick={() => navigate('/')}><HiArrowLongLeft className={styles.details__arrow} /> Voltar</button>
                <img className={styles.details__poster} src={`https://image.tmdb.org/t/p/original/${program.poster_path}`} alt={`Poster do filome ${program.title}`} />
                <h2 className={styles.details__title}>{program.title}</h2>
                <p className={styles.details__text}>{program.overview}</p>
                <ul className={styles.details__list}>
                    <li className={styles.details__item}>Lançamento - {data}</li>
                    <li className={styles.details__item}> {program.runtime} minutos</li>
                </ul>
                <ul className={styles.details__genres}>{program.genres.map(genre =>
                    <li className={styles.details__genreItem} key={genre.name}>{genre.name}</li>)}
                </ul>
            </section>
        </>
    )
}