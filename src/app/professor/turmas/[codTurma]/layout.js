'use client'

import perfilStyle from '@/styles/perfil.module.css'
import url from '@/components/utils'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faMap, faEnvelopeOpenText, faPen } from '@fortawesome/free-solid-svg-icons'
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
        <div className={perfilStyle.site} ref={myElementRef}>
            <h1></h1>
            <div className={perfilStyle.navigation}>
                <article>
                    <span>
                        <FontAwesomeIcon icon={faClipboard} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/professor/turmas/${params.codTurma}`}>
                            Chamadas
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faMap} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Planejamento
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPen} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Notas
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faEnvelopeOpenText} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Solicitações
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