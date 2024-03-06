'use client'

import css from '@/styles/estilos.module.scss'
import url from '@/components/utils'

import { card, formCrud } from '@/components/layoutsComponents';

import { useEffect, useState, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Page() {
    const myElementRef = useRef(null);
    //REDIRECT
    const router = useRouter()

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //ELEMENTOS DO HTML
    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaCursos, setListaCurso] = useState([]);

    useEffect(() => {

        async function selectCursos() {
            try {
                const response = await axios.get(url.cursos);
                const dados = response.data;

                const listaCursos = dados.map(item => (
                    { text: `${item.nome} - ${item.turno}`, value: `${item.cod}` }
                ));

                setListaCurso(listaCursos);

            } catch (error) {
                console.log(error);
            }
        }

        selectCursos()

        async function selectAll() {
            try {
                const response = await axios.get(url.grades);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.curso.sigla} - ${item.curso.turno}`,
                            p: [
                                `Ano: ${item.ano}`,
                                `Semestre: ${item.semestre}`
                            ]
                        }
                    }
                ))

                setListaDeObjetos(listaDeObjetos);

            } catch (error) {
                console.log(error);
            }
        }

        selectAll();

    }, []);

    const criar = () => {
        let codCurso = document.querySelector('select').value
        localStorage.setItem('codCurso', codCurso)
        router.push('/secretaria/grades/montar')
    }

    return (
        <section className={css.form} ref={myElementRef}>
            <div className={css.center}>
                <h1 className={css.h1}>Visualizar Grade</h1>
                <FontAwesomeIcon className={css.icon} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
            </div>

            {card(listaDeObjetos, '/secretaria/grades', [])}

            <Modal className={css.modal} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o Curso</Modal.Title>
                </Modal.Header>
                <Modal.Body className={css.modalContent}>
                    {formCrud(
                        {
                            layout: [
                                { tag: "select", nome: "Selecione o Curso", lista: listaCursos }
                            ]
                        }
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button className={css.btn} onClick={criar}>
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}