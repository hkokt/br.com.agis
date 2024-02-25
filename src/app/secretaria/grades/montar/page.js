'use client'

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { formCrud } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button, Modal } from 'react-bootstrap';

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

    const create = () => {
        let selects = document.querySelectorAll('select')

        let html = `
            <div class="card_card__ppk8h">
                <div class="card_cardHead__mcHRd">
                    <a><span>${selects[3].children[[selects[3].selectedIndex]].textContent}</span></a>
                    <input type="hidden" id="disciplina" value="${selects[3].value}">
                </div>
                <div class="card_cardBody__yCjS5">
                    <p>
                        De <span id="horaIni">${selects[0].children[[selects[0].selectedIndex]].textContent}</span> 
                        até <span id="horaFim">${selects[1].children[[selects[1].selectedIndex]].textContent}</span>
                    </p>
                    <p>Dia da Semana: <span id="diaDaSemana">${selects[2].children[[selects[2].selectedIndex]].textContent}</span></p>
                    <p>Professor: <span>${selects[4].children[[selects[4].selectedIndex]].textContent}</span></p>
                    <input type="hidden" id="professor" value="${selects[4].value}">
                </div>
            </div>
        `

        document.querySelector('.card_overflow__zHy06').innerHTML += html
    }

    const remove = () => {
        let cards = document.querySelectorAll('.card_card__ppk8h')
        cards[cards.length - 1].remove()
    }

    const insert = () => {
        let dataAual = new Date(), sem = 0

        if (dataAual.getMonth() > 6) { sem = 2 } else { sem = 1 }

        const data = {
            codCurso: localStorage.getItem('codCurso'),
            semestre: sem,
            ano: dataAual.getFullYear()
        }

        axios.post(url.grades, data)
            .then(response => {
                insertsTurmas(response.data.cod)
                router.push('/secretaria/grades')
            })
            .catch(error => { console.log(error) })
    }

    function insertsTurmas(codGrade) {
        let disciplina = document.querySelectorAll('#disciplina')
        let professor = document.querySelectorAll('#professor')
        let diaDaSemana = document.querySelectorAll('#diaDaSemana')
        let horaIni = document.querySelectorAll('#horaIni')
        let horaFim = document.querySelectorAll('#horaFim')

        const listaData = []

        for (let i = 0; i < horaIni.length; i++) {
            const objetoDados = {
                horarioInicio: horaIni[i].textContent,
                horarioFim: horaFim[i].textContent,
                diaDaSemana: diaDaSemana[i].textContent,
                situacao: 'aberta',
                codDisciplina: disciplina[i].value,
                codProfessor: professor[i].value,
                codGradeCurricular: codGrade
            }

            listaData.push(objetoDados)
        }

        listaData.forEach(data => {
            axios.post(url.turmas, data)
                .then(response => { console.log(response.data) })
                .catch(error => { console.log(error) })
        })
    }

    //LISTAS
    const horarios = [{ text: '13:00', value: '13:00' }, { text: '14:50', value: '14:50' }, { text: '16:30', value: '16:30' }, { text: '18:20', value: '18:20' }]
    const diasDaSemana = [{ text: 'Segunda', value: 'Segunda' }, { text: 'Terça', value: 'Terça' }, { text: 'Quarta', value: 'Quarta' }, { text: 'Quinta', value: 'Quinta' }, { text: 'Sexta', value: 'Sexta' }, { text: 'Sabádo', value: 'Sabádo' }]

    //DADOS
    const [listaDisciplinas, setListaDisciplinas] = useState([]);
    const [listaProfessores, setListaProfessores] = useState([]);

    useEffect(() => {

        // GET CURSO
        axios.get(`${url.cursos}/${localStorage.getItem('codCurso')}`)
            .then(response => (
                document.querySelector('h1').textContent = `Montar Grade | ${response.data.sigla} - ${response.data.turno}`
            ))
            .catch(error => (console.log(error)))

        // GET DISCIPLINAS DO CURSO
        axios.get(`${url.disciplinas}/curso/${localStorage.getItem('codCurso')}`)
            .then(response => {
                const listaDeObjetos = response.data.map(item => (
                    { text: `${item.nome}`, value: `${item.cod}` }
                ))
                setListaDisciplinas(listaDeObjetos)
            })
            .catch(error => (console.log(error)))

        // GET PROFESSORES
        axios.get(url.professores)
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
                <Button variant="primary" onClick={insert}>teste</Button>
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