"use client"

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { modal, card } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

import axios from 'axios';

export default function Page() {

    const myElementRef = useRef(null);
    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    const [mensagem, setMensagem] = useState([])

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); setMensagem('criar') };

    useEffect(() => {
        async function selectALL() {
            try {
                const response = await axios.get(url.datas);
                const dados = response.data;

                const listaDeObjetos = dados.map(item => (
                    {
                        body: {
                            cod: item.descricao,
                            titulo: `${item.descricao}`,
                            p: [
                                `Data: ${item.data}`,
                                `Feriado: ${item.ehFeriado}`,
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

        const insert = () => {
            const data = {
                data: document.querySelector('input[name="Data"]').value,
                descricao: document.querySelector('select').value,
                ehFeriado: document.querySelector('input[type="checkbox"]').checked
            }

            axios.post(url.datas, data)
                .then(response => {
                    console.log(response.data);
                    selectALL();
                })
                .catch(error => console.log(error))
        }

        setlistaFuncs({ selectById: null, deleteById: null })

        setFuncs({ insert: insert, update: null })

    }, [])

    return (
        <section className={cardStyle.layout} ref={myElementRef}>
            <div className={cardStyle.title}>
                <h1>Calendário Acadêmico</h1>
                <Button variant='primary' onClick={handleShow}>Inserir Novo</Button>
            </div>

            {card(listaDeObjetos, '', listaFuncs)}

            {modal(
                show, handleClose, mensagem, funcs,
                {
                    layout: [
                        { tag: "input", nome: "Data", tipo: "date" },
                        { tag: "select", nome: "descricao", lista: [{ text: 'Selecione uma data', value: 'default' }, { text: 'Inicio das aulas', value: 'Inicio das aulas' }] },
                        { tag: 'input', nome: 'É feriado?', tipo: 'checkbox' }
                    ]
                }
            )}
        </section>
    )
}