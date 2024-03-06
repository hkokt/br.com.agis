'use client'

import url from '@/components/utils'
import { card } from '@/components/layoutsComponents'
import { useRef, useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'

export default function page({ params }) {
    const myElementRef = useRef(null)
    const [listaDeObjetos, setListaDeObjetos] = useState([])

    useEffect(() => {

        axios.get(`${url.datas}/Inicio das aulas`)
            .then(response => localStorage.setItem('dataInicio', response.data.data))
            .catch(error => console.log(error))

        axios.get(`${url.turmas}/${params.codTurma}`)
            .then(response => localStorage.setItem('diaDaSemana', response.data.diaDaSemana))
            .catch(error => console.log(error))
            
        // PARTE RESPONSÁVEL POR GERAR AS DATAS QUE SERAM EXIBIDAS
        let data = calculaDataInicio(localStorage.getItem('diaDaSemana'));
        const listaDePromessas = [];

        for (let i = 0; i < 20; i++) {
            const dataAtual = moment(data);
            const promise = teste(dataAtual).then(result => {
                return {
                    body: {
                        cod: dataAtual.format("DD/MM/YYYY"),
                        titulo: `${dataAtual.format("DD/MM/YYYY")}`,
                        p: [result]
                    }
                };
            });
            listaDePromessas.push(promise);
            data.add(1, 'weeks');
        }

        Promise.all(listaDePromessas).then(listaDeObjetos => {
            setListaDeObjetos(listaDeObjetos);
        });

    }, [])

    function calculaDataInicio(diaDaSemana) {
        let list = localStorage.getItem('dataInicio')
        let data = list.split(',')

        let inicioDasAulas = moment(`${data[0]}-${data[1]}-${data[2]}`)
        let dif = 0

        switch (diaDaSemana) {
            case " Segunda":
                dif = 1 - inicioDasAulas.day()
                break;
            case " Terça":
                dif = 2 - inicioDasAulas.day()
                break
            case " Quarta":
                dif = 3 - inicioDasAulas.day()
                break
            case " Quinta":
                dif = 4 - inicioDasAulas.day()
                break
            case " Sexta":
                dif = 5 - inicioDasAulas.day()
                break
            case " Sabado":
                dif = 6 - inicioDasAulas.day()
                break
        }

        if (dif < 0) { dif = 7 - (dif * -1) }

        return inicioDasAulas.add(dif, 'days')
    }

    async function teste(data) {
        try {
            const response = await axios.get(`${url.chamadas}/verificacao/${params.codTurma}/${data.format(`YYYY-MM-DD`)}`)

            if (response.data) {
                return 'chamada não realizada'
            } else {
                return 'chamada realizada'
            }

        } catch (error) { console.log(error) }
    }

    return (
        <div ref={myElementRef}>
            <h2>Realizar Chamada</h2>
            {card(listaDeObjetos, `/professor/turmas/${params.codTurma}/`, [])}
        </div>
    )
}