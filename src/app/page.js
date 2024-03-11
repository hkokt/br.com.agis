'use client'

import css from "@/styles/estilos.module.scss";
import { validarCPF } from "@/components/utils.js";
import url from "@/components/utils";
import { useState, useEffect, useRef } from 'react';
import { formCrud, Footer, Alert, Ttp, A } from "@/components/layoutsComponents";
import { useRouter } from "next/navigation";;
import axios from "axios";
import Image from 'next/image';
import { Modal } from 'react-bootstrap';

export default function Page() {
    const [error, setError] = useState(null);
    const router = useRouter();

    // Definindo o token como null ao carregar a página
    useEffect(() => {
        localStorage.setItem('token', null);
    }, []);

    const loginProf = () => {
        let cpf = document.querySelector('[name="CPF"]').value;

        if (!validarCPF(cpf)) {
            return;
        };

        axios.post(`${url.professores}/login`, { cpf: cpf, senha: '123456' })
            .then(response => {
                localStorage.setItem('codProf', response.data.cod)
                router.push('/professor/turmas')
            })
            .catch(error => console.log(error))
    }

    const loginSec = () => {
        let cpf = document.querySelector('[name="CPF"]').value;
        let senha = document.querySelector('[name="Senha"]').value;

        if (!validarCPF(cpf)) {
            setError("CPF inválido!");
            return;
        };

        console.log("CPF: " + cpf);
        console.log("Senha: " + senha);

        axios.post('http://localhost:8080/auth/login', { login: cpf, password: senha })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                router.push('/secretaria');
            })
            .catch(error => {
                localStorage.setItem('token', null);
                setError("Credenciais incorretas!");
                console.log(error);
            })
            .finally(() => {
                document.querySelector('[name="CPF"]').value = "";
                document.querySelector('[name="Senha"]').value = "";
            });;
    }

    return (
        <>
            <section>
                <div className={css.formSmall}>

                    <div className={css.center}>
                        <Image className={css.logo} src="/imgs/logo.png" alt="Logo" width={1000} height={1000} />
                        <h1 className={css.h1}>Login</h1>
                        {error && <h1 className={css.error}>{error}</h1>}
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

                    <div className={css.centerMargin}>
                        <A href="https://www.google.com/search?q=Alzheimer" value="Esqueci minha senha" />
                    </div>

                </div>
                <Footer />
            </section>
        </>
    )
}