"use client"

import cardStyle from '@/styles/card.module.css'

import { formCrud, card } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default function Page() {
    const url = 'http://localhost:8080'
    //https://api-agis.onrender.com

    const myElementRef = useRef(null);
    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function selectALL() {
            try {
                const response = (await axios.get(`${url}/curso`))
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.sigla} - ${item.turno}`,
                            p: [
                                `Nome: ${item.nome}`,
                                `Carga Horária: ${item.cargaHorario} horas`,
                                `Nota Enade: ${item.enade}`
                            ]
                        }
                    }
                ));

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectALL();

        const insert = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cargaHorario: document.querySelector('input[name="Carga horaria"]').value,
                sigla: document.querySelector('input[name="Sigla"]').value,
                enade: document.querySelector('input[name="Enade"]').value,
                turno: document.querySelector('select').value
            }

            axios.post(`${url}/curso`, data)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => console.log(error))
        }

        const update = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cargaHorario: document.querySelector('input[name="Carga horaria"]').value,
                sigla: document.querySelector('input[name="Sigla"]').value,
                enade: document.querySelector('input[name="Enade"]').value,
                turno: document.querySelector('select').value
            }

            axios.put(`${url}/curso/${localStorage.getItem('codCurso')}`, data)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => console.log(error))
        }

        function selectById(cod) {
            handleShow()

            axios.get(`${url}/curso/${cod}`)
                .then(response => (
                    localStorage.setItem('codCurso', response.data.cod),
                    document.querySelector('input[name="Nome"]').value = response.data.nome,
                    document.querySelector('input[name="Carga horaria"]').value = response.data.cargaHorario,
                    document.querySelector('input[name="Sigla"]').value = response.data.sigla,
                    document.querySelector('input[name="Enade"]').value = response.data.enade,
                    document.querySelector('select').value = response.data.turno
                ))
                .catch(error => (
                    console.log(error)
                ))
        }

        function deleteById(cod) {
            axios.delete(`${url}/curso/${cod}`)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => (console.log(error)))
        }

        setlistaFuncs({ selectById: selectById, deleteById: deleteById })

        setFuncs({ insert: insert, update: update })

    }, []);

    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Manter Curso</h1>
                <FontAwesomeIcon className={cardStyle.bt} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
            </div>

            {card(listaDeObjetos, '', listaFuncs)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        formCrud(
                            {
                                layout: [
                                    { tag: "input", nome: "Nome", tipo: "text" },
                                    { tag: "input", nome: "Carga horaria", tipo: "number" },
                                    { tag: "input", nome: "Sigla", tipo: "text" },
                                    { tag: "input", nome: "Enade", tipo: "number" },
                                    { tag: "select", nome: "Turno", lista: [{ text: 'Manhã', value: 'Manhã' }, { text: 'Tarde', value: 'Tarde' }, { text: 'Noite', value: 'Noite' }] }
                                ]
                            }
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={funcs.insert}>
                        Criar
                    </Button>
                    <Button variant="primary" onClick={funcs.update}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}