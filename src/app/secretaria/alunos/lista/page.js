'use client'

import layoutStyle from '@/styles/layout.module.css'

import { useEffect, useState, useRef } from 'react';
import { tableCrud } from '@/components/layouts';

export default function () {
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
        <div className={layoutStyle.site} ref={myElementRef}>
            <div className={layoutStyle.aling}>

                <h1>Lista de alunos</h1>

                {
                    tableCrud(
                        listaDeObjetos,
                        ['Ra', 'Nome', 'Email Corp.', 'Situação', 'Data Matricula', 'Limite da Matricula', 'Pont. Vestibular', 'Pos. Vestibular'],
                        listaFuncs
                    )
                }

            </div>
        </div>
    )
}