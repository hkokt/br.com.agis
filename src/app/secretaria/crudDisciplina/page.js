"use client"

import cardStyle from '@/styles/card.module.css'

import { useEffect, useState, useRef } from 'react';

import { card, formCrud } from '@/components/layoutsComponents';

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


    //DADOS
    const [listaCursos, setListaCurso] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false), localStorage.removeItem('codTurma') };
    const handleShow = () => setShow(true);

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

        async function selectALL() {
            try {
                const response = await axios.get(`${url}/disciplina`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.nome} - ${item.curso.sigla}/${item.curso.turno}`,
                            p: [
                                `Qtd. Aulas: ${item.qtdAulas}`,
                                `Semestre: ${item.semestre}`
                            ]
                        }
                    }
                ));

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }

            selectCursos()
        }

        selectALL()

        const insert = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                qtdAulas: document.getElementsByTagName('select')[0].value,
                semestre: document.querySelector('input[name="Semestre"]').value,
                codCurso: document.getElementsByTagName('select')[1].value,
            }

            axios.post(`${url}/disciplina`, data)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        const update = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                qtdAulas: document.getElementsByTagName('select')[0].value,
                semestre: document.querySelector('input[name="Semestre"]').value,
                codCurso: document.getElementsByTagName('select')[1].value,
            }

            axios.put(`${url}/disciplina/${localStorage.getItem('codDisci')}`, data)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        function selectById(cod) {
            handleShow()

            axios.get(`${url}/disciplina/${cod}`)
                .then(response => (
                    document.querySelectorAll('select').forEach((select, i) => {
                        if (i == 0) { select.value = response.data.qtdAulas }
                        if (i == 1) { select.value = response.data.curso.cod }
                    }),
                    localStorage.setItem('codDisci', response.data.cod),
                    document.querySelector('input[name="Nome"]').value = response.data.nome,
                    document.querySelector('input[name="Semestre"]').value = response.data.semestre
                ))
                .catch(error => (
                    console.log(error)
                ))
        }

        function deleteById(cod) {
            axios.delete(`${url}/disciplina/${cod}`)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        setlistaFuncs({ selectById: selectById, deleteById: deleteById })

        setFuncs({ insert: insert, update: update })
    }, [])

    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Manter Disicplina</h1>
                <FontAwesomeIcon className={cardStyle.bt} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
            </div>

            {card(listaDeObjetos, '', listaFuncs)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "Nome", tipo: "text" },
                                { tag: "select", nome: "Qtd. Aula", lista: [{ text: 0, value: 0 }, { text: 2, value: 2 }, { text: 4, value: 4 }] },
                                { tag: "input", nome: "Semestre", tipo: "number" },
                                { tag: "select", nome: "Cursos", lista: listaCursos }
                            ]
                        }
                    )}
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