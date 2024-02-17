"use client"

import layoutStyle from '../../../styles/layout.module.css'
import btStyle from '../../../styles/botoes.module.css'

import { formCrud, tableCrud } from '@/components/layoutsComponents';

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
                const response = await axios.get(`${url}/datas`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => ({
                    body: [item.cod, item.data, item.descricao, item.ehFeriado, item.ano]
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
                data: document.querySelector('input[name="Data"]').value,
                descricao: document.querySelector('select').value,
                ehFeriado: document.querySelector('input[type="checkbox"]').checked
            }

            axios.post(`${url}/datas`, data)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => console.log(error))
        }

        btUpdate.onclick = async function () {
            const data = {
                data: document.querySelector('input[name="Data"]').value,
                descricao: document.querySelector('select').value,
                ehFeriado: document.querySelector('input[type="checkbox"]').checked
            }

            axios.put(`${url}/datas/${localStorage.getItem('codData')}`, data)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => console.log(error))
        }

        function selectById(cod) {
            axios.get(`${url}/datas/${cod}`)
                .then(response => (
                    localStorage.setItem('codData', response.data.cod),
                    document.querySelector('input[name="Data"]').value = response.data.data,
                    document.querySelector('select').value = response.data.descricao,
                    document.querySelector('input[type="checkbox"]').checked = response.data.ehFeriado
                ))
                .catch(error => (
                    console.log(error)
                ))
        }

        function deleteById(cod) {
            axios.delete(`${url}/datas/${cod}`)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => (console.log(error)))
        }

        setlistaFuncs({ selectById: selectById, deleteById: deleteById })

    }, [])

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Calendário Acadêmico</h1>

                <div className={layoutStyle.col}>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "Data", tipo: "date" },
                                { tag: "select", nome: "descricao", lista: [{ text: 'Selecione uma data', value: 'default' }, { text: 'Inicio das aulas', value: 'Inicio das aulas' }] },
                                { tag: 'input', nome: 'É feriado?', tipo: 'checkbox' }
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
                        ['Cod.', 'Data', 'Descrição', 'É feriado', 'Ano'],
                        listaFuncs
                    )}
                </div>

            </div>
        </div>
    )
}