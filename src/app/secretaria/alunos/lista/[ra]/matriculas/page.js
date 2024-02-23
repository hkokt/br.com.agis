'use client'

import { card } from "@/components/layoutsComponents"

import { useEffect, useState, useRef } from 'react';

import axios from "axios";

export default function Page({ params }) {
    const url = 'http://localhost:8080'

    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    useEffect(() => {

        async function selectALL() {
            try {
                const response = (await axios.get(`${url}/matricula/aluno/${params.ra}`))
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: `${item.turma.cod}/${item.aluno.ra}/${item.ano}/${item.semestre}`,
                            titulo: `${item.turma.disciplina.nome}`,
                            p: [
                                `Matriculado no: ${item.semestre}° semestre do ano de ${item.ano}`,
                                `Nota final: a ser inserido`,
                                `Faltas em %: a ser inserido`
                            ]
                        }
                    }
                ));

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectALL();

        function dispensarById() { }

        setlistaFuncs({ dispensarById: dispensarById })

    }, [])

    return (
        <>
            {card(listaDeObjetos, `/secretaria/alunos/lista/${params.ra}/matriculas`, listaFuncs)}
        </>
    )
}