'use client'

import perfilStyle from '@/styles/perfil.module.css'
import url from '@/components/utils'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faBook, faPen } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

export default function ProfViewTurmaLayout({ children, params }) {
    const myElementRef = useRef(null);

    return (
        <div className={perfilStyle.site} ref={myElementRef}>
            <div className={perfilStyle.navigation}>
                <h1>Nome da turma</h1>
                <article>
                    <span>
                        <FontAwesomeIcon icon={faClipboard} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Realizar Chamada
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faBook} className={perfilStyle.iconSize} />
                        <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`#`}>
                            Consultar Chamada
                        </Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPen} className={perfilStyle.iconSize} />
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