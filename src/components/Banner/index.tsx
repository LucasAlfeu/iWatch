import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useBackdropState, useOverviewState, useTitleState } from "../../state/atom";
import styles from './Banner.module.scss'
import useTreendingProgram from "state/hook/useTreendingProgram";
import { Link } from "react-router-dom";

export default function Banner() {

    const { treendingProgram, location } = useTreendingProgram()

    const TitleTreending = useRecoilState(useTitleState)
    const overviewTreending = useRecoilState(useOverviewState)
    const backdropTreending = useRecoilState(useBackdropState)

    const backdrop = `https://image.tmdb.org/t/p/original/${backdropTreending[0]}`

    useEffect(() => {
        treendingProgram()
    }, [location.pathname])

    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
                <div>                
                    <h2 className={styles.banner__title}>{TitleTreending[0]}</h2>
                    <p className={styles.banner__overview}>{overviewTreending[0]}</p>
                    <button className={styles.banner__moreInformation}>Saiba Mais</button>
                </div>
                <span className={styles.banner__span}><Link to={'#'} className={styles.banner__link}>Destaques</Link></span>
            </div>
            <img className={styles.banner__img} src={backdrop} alt="Poster do filme" />
        </section>
    )
}