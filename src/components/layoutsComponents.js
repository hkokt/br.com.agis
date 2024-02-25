
import camposStyle from '@/styles/campos.module.css'
import { input, select } from '@/components/crudComponents'

export function formCrud(props) {
    return (
        <>
            <div className={camposStyle.campos}>
                {
                    props.layout.map(field => (
                        <div className={camposStyle.campo} key={field.nome}>
                            {
                                field.tag === 'input' && (
                                    input({ nome: field.nome, tipo: field.tipo })
                                )
                            }
                            {
                                field.tag === 'select' && (
                                    select({ name: field.nome, options: field.lista })
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faBan } from '@fortawesome/free-solid-svg-icons'

import cardStyle from '@/styles/card.module.css'
import Link from 'next/link'

export function card(props, link, funcs) {
    return (
        <div className={cardStyle.overflow}>
            {
                props.map((item, i) => (
                    <div className={cardStyle.card} key={i}>
                        <div className={cardStyle.cardHead}>
                            <div>
                                {
                                    link != '' && (
                                        <Link href={`${link}/${item.body.cod}`}>{item.body.titulo}</Link>
                                    )
                                }
                                {
                                    link === '' && (
                                        <a>{item.body.titulo}</a>
                                    )
                                }
                                <input type='hidden' name="cod" value={item.body.cod}></input>
                            </div>
                            <div className={cardStyle.icons}>
                                {
                                    funcs.deleteById != null && (
                                        <FontAwesomeIcon icon={faTrash} onClick={() => funcs.deleteById(item.body.cod)} />
                                    )
                                }
                                {
                                    funcs.selectById != null && (
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => funcs.selectById(item.body.cod)} />
                                    )
                                }
                                {
                                    funcs.dispensarById != null && (
                                        <FontAwesomeIcon icon={faBan} onClick={() => funcs.dispensarById()} />
                                    )
                                }
                            </div>
                        </div>
                        <div className={cardStyle.cardBody}>
                            {
                                item.body.p.map((textos, i) => (
                                    <p key={i}>{textos}</p>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}