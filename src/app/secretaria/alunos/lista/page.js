'use client'

import cardStyle from '@/styles/card.module.css'
import { card } from '@/components/layoutsComponents';

import { useEffect, useState, useRef } from 'react';

import axios from 'axios';


export default function Page() {
    const myElementRef = useRef(null);

    const [listaDeObjetos, setListaDeObjetos] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    useEffect(() => {

        function selectById(cod) {
            console.log(cod)
        }

        setlistaFuncs({ selectById: selectById, deleteById: null })

    }, []);


    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Visualizar Alunos</h1>
            </div>

            {card(
                [{
                    body: [{ titulo: 'teste', p1: 'teste', p2: 'teste' }]
                }]
            )}
            
        </section>
    )
}