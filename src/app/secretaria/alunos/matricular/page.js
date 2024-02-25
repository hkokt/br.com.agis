'use client'

import layoutStyle from '@/styles/layout.module.css'
import btStyle from '@/styles/botoes.module.css'

import url from '@/components/utils'

import { formCrud } from "@/components/layoutsComponents";
import { useEffect, useState, useRef } from 'react';

import axios from 'axios';

export default function () {
    const myElementRef = useRef(null);

    const [listaCursos, setListaCurso] = useState([]);

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

        selectCursos()

        const btInsert = document.getElementById('insert');

        btInsert.onclick = function () {
            const data = {
                cpf: document.querySelector('[name="CPF"]').value,
                nome: document.querySelector('[name="Nome"]').value,
                nomeSocial: document.querySelector('[name="Nome Social"]').value,
                dataNasc: document.querySelector('[name="Data Nasc."]').value,
                dataConc2grau: document.querySelector('[name="Data de Conclusão do 2°"]').value,
                instConc2grau: document.querySelector('[name="Instituição de Conclusão do 2°"]').value,
                emailPessoal: document.querySelector('[name="Email Pessoal"]').value,
                ptVestibular: document.querySelector('[name="Pontuação no vestibular"]').value,
                posVestibular: document.querySelector('[name="Posição no Vestibular"]').value,
                codCurso: document.querySelector('select').value,
            }

            axios.post(url.alunos, data)
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
        }

    }, []);

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <div className={layoutStyle.col}>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "Nome", tipo: "text" },
                                { tag: "input", nome: "Nome Social", tipo: "text" },
                                { tag: "input", nome: "CPF", tipo: "text" },
                                { tag: "input", nome: "Data Nasc.", tipo: "date" },
                                { tag: "input", nome: "Instituição de Conclusão do 2°", tipo: "text" },
                                { tag: "input", nome: "Data de Conclusão do 2°", tipo: "date" },
                                { tag: "input", nome: "Email Pessoal", tipo: "text" },
                                { tag: "input", nome: "Pontuação no vestibular", tipo: "number" },
                                { tag: "input", nome: "Posição no Vestibular", tipo: "number" },
                                { tag: "select", nome: "Cursos", lista: listaCursos }
                            ]
                        }
                    )}
                    <div className={btStyle.alingBt}>
                        <button className={btStyle.btForm} id="insert">Inserir</button>
                    </div>
                </div>

            </div>
        </div>
    )
}