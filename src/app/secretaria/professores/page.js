"use client"

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { formCrud, card } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default function Page() {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function selectAll() {
            try {
                const response = await axios.get(url.professores);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.titulacao} - ${item.usuario.nome}`,
                            p: [
                                `Email Corp.: ${item.usuario.emailCorp}`,
                                `Email Pessoal: ${item.usuario.emailPessoal}`
                            ]
                        }
                    }
                ))

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectAll()

        const insert = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cpf: document.querySelector('input[name="cpf"]').value,
                dataNasc: document.querySelector('input[name="Data Nasc."]').value,
                emailPessoal: document.querySelector('input[name="Email Pessoal"]').value,
                titulacao: document.querySelector('input[name="Titulação"]').value
            }

            axios.post(url.professores, data)
                .then(response => {
                    console.log(response.data);
                    selectAll();
                })
                .catch(error => (console.log(error)))
        }

        const update = () => {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cpf: document.querySelector('input[name="cpf"]').value,
                dataNasc: document.querySelector('input[name="Data Nasc."]').value,
                emailPessoal: document.querySelector('input[name="Email Pessoal"]').value,
                titulacao: document.querySelector('input[name="Titulação"]').value
            }

            axios.put(`${url.professores}/${localStorage.getItem('codProf')}`, data)
                .then(response => {
                    console.log(response.data);
                    selectAll();
                })
                .catch(error => (console.log(error)))
        }

        function selectById(cod) {
            handleShow()

            axios.get(`${url.professores}/${cod}`)
                .then(response => {
                    localStorage.setItem('codProf', response.data.cod)
                        document.querySelector('input[name="Nome"]').value = response.data.usuario.nome
                        document.querySelector('input[name="cpf"]').value = response.data.usuario.cpf
                        document.querySelector('input[name="Email Pessoal"]').value = response.data.usuario.emailPessoal
                        document.querySelector('input[name="Titulação"]').value = response.data.titulacao

                        if (response.data.usuario.dataNasc[1] < 10) {
                            response.data.usuario.dataNasc[1] = `0${response.data.usuario.dataNasc[1]}`
                        }

                        if (response.data.usuario.dataNasc[2] < 10) {
                            response.data.usuario.dataNasc[2] = `0${response.data.usuario.dataNasc[2]}`
                        }

                        document.querySelector('input[name="Data Nasc."]').value = `${response.data.usuario.dataNasc[0]}-${response.data.usuario.dataNasc[1]}-${response.data.usuario.dataNasc[2]}`
                })
                .catch(error => (console.log(error)))
        }

        function deleteById(cod) {
            axios.delete(`${url.professores}/${cod}`)
                .then(response => {
                    console.log(response.data);
                    selectAll();
                })
                .catch(error => (console.log(error)))
        }

        setlistaFuncs({ selectById: selectById, deleteById: deleteById })

        setFuncs({ insert: insert, update: update })

    }, [])

    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Manter Professor</h1>
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
                                { tag: "input", nome: "cpf", tipo: "text" },
                                { tag: "input", nome: "Data Nasc.", tipo: "date" },
                                { tag: "input", nome: "Titulação", tipo: "text" },
                                { tag: "input", nome: "Email Pessoal", tipo: "email" }
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