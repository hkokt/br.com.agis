'use client'

import layoutStyle from '@/styles/layout.module.css'
import btStyle from '@/styles/botoes.module.css'

import { formCrud } from "@/components/layoutsComponents";
import { useEffect, useState, useRef } from 'react';

import axios from 'axios';

export default function () {
    const myElementRef = useRef(null);

    const [listaCursos, setListaCurso] = useState([]);

    useEffect(() => {
        async function selectCursos() {
            try {
                const response = await axios.get('http://localhost:8080/AGIS/curso');
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