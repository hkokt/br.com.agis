"use client"

import cardStyle from '@/styles/card.module.css'
import url from '@/components/utils'

import { formCrud, card } from '@/components/layoutsComponents'

import { useEffect, useState, useRef } from 'react';

import { Button, Modal } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

export default function Page() {

    const myElementRef = useRef(null);
    const [listaDeObjetos, setListaDeObjetos] = useState([]);

    const [funcs, setFuncs] = useState([]);
    const [listaFuncs, setlistaFuncs] = useState([]);

    //MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <FontAwesomeIcon className={cardStyle.bt} onClick={handleShow} icon={faPlus}></FontAwesomeIcon>
            </div>

            {card(listaDeObjetos, '', listaFuncs)}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "Data", tipo: "date" },
                                { tag: "select", nome: "descricao", lista: [{ text: 'Selecione uma data', value: 'default' }, { text: 'Inicio das aulas', value: 'Inicio das aulas' }] },
                                { tag: 'input', nome: 'É feriado?', tipo: 'checkbox' }
                            ]
                        }
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={funcs.insert}>
                        Criar
                    </Button>
                    <Button variant="primary" onClick={funcs.update}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    )
}