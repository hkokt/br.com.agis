"use client"

import layoutStyle from '@/styles/layout.module.css'
import btStyle from '@/styles/botoes.module.css'

import { formCrud, tableCrud } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import axios from 'axios';

export default function Page() {
    const url = 'http://localhost:8080/AGIS'

    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    useEffect(() => {
        async function selectAll() {
            try {
                const response = await axios.get(`${url}/professor`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: [
                            item.cod,
                            item.usuario.nome,
                            item.usuario.emailCorp,
                            item.usuario.situacao
                        ]
                    }
                ))

                console.log(listaDeObjetos)

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectAll()

        const btInsert = document.getElementById('insert');
        const btUpdate = document.getElementById('update');

        btInsert.onclick = async function () {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cpf: document.querySelector('input[name="cpf"]').value,
                dataNasc: document.querySelector('input[name="Data Nasc."]').value,
                emailPessoal: document.querySelector('input[name="Email Pessoal"]').value,
                titulacao: document.querySelector('input[name="Titulação"]').value
            }

            axios.post(`${url}/professor`, data)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        btUpdate.onclick = async function () {
            const data = {
                nome: document.querySelector('input[name="Nome"]').value,
                cpf: document.querySelector('input[name="cpf"]').value,
                dataNasc: document.querySelector('input[name="Data Nasc."]').value,
                emailPessoal: document.querySelector('input[name="Email Pessoal"]').value,
                titulacao: document.querySelector('input[name="Titulação"]').value
            }

            axios.put(`${url}/professor/${localStorage.getItem('codProf')}`, data)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        function selectById(cod) {
            axios.get(`${url}/professor/${cod}`)
                .then(response => (
                    localStorage.setItem('codProf', response.data.cod),
                    document.querySelector('input[name="Nome"]').value = response.data.usuario.nome,
                    document.querySelector('input[name="cpf"]').value = response.data.usuario.cpf,
                    document.querySelector('input[name="Data Nasc."]').value = response.data.usuario.dataNasc,
                    document.querySelector('input[name="Email Pessoal"]').value = response.data.usuario.emailPessoal,
                    document.querySelector('input[name="Titulação"]').value = response.data.titulacao
                ))
                .catch(error => (console.log(error)))
        }

        function deleteById(cod) {
            axios.delete(`${url}/professor/${cod}`)
                .then(response => (console.log(response), selectALL()))
                .catch(error => (console.log(error)))
        }

        setlistaFuncs({ selectById: selectById, deleteById: deleteById })

    }, [])

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Manter Professor</h1>

                <div className={layoutStyle.col}>
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
                    <div className={btStyle.alingBt}>
                        <button className={btStyle.btForm} id="insert">Inserir</button>
                        <button className={btStyle.btForm} id="update">Atualizar</button>
                    </div>
                </div>

                <div className={layoutStyle.col}>
                    {tableCrud(
                        listaDeObjetos,
                        ['Cod', 'Nome', 'Email Corp.', 'Situação'],
                        listaFuncs)
                    }
                </div>

            </div>
        </div >
    )
}