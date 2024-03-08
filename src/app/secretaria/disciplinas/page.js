"use client"

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'
import { useEffect, useState, useRef } from 'react';
import { card, modal } from '@/components/layoutsComponents';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function Page() {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    const [mensagem, setMensagem] = useState([])

    //DADOS
    const [listaCursos, setListaCurso] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true); setMensagem('criar')};

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

        async function selectALL() {
            try {
                const response = await axios.get(url.disciplinas);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.nome}`,
                            p: [
                                `Curso: ${item.curso.sigla}/${item.curso.turno}`,
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

            axios.post(url.disciplinas, data)
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

            axios.put(`${url.disciplinas}/${localStorage.getItem('codDisci')}`, data)
                .then(response => { 
                    console.log(response) 
                    setShow(false);
                    selectALL()
                })
                .catch(error => (console.log(error)))
        }

        function selectById(cod) {
            setShow(true); setMensagem('atualizar')

            axios.get(`${url.disciplinas}/${cod}`)
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
            axios.delete(`${url.disciplinas}/${cod}`)
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
                <Button variant='primary' onClick={handleShow}>Inserir Novo</Button>
            </div>

            {card(listaDeObjetos, '', listaFuncs)}

            {modal(
                show, handleClose, mensagem, funcs,
                {
                    layout: [
                        { tag: "input", nome: "Nome", tipo: "text" },
                        { tag: "select", nome: "Qtd. Aula", lista: [{ text: 0, value: 0 }, { text: 2, value: 2 }, { text: 4, value: 4 }] },
                        { tag: "input", nome: "Semestre", tipo: "number" },
                        { tag: "select", nome: "Cursos", lista: listaCursos }
                    ]
                }
            )}
        </section>
    )
}