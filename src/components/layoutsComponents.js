import btStyle from '../styles/botoes.module.css'

import camposStyle from '../styles/campos.module.css'
import { input, select } from './crudComponents'

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

import tableStyle from '../styles/table.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export function tableCrud(props, titles, funcs) {
    return (
        <div className={tableStyle.divTable}>
            <table>
                <thead>
                    <tr>
                        {
                            titles.map(th => (
                                <th key={th}>
                                    <div>{th}</div>
                                </th>
                            ))
                        }
                        <th colSpan={2}><div>Ações</div></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.map((item, i) => (
                            <tr key={i}>
                                {
                                    item.body.map((text, i) => (
                                        <td key={i}><div>{text}</div></td>
                                    ))
                                }
                                {
                                    funcs.selectById != null && (
                                        <td>
                                            <div>
                                                <button className={btStyle.btForm} onClick={() => funcs.selectById(item.body[0])}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </div>
                                        </td>
                                    )
                                }
                                {
                                    funcs.deleteById != null && (
                                        <td>
                                            <div>
                                                <button className={btStyle.btForm} onClick={() => funcs.deleteById(item.body[0])}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </td>
                                    )
                                }

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

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
                            </div>
                            <div className={cardStyle.icons}>
                                {
                                    funcs.deleteById != null && (
                                        <FontAwesomeIcon icon={faTrash} onClick={() => funcs.deleteById(item.body.cod)}/>
                                    )
                                }
                                {
                                    funcs.selectById != null && (
                                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => funcs.selectById(item.body.cod)}/>
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