'use client'

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { card, modal } from '@/components/layoutsComponents'

import { useState, useEffect, useRef } from "react"

import { Button, Modal } from 'react-bootstrap';

import axios from "axios"

export default function page({ params }) {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setListaFuncs] = useState([]);

    const [mensagem, setMensagem] = useState([])

    //LISTAS
    const horarios = [{ text: '13:00', value: '13:00' }, { text: '14:50', value: '14:50' }, { text: '16:30', value: '16:30' }, { text: '18:20', value: '18:20' }]
    const diasDaSemana = [{ text: 'Segunda', value: 'Segunda' }, { text: 'Terça', value: 'Terça' }, { text: 'Quarta', value: 'Quarta' }, { text: 'Quinta', value: 'Quinta' }, { text: 'Sexta', value: 'Sexta' }, { text: 'Sabádo', value: 'Sabádo' }]
    const [listaDisciplinas, setListaDisciplinas] = useState([]);
    const [listaProfessores, setListaProfessores] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false), localStorage.removeItem('codTurma') };
    const handleShow = () => { setShow(true); setMensagem('criar')};

    useEffect(() => {
        // GET GRADE
        axios.get(`${url.grades}/${params.codGrade}`)
            .then(response => (
                document.querySelector('h1').textContent = `${response.data.curso.sigla} - ${response.data.curso.turno}`
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


        async function selectAll() {
            try {
                const response = await axios.get(`${url.turmas}/grade/${params.codGrade}`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.disciplina.nome} - ${item.disciplina.semestre}`,
                            p: [
                                `De ${item.horarioInicio} até ${item.horarioFim}`,
                                `Dia da Semanada: ${item.diaDaSemana}`,
                                `Professor: ${item.professor.usuario.nome}`
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

        const insert = () => {
            let select = document.querySelectorAll('select')
            const data = {
                horarioInicio: select[0].value,
                horarioFim: select[1].value,
                diaDaSemana: select[2].value,
                situacao: 'aberta',
                codDisciplina: select[3].value,
                codProfessor: select[4].value,
                codGradeCurricular: params.codGrade
            }

            axios.post(url.turmas, data)
                .then(response => {
                    console.log(response.data)
                    selectAll()
                })
                .catch(error => { console.log(error) })
        }

        const update = () => {
            let select = document.querySelectorAll('select')

            const data = {
                horarioInicio: select[0].value,
                horarioFim: select[1].value,
                diaDaSemana: select[2].value,
                situacao: 'aberta',
                codDisciplina: select[3].value,
                codProfessor: select[4].value,
                codGradeCurricular: params.codGrade
            }

            axios.put(`${url.turmas}/${localStorage.getItem('codTurma')}`, data)
                .then(response => {
                    console.log(response.data)
                    setShow(false)
                    selectAll()
                })
                .catch(error => { console.log(error) })
        }


        function selectById(cod) {
            setShow(true); setMensagem('atualizar')

            localStorage.setItem('codTurma', cod)

            axios.get(`${url.turmas}/${cod}`)
                .then(response => {
                    let selects = document.querySelectorAll('select')

                    selects[0].value = response.data.horarioInicio
                    selects[1].value = response.data.horarioFim
                    selects[2].value = response.data.diaDaSemana
                    selects[3].value = response.data.disciplina.cod
                    selects[4].value = response.data.professor.cod
                })
                .catch(error => { console.log(error) })

        }

        function deleteById(cod) {
            axios.delete(`${url.turmas}/${cod}`)
                .then(response => { console.log(response.data); selectAll() })
                .catch(error => { console.log(error) })
        }

        setListaFuncs({ selectById: selectById, deleteById: deleteById })

        setFuncs({ insert: insert, update: update })

    }, [])

    return (
        <>
            <section className={cardStyle.layout} ref={myElementRef}>
                <div className={cardStyle.title}>
                    <h1></h1>
                    <div>
                        <Button className={cardStyle.bt} onClick={handleShow}>Adicionar Turma</Button>
                    </div>
                </div>

                {card(listaDeObjetos, '', listaFuncs)}

                {modal(
                    show, handleClose, mensagem, funcs,
                    {
                        layout: [
                            { tag: "select", nome: "Horário início", lista: horarios },
                            { tag: "select", nome: "Horario Final", lista: horarios },
                            { tag: "select", nome: "Dia da Semana", lista: diasDaSemana },
                            { tag: "select", nome: "Disciplina", lista: listaDisciplinas },
                            { tag: "select", nome: "Professor", lista: listaProfessores }
                        ]
                    }
                )}
            </section>
        </>
    )
}