'use client'

import css from '@/styles/estilos.module.scss';

import url from '@/components/utils'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faBook, faPen } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

export default function ProfViewTurmaLayout({ children, params }) {
    const myElementRef = useRef(null);

    useEffect(() => {
        axios.get(`${url.turmas}/${params.codTurma}`)
            .then(response => {
                document.querySelector('h1').innerHTML = `${response.data.disciplina.nome}`
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className={css.site} ref={myElementRef}>
            <h1></h1>
            <div className={css.navigation}>
                <article>
                    <span>
                        <FontAwesomeIcon icon={faClipboard} className={css.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/professor/turmas/${params.codTurma}`}>
                            Realizar Chamada
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBook} className={css.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Consultar Chamada
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPen} className={css.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Notas
                        </Link>
                    </span>
                </article>
            </div>
            <section>
                {children}
            </section>
        </div>
    )
}