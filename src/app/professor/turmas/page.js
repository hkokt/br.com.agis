'use client'

import css from "@/styles/estilos.module.scss"
import url from '@/components/utils'

import { card } from "@/components/layoutsComponents";

import { useRef, useState, useEffect } from "react";

import axios from "axios";

export default function page() {
    const myElementRef = useRef(null)

    const [listaDeObjetos, setListaDeObjetos] = useState([])

    useEffect(() => {

        async function selectAll() {
            try {
                const response = await axios.get(`${url.turmas}/professor/${localStorage.getItem('codProf')}`);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.cod,
                            titulo: `${item.disciplina.nome} - ${item.disciplina.semestre}`,
                            p: [
                                `De ${item.horarioInicio} até ${item.horarioFim}`,
                                `Dia da Semana: ${item.diaDaSemana}`,
                                `Situação: ${item.situacao}`
                            ]
                        }
                    }
                ));

                setListaDeObjetos(listaDeObjetos);

            } catch (error) {
                console.log(error);
            }
        }

        selectAll()

    }, [])

    return (
        <section className={css.layout} ref={myElementRef}>
            <div className={css.title}>
                <h1>Minhas Turmas</h1>
            </div>

            {card(listaDeObjetos, '/professor/turmas', [])}

        </section>
    )
}