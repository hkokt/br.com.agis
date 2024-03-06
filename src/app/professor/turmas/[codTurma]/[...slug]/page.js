'use client'

import listaStyle from '@/styles/lista.module.css'
import url from '@/components/utils'
import { useRef, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from "axios"
import moment from 'moment';
import { useRouter } from 'next/navigation';

export default function page({ params }) {
    const myElementRef = useRef(null)
    const router = useRouter()

    const [listaDeObjetos, setListaDeObjetos] = useState([])
    const [funcs, setFuncs] = useState([]);

    useEffect(() => {

        async function selectAllMatriculas() {
            try {
                const response = await axios.get(`${url.matriculas}/turma/${params.codTurma}`)
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            ra: item.aluno.ra,
                            nome: item.aluno.usuario.nome,
                            qtdFaltas: 0
                        }
                    }
                ))

                setListaDeObjetos(listaDeObjetos)
            } catch (error) {
                console.log(error);
            }
        }

        async function selectAllChamada() {
            try {
                const response = await axios.get(`${url.chamadas}/${params.codTurma}/${moment(`${params.slug[2]}-${params.slug[1]}-${params.slug[0]}`).format("YYYY-MM-DD")}`)
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            ra: item.aluno.ra,
                            nome: item.aluno.usuario.nome,
                            qtdFaltas: item.qtdFaltas
                        }
                    }
                ))

                setListaDeObjetos(listaDeObjetos)
            } catch (error) {
                console.log(error);
            }
        }

        axios.get(`${url.chamadas}/verificacao/${params.codTurma}/${moment(`${params.slug[2]}-${params.slug[1]}-${params.slug[0]}`).format("YYYY-MM-DD")}`)
            .then(response => {
                if (response.data) {
                    selectAllMatriculas()
                } else {
                    selectAllChamada()
                }
            })

        const insert = () => {
            if (moment() >= moment(`${params.slug[2]}-${params.slug[1]}-${params.slug[0]}`)) {
                let ras = document.querySelectorAll('input[name="ra"]')
                let faltas = document.querySelectorAll('select')

                const listaDeObjetos = []

                ras.forEach((input, i) => {
                    const objeto = {
                        codTurma: params.codTurma,
                        ra: input.value,
                        data: `${params.slug[2]}-${params.slug[1]}-${params.slug[0]}`,
                        qtdFaltas: faltas[i].value
                    }
                    listaDeObjetos.push(objeto)
                })

                listaDeObjetos.forEach(data => {
                    axios.post(url.chamadas, data)
                        .then(response => console.log(response.data))
                        .catch(error => console.log(error))
                })

                

                axios.get(`${url.chamadas}/verificacao/${params.codTurma}/${moment(`${params.slug[2]}-${params.slug[1]}-${params.slug[0]}`).format("YYYY-MM-DD")}`)
                    .then(response => {
                        if (response.data) {
                            router.push(`/professor/turmas/${params.codTurma}`)
                        }
                    })

            } else {
                console.log('não é possível realizar a chamada')
            }
        }

        setFuncs({ insert: insert })

    }, [])

    return (
        <section ref={myElementRef}>
            <h2>Chamada do dia: {`${params.slug[0]}/${params.slug[1]}/${params.slug[2]}`}</h2>
            <div className={listaStyle.height}>
                {
                    listaDeObjetos.map((item, i) => (
                        <div className={listaStyle.layout} key={i}>

                            <h3>{item.body.nome}</h3>
                            <div>
                                <p>{item.body.ra}</p>
                                <input type='hidden' value={item.body.ra} name="ra"></input>
                                <p>{`${params.slug[0]}-${params.slug[1]}-${params.slug[2]}`}</p>

                                <select id="qtdFaltas" defaultValue={item.body.qtdFaltas}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>

                            </div>

                        </div>
                    ))
                }
            </div>
            <Button variant="primary" onClick={funcs.insert}>Realizar Chamada </Button>
        </section>
    )
}