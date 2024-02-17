"use client"

import layoutStyle from '@/styles/layout.module.css'
import btStyle from '@/styles/botoes.module.css'

import { formCrud, tableCrud } from '@/components/layoutsComponents'
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Page() {
    const url = 'http://localhost:8080'
    //https://api-agis.onrender.com

    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

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

        async function selectALL() {
            try {
                const response = await axios.get(`${url}/disciplina`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => ({
                    body: [item.cod, item.nome, item.curso.sigla, item.curso.turno ]
                }));

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }

            selectCursos()
        }

        selectALL()

        const btInsert = document.getElementById('insert');
        const btUpdate = document.getElementById('update');

        btInsert.onclick = async function () {
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

        btUpdate.onclick = async function () {
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

    }, [])

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Manter Disciplina</h1>

                {listaCursos != null && (
                    <div className={layoutStyle.col}>
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
                        <div className={btStyle.alingBt}>
                            <button className={btStyle.btForm} id="insert">Inserir</button>
                            <button className={btStyle.btForm} id="update">Atualizar</button>
                        </div>
                    </div>
                )}

                <div className={layoutStyle.col}>
                    {tableCrud(
                        listaDeObjetos,
                        ['Cod.', 'Nome', 'Curso', 'Turno' ],
                        listaFuncs)
                    }
                </div>


            </div>
        </div>
    )
}