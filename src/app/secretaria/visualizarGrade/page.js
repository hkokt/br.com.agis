'use client'

import cardStyle from '@/styles/card.module.css'
import camposStyle from '@/styles/campos.module.css'

import { card } from '@/components/layoutsComponents';
import { select } from '@/components/crudComponents';

import { useEffect, useState, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Page() {
    const url = 'http://localhost:8080'
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
                const response = await axios.get(`${url}/curso`);
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
                const response = await axios.get(`${url}/gradeCurricular`);
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
        router.push('/secretaria/montarGrade')
    }

    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Visualizar Grade</h1>
                <FontAwesomeIcon className={cardStyle.bt} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
            </div>

            {card(listaDeObjetos, '/secretaria/visualizarGrade', [])}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o Curso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={camposStyle.campo}>
                        {select(
                            { name: 'Selecione o curso', options: listaCursos }
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={criar}>
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}