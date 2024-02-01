'use client'

import perfilStyle from '@/styles/perfil.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faBook, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

export default function SecViewAlunoLayout({ children }) {
    return (
        <article>
            <div className={perfilStyle.site}>
                
                <div className={perfilStyle.col}>
                    <div className={perfilStyle.fotoDePerfil}>
                        <img src="https://images.vexels.com/media/users/3/147103/isolated/preview/e9bf9a44d83e00b1535324b0fda6e91a-cone-de-linha-de-perfil-do-instagram.png"></img>
                        <div>
                            <p>Nome: Aluno </p>
                            <p>Nome Social: </p>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className={perfilStyle.col}>

                    <div className={perfilStyle.navigation}>
                        <article>
                            <span>
                                <FontAwesomeIcon icon={faUser} size='xl'/>
                                <p>Dados Pessoais</p>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBook} size='xl'/>
                                <p>Matriculas</p>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faEnvelopeOpenText} size='xl'/>
                                <p>Solicitações</p>
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faGear} size='xl'/>
                                <p>Configurações</p>
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