'use client'

import cardStyle from '@/styles/card.module.css'

import { card } from '@/components/layoutsComponents'
import url from '@/components/utils'

import { useRef, useEffect, useState } from 'react'

import axios from "axios"

export default function page({ params }) {
    const myElementRef = useRef(null)
    const [listaDeObjetos, setListaDeObjetos] = useState([])

    useEffect(() => {
        async function selectAll() {
            try {
                const response = await axios.get(`${url.matriculas}/turma/${params.codTurma}`)
                const dados = response.data;

                console.log(dados)

            } catch (error) {
                console.log(error);
            }
        }

        selectAll()
    }, [])

    return (
        <div ref={myElementRef}>
            {params.codTurma}
            {params.slug}
        </div>
    )
}