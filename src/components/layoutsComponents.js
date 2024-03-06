import css from '@/styles/estilos.module.scss';
import { input, select } from '@/components/crudComponents';

export function formCrud(props) {
    return (
        <>
            <div>
                {
                    props.layout.map(field => (
                        <div key={field.nome}>
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

import Link from 'next/link'

export function card(props, link, funcs) {

    return (
        <div className={css.table}>
            {
                props.map((item, i) => (
                    <div className={css.card} key={i}>
                        <div className={css.cardHead}>
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
                            <div className={css.icons}>
                                {
                                    funcs.deleteById != null && (
                                        <FontAwesomeIcon className={css.icon} icon={faTrash} onClick={() => funcs.deleteById(item.body.cod)} />
                                    )
                                }
                                {
                                    funcs.selectById != null && (
                                        <FontAwesomeIcon className={css.icon} icon={faPenToSquare} onClick={() => funcs.selectById(item.body.cod)} />
                                    )
                                }
                                {
                                    funcs.dispensarById != null && (
                                        <FontAwesomeIcon className={css.icon} icon={faBan} onClick={() => funcs.dispensarById()} />
                                    )
                                }
                            </div>
                        </div>
                        <div className={css.cardBody}>
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

import { Button, Modal } from 'react-bootstrap';

export function modal(show, handleClose, mensagem, funcs, layout) {

    return (
        <Modal className={css.modal} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className={css.title}>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body className={css.modalContent}>
                {
                    formCrud(
                        layout
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    mensagem === 'criar' && (
                        <Button className={css.btn} onClick={funcs.insert}>
                            Criar
                        </Button>
                    )
                }
                {
                    mensagem === 'atualizar' && (
                        <Button className={css.btn} onClick={funcs.update}>
                            Atualizar
                        </Button>

                    )
                }
            </Modal.Footer>
        </Modal>
    )
}

export function A(props) {

    return <a href={props.href} target="_blank" className={css.link} > {props.value}</a >

}

export function Footer() {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <div className={css.footer}>
            Follow&trade;
            <br />
            Todos os direitos reservados &copy; {year}
            <br />
            <br />
            Developed by
            <br />
            <A href="https://github.com/MDellaCS" value="Matheus Della" />&nbsp;-&nbsp;
            <A href="https://github.com/hkokt" value="Hugo Koketu" />&nbsp;-&nbsp;
            <A href="https://github.com/Frm2003" value="Felippe Ramos" />
        </div>
    )
}