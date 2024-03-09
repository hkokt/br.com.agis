'use client'

import css from "@/styles/estilos.module.scss";
import { validarCPF } from "@/components/utils.js";
import url from "@/components/utils";
import { useState, useEffect, useRef } from 'react';
import { formCrud, Footer, meuAlert, Ttp } from "@/components/layoutsComponents";
import { useRouter } from "next/navigation";;
import axios from "axios";
import Image from 'next/image';
import { Alert, Modal } from 'react-bootstrap';

export default function Page() {
    const router = useRouter()

    const loginProf = () => {
        let cpf = document.querySelector('[name="CPF"]').value;

        meuAlert();

        if (!validarCPF(cpf)) {
            return;
        };

        axios.post(`${url.professores}/login`, { cpf: cpf, senha: '123456' })
            .then(response => {
                localStorage.setItem('codProf', response.data.cod)
                router.push('/professor')
            })
            .catch(error => console.log(error))
    }

    const loginSec = () => {
        router.push('/secretaria')
    }

    return (
        <>
            <section className={css.display}>
                <div className={css.formSmall}>
                    <div className={css.center}>
                        <Image className={css.logo} src="/imgs/logo.png" alt="Logo" width={1000} height={1000} />
                        <h1 className={css.h1}>Login</h1>
                    </div>
                    {formCrud(
                        {
                            layout: [
                                { tag: "input", nome: "CPF", tipo: "text" },
                                { tag: "input", nome: "Senha", tipo: "password" }
                            ]
                        }
                    )}
                    <div className={css.center}>
                        <Ttp ttpMessage="Professor">
                            <button className={css.btn} onClick={loginProf}>Login Professor</button>
                        </Ttp>
                        <Ttp ttpMessage="Secretaria">
                            <button className={css.btn} onClick={loginSec}>Login Secretaria</button>
                        </Ttp>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}