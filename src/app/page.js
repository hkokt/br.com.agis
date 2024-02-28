'use client'

import loginStyle from "@/styles/login.module.css"
import url from "@/components/utils";

import { useState, useEffect, useRef } from 'react';

import { formCrud } from "@/components/layoutsComponents"

import { Button, Image } from "react-bootstrap";

import { useRouter } from "next/navigation";;

import axios from "axios";

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

export default function Page() {
    const router = useRouter()
    const size = useWindowSize();

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

    useEffect(() => {
        const element = document.querySelector('#display');

        if (element) {
            element.style.height = `${size.height - 50}px`;
        }

    }, [size.height]);

    return (
        <section className={loginStyle.display} id="display">
            <div className={loginStyle.layout}>
                <div className={loginStyle.title}>
                    <Image src="/imgs/logo2.png" width={60} height={60} alt='Logo' />
                    <h1>Login</h1>
                </div>
                {formCrud(
                    {
                        layout: [
                            { tag: "input", nome: "CPF", tipo: "text" },
                            { tag: "input", nome: "Senha", tipo: "password" }
                        ]
                    }
                )}
                <div className={loginStyle.footer}>
                    <Button variant="outline-primary" onClick={loginProf}>Login Professor</Button>
                    <Button variant="outline-primary" onClick={loginSec}>Login Secretaria</Button>
                </div>
            </div>
        </section>
    )
}