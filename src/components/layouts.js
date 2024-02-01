import btStyle from '../styles/botoes.module.css'

import camposStyle from '../styles/campos.module.css'
import { input, select, checkBox } from './crudComponents'

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
                            {
                                field.tag === 'checkBox' && (
                                    checkBox({ nome: field.nome, tipo: field.tipo, text: field.text })
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

import cardStyle from '../styles/card.module.css'

export function card(props) {
    return (
        <>
            {
                props.map((item, i) => (
                    <div className={cardStyle.card} key={i}>
                        {console.log(item.body[1])}
                        <div className={cardStyle.cardHead}>
                            <h3>{item.body[3].sigla} - {item.body[3].turno}</h3>
                        </div>
                        <div className={cardStyle.cardBody}>
                            <p>Semestre: {item.body[2]}</p>
                            <p>Ano: {item.body[1]}</p>
                        </div>
                        <div className={cardStyle.cardFooter}>
                            <button className={btStyle.btForm}>Editar</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
/* */