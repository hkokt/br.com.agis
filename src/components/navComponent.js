import css from '@/styles/estilos.module.scss'

import Image from 'next/image';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export function navSec() {
    return (
        <nav className={css.navBar}>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/secretaria">
                        <h1 className={css.title}><Image className={css.logo} src="/imgs/logo.png" alt="Descrição da imagem" width={1000} height={1000} />Follow</h1>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavDropdown className={css.navDrop} title="Alunos" id="basic-nav-dropdown">
                                <NavDropdown.Item className={css.navItem} href="/secretaria/alunos/lista">Lista de Alunos</NavDropdown.Item>
                                <NavDropdown.Item className={css.navItem} href="/secretaria/alunos/matricular">Matricular</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown className={css.navDrop} title="Inserir" id="basic-nav-dropdown">
                                <NavDropdown.Item className={css.navItem} href="/secretaria/cursos">Inserir Curso</NavDropdown.Item>
                                <NavDropdown.Item className={css.navItem} href="/secretaria/disciplinas">Inserir Disciplina</NavDropdown.Item>
                                <NavDropdown.Item className={css.navItem} href="/secretaria/professores">Inserir Professor</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link className={css.navDrop} href="/secretaria/grades">Grades</Nav.Link>

                            <Nav.Link className={css.navDrop} href="/secretaria/calendarioAcademico">Calendário Acadêmico</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    )
}

export function navProf() {
    return (
        <nav className={navStyle.navBar}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/professor">
                        <Image src="/imgs/logo2.png" width={60} height={60} priority={true} alt='Logo' />
                        Agis
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/professor/turmas">Turmas</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    )
}