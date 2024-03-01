'use client'

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { card } from '@/components/layoutsComponents'

import { useRef, useEffect, useState } from 'react'

import moment from 'moment'

import axios from 'axios'

function calculaDataInicio(diaDaSemana) {

    let list = localStorage.getItem('dataInicio')
    let data = list.split(',')

    let inicioDasAulas = moment(`${data[0]}-${data[1]}-${data[2]}`)
    let dif = 0

    switch (diaDaSemana) {
        case "Segunda":
            dif = 1 - inicioDasAulas.day()
            break;
        case "Terça":
            dif = 2 - inicioDasAulas.day()
            break
        case "Quarta":
            dif = 3 - inicioDasAulas.day()
            break
        case "Quinta":
            dif = 4 - inicioDasAulas.day()
            break
        case "Sexta":
            dif = 5 - inicioDasAulas.day()
            break
        case "Sabado":
            dif = 6 - inicioDasAulas.day()
            break
    }

    if (dif < 0) { dif = 7 - (dif * -1) }

    return inicioDasAulas.add(dif, 'days')
}

export default function page({ params }) {
    const myElementRef = useRef(null)
    const [listaDeObjetos, setListaDeObjetos] = useState([])

    useEffect(() => {

        axios.get(`${url.datas}/Inicio das aulas`)
            .then(response => localStorage.setItem('dataInicio', response.data.data))
            .catch(error => console.log(error))

        axios.get(`${url.turmas}/${params.codTurma}`)
            .then(response => {
                let data = calculaDataInicio(response.data.diaDaSemana)
                const listaDeObjetos = []

                for (let i = 0; i <= 20; i++) {
                    axios.get(`${url.chamadas}/${params.codTurma}/${data.format(`YYYY-MM-DD`)}`)
                        

                    listaDeObjetos.push({
                        body: {
                            cod: data.format("DD/MM/YYYY"),
                            titulo: `${data.format("DD/MM/YYYY")}`,
                            p: [
                                ``
                            ]
                        }
                    })

                    data.add(1, 'weeks')
                }

                setListaDeObjetos(listaDeObjetos)
            })

    }, [])


    return (
        <div ref={myElementRef}>
            <h2>Realizar Chamada</h2>
            {card(listaDeObjetos, `/professor/turmas/${params.codTurma}/`, [])}
        </div>
    )
}
/*
     axios.get(`${url.turmas}/${params.codTurma}`)
            .then(response => {
                let data = calculaDataInicio(response.data.diaDaSemana)
                const listaDeObjetos = []

                for (let i = 0; i <= 20; i++) {


                    axios.get(`${url.chamadas}/${params.codTurma}/${data.format('YYYY-MM-DD')}`)
                        .then(response => {
                            console.log(response.data)
                            localStorage.setItem('chamada', response.data)
                        })
                        .catch(error => console.log(error))

                    const objeto = {
                        body: {
                            cod: data.format("DD/MM/YYYY"),
                            titulo: `${data.format("DD/MM/YYYY")}`,
                            p: [
                                `${localStorage.getItem('chamada')}`
                            ]
                        }
                    }

                    listaDeObjetos.push(objeto)

                    data.add(1, 'weeks')
                }

                setListaDeObjetos(listaDeObjetos)
            })
            .catch(error => console.log(error))
*/