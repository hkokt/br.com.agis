'use client'

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { card, modal } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { Button } from 'react-bootstrap';

import axios from 'axios';

import { useRouter } from 'next/navigation'

export default function Page() {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    //REDIRECT
    const router = useRouter()

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //LISTAS
    const horarios = [{ text: '13:00', value: '13:00' }, { text: '14:50', value: '14:50' }, { text: '16:30', value: '16:30' }, { text: '18:20', value: '18:20' }]
    const diasDaSemana = [{ text: 'Segunda', value: 'Segunda' }, { text: 'Terça', value: 'Terça' }, { text: 'Quarta', value: 'Quarta' }, { text: 'Quinta', value: 'Quinta' }, { text: 'Sexta', value: 'Sexta' }, { text: 'Sabádo', value: 'Sabádo' }]
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
                    { text: `${item.nome}`, value: `${item.cod}` }
                ))
                setListaProfessores(listaDeObjetos)
            })
            .catch(error => (console.log(error)))

    }, [])

    const create = () => {
        let selects = document.querySelectorAll('select')

        const objeto = {
            body: {
                cod: `${selects[0].value}, ${selects[1].value}, ${selects[2].value}, ${selects[3].value}, ${selects[4].value}`,
                titulo: `${selects[3].children[[selects[3].selectedIndex]].textContent}`,
                p: [
                    `Professor: ${selects[4].children[[selects[4].selectedIndex]].textContent}`,
                    `De ${selects[0].value} até ${selects[1].value}`,
                    `Dia da Semana: ${selects[2].value}`,
                ]
            }
        }

        setListaDeObjetos(prevState => [...prevState, objeto])
    }

    const remove = () => {
        let cards = document.querySelectorAll('.card_card__ppk8h')
        cards[cards.length - 1].remove()
    }

    const insert = () => {
        if (listaDeObjetos.length < 1) {
            alert('adicione pelo menos uma turma')
        } else {
            // INSERT GRADE
            let dataAual = new Date(), sem = 0
            if (dataAual.getMonth() > 6) { sem = 2 } else { sem = 1 }

            const dataGrade = {
                codCurso: localStorage.getItem('codCurso'),
                semestre: sem,
                ano: dataAual.getFullYear()
            }

            axios.post(url.grades, dataGrade)
                .then(response => {
                    localStorage.setItem('codGrade', response.data.cod)
                    insertTurmas();
                })
                .catch(error => console.log(error))
        }
    }

    const insertTurmas = () => {
        const listaData = []

        let inputs = document.querySelectorAll('[name="cod"]')

        inputs.forEach(input => {
            let dadosObjeto = input.value.split(',')

            const objeto = {
                horarioInicio: dadosObjeto[0],
                horarioFim: dadosObjeto[1],
                diaDaSemana: dadosObjeto[2],
                situacao: 'aberta',
                codDisciplina: dadosObjeto[3],
                codProfessor: dadosObjeto[4],
                codGradeCurricular: localStorage.getItem('codGrade')
            }

            listaData.push(objeto)
        })

        listaData.forEach(data => {
            axios.post(url.turmas, data)
                .then(response => { console.log(response.data) })
                .catch(error => console.log(error))
        })

        localStorage.removeItem('codGrade')
        router.push('/secretaria/grades')
    }

    return (
        <>
            <section className={cardStyle.layout} ref={myElementRef}>
                <div className={cardStyle.title}>
                    <h1>Montar Grade</h1>
                    <div>
                        <Button className={cardStyle.bt} onClick={handleShow}>Adicionar Turma</Button>
                        <Button className={cardStyle.bt} onClick={remove}>Remover Turma</Button>
                    </div>
                </div>

                {card(listaDeObjetos, '', [])}

                <Button variant="primary" onClick={insert}>Inserir Grade</Button>
            </section>

            {modal(
                show, handleClose, 'criar', { insert: create },
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

        </>
    )
}