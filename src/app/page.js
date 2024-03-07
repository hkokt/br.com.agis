'use client'

import css from "@/styles/estilos.module.scss";

import url from "@/components/utils";

import { useState, useEffect, useRef } from 'react';

import { formCrud, Footer } from "@/components/layoutsComponents"

import { useRouter } from "next/navigation";;

import axios from "axios";

import Image from 'next/image';

export default function Page() {
    const router = useRouter()

    const loginProf = () => {
        let cpf = document.querySelector('[name="CPF"]').value

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
            <section>

            </section>
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
                        <button className={css.btn}>Login Professor</button>
                        <button className={css.btn} onClick={loginSec}>Login Secretaria</button>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}