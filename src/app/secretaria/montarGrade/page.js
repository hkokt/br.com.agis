'use client'

import cardStyle from '@/styles/card.module.css'

import { card, formCrud, tableCrud } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button, Modal } from 'react-bootstrap';

import axios from 'axios';

export default function Page() {
    const url = 'http://localhost:8080'
    const myElementRef = useRef(null);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const create = () => {
        let selects = document.querySelectorAll('select')

        let html = `
            <div class="card_card__ppk8h">
                <div class="card_cardHead__mcHRd">
                    <a><span id="disciplina">${selects[3].children[[selects[3].selectedIndex]].textContent}</span></a>
                </div>
                <div class="card_cardBody__yCjS5">
                    <p>De <span>${selects[0].children[[selects[0].selectedIndex]].textContent}</span> até <span>${selects[1].children[[selects[1].selectedIndex]].textContent}</span></p>
                    <p>Dia da Semana: <span>${selects[2].children[[selects[2].selectedIndex]].textContent}</span></p>
                    <p>Professor: <span>${selects[4].children[[selects[4].selectedIndex]].textContent}</span></p>
                </div>
            </div>
        `

        document.querySelector('.card_overflow__zHy06').innerHTML += html
    }

    const remove = () => {

    }

    const insert = () => {
        
    }

    //LISTAS
    const horarios = [{ text: '13:00', value: '13:00' }, { text: '14:50', value: '14:50' }, { text: '16:30', value: '16:30' }, { text: '18:20', value: '18:20' }]
    const diasDaSemana = [{ text: 'Segunda', value: 'Segunda' }, { text: 'Terça', value: 'Terça' }, { text: 'Quarta', value: 'Quarta' }, { text: 'Quinta', value: 'Quinta' }, { text: 'Sexta', value: 'Sexta' }, { text: 'Sabádo', value: 'Sabádo' }]

    //DADOS
    const [listaDisciplinas, setListaDisciplinas] = useState([]);
    const [listaProfessores, setListaProfessores] = useState([]);

    useEffect(() => {
        axios.get(`${url}/curso/${localStorage.getItem('codCurso')}`)
            .then(response => (
                document.querySelector('h1').textContent = `Montar Grade | ${response.data.sigla} - ${response.data.turno}`
            ))
            .catch(error => (console.log(error)))

        axios.get(`${url}/disciplina/curso/${localStorage.getItem('codCurso')}`)
            .then(response => {
                const listaDeObjetos = response.data.map(item => (
                    { text: `${item.nome}`, value: `${item.cod}` }
                ))
                setListaDisciplinas(listaDeObjetos)
            })
            .catch(error => (console.log(error)))

        axios.get(`${url}/professor`)
            .then(response => {
                const listaDeObjetos = response.data.map(item => (
                    { text: `${item.usuario.nome}`, value: `${item.cod}` }
                ))
                setListaProfessores(listaDeObjetos)
            })
            .catch(error => (console.log(error)))

    }, [])

    return (
        <>
            <section className={cardStyle.layout} ref={myElementRef}>
                <div className={cardStyle.title}>
                    <h1>Montar Grade</h1>
                    <div>
                        <FontAwesomeIcon className={cardStyle.bt} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
                        <FontAwesomeIcon className={cardStyle.bt} onClick={remove} icon={faMinus}></FontAwesomeIcon>
                    </div>
                </div>
                <div className={cardStyle.overflow}>
                </div>
                <Button variant="primary">teste</Button>
            </section>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar Turma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formCrud(
                        {
                            layout: [
                                { tag: "select", nome: "Horário início", lista: horarios },
                                { tag: "select", nome: " Horario Final", lista: horarios },
                                { tag: "select", nome: "Dia da Semana", lista: diasDaSemana },
                                { tag: "select", nome: "Disciplina", lista: listaDisciplinas },
                                { tag: "select", nome: "Professor", lista: listaProfessores }
                            ]
                        }
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={create}>
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}