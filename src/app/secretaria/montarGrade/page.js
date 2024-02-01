'use client'

import layoutStyle from '../../../styles/layout.module.css'

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { card } from '@/components/layoutsComponents';

export default function Page() {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    useEffect(() => {

        async function selectAll() {
            try {
                const response = await axios.get('http://localhost:8080/AGIS/gradeCurricular');
                const dados = response.data;

                const listaDeObjetos = dados.map(item => ({
                    body: [ item.cod, item.ano, item.semestre, item.curso ]
                }));

                setListaDeObjetos(listaDeObjetos);
            } catch (error) {
                console.log(error);
            }
        }

        selectAll();

    }, []);

    return (
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Visualizar Grades</h1>
                <div className={layoutStyle.overflow}>
                    {card(listaDeObjetos)}
                </div>

            </div>
        </div>
    )
}