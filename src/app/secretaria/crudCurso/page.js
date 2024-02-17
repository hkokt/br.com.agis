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

    useEffect(() => {
        async function selectALL() {
            try {
                const response = (await axios.get(`${url}/curso`))
                const dados = response.data;

                const listaDeObjetos = dados.map(item => ({
                    body: [item.cod, item.nome, item.turno]
                }));

                console.log(listaDeObjetos)

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectALL();

        const btInsert = document.getElementById('insert');
        const btUpdate = document.getElementById('update');

        btInsert.onclick = async function () {
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

        btUpdate.onclick = async function () {
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

    }, []);

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Manter Curso</h1>

                <div className={layoutStyle.col}>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "Nome", tipo: "text" },
                                { tag: "input", nome: "Carga horaria", tipo: "number" },
                                { tag: "input", nome: "Sigla", tipo: "text" },
                                { tag: "input", nome: "Enade", tipo: "number" },
                                { tag: "select", nome: "Turno", lista: [{ text: 'Manhã', value: 'Manhã' }, { text: 'Tarde', value: 'Tarde' }, { text: 'Noite', value: 'Noite' }] }
                            ]
                        }
                    )}
                    <div className={btStyle.alingBt}>
                        <button className={btStyle.btForm} id="insert">Inserir</button>
                        <button className={btStyle.btForm} id="update">Atualizar</button>
                    </div>
                </div>

                <div className={layoutStyle.col}>
                    {tableCrud(
                        listaDeObjetos,
                        ['Cod.', 'Nome', 'Turno'],
                        listaFuncs
                    )}
                </div>

            </div>
        </div >
    )
}