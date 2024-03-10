'use client'

import perfilStyle from '@/styles/perfil.module.css'
import url from '@/components/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faBook, faBookOpen, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef } from 'react'
import axios from 'axios'

import Link from 'next/link'

export default function SecViewAlunoLayout({ children, params }) {
    const myElementRef = useRef(null);

    useEffect(() => {

        axios.get(`${url.alunos}/${params.ra}`)
            .then(response => {
                document.querySelector('#nomes').innerHTML = `
                    <p>Nome: ${response.data.nome}</p>
                    <p>Nome Social: ${response.data.nomeSocial}</p>
                `
                document.querySelector('#contatos').innerHTML = `
                    <p>Emails</p>    
                    <p>${response.data.emailPessoal}</p>
                    <p>${response.data.emailCorp}</p>
                `
            })
            .catch(error => console.log(error))

    }, [])

    return (
        <article>
            <div className={perfilStyle.site} ref={myElementRef}>
                <div className={perfilStyle.col}>
                    <div className={perfilStyle.fotoDePerfil}>
                        <img src="https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-cone-de-linha-de-perfil-do-instagram.png"></img>
                        <div id="nomes">

                        </div>
                    </div>
                    <div id="contatos" className={perfilStyle.contatos}>
                        
                    </div>
                </div>

                <div className={perfilStyle.col}>
                    <div className={perfilStyle.navigation}>
                        <article>
                            <span>
                                <FontAwesomeIcon icon={faBookOpen} className={perfilStyle.iconSize} />
                                <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/secretaria/alunos/lista/${params.ra}`}>
                                    Visão geral
                                </Link>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faUser} className={perfilStyle.iconSize} />
                                <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/secretaria/alunos/lista/${params.ra}/dadosPessoais`}>
                                    Dados Pessoais
                                </Link>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBook} className={perfilStyle.iconSize} />
                                <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/secretaria/alunos/lista/${params.ra}/matriculas`}>
                                    Matriculas
                                </Link>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faGear} className={perfilStyle.iconSize} />
                                <Link style={{ textDecoration: 'none', padding: '0.5em', color: 'black' }} href={`/secretaria/alunos/lista/${params.ra}/configuracoes`}>
                                    Configurações
                                </Link>
                            </span>
                        </article>
                    </div>
                    <section>
                        {children}
                    </section>
                </div>
            </div>
        </article>
    )
}