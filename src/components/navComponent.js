import navStyle from '../styles/nav.module.css'

import Image from 'next/image';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

export function navSec() {
    return (
        <nav className={navStyle.navBar}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/secretaria">
                        <Image src="/imgs/logo2.png" width={60} height={60} priority={true} alt='Logo' />
                        Agis
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Alunos" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/secretaria/alunos/matricular">Matricular</NavDropdown.Item>
                                <NavDropdown.Item href="/secretaria/alunos/lista">Lista de Alunos</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Inserir" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/secretaria/cursos">Inserir Curso</NavDropdown.Item>
                                <NavDropdown.Item href="/secretaria/disciplinas">Inserir Disciplina</NavDropdown.Item>
                                <NavDropdown.Item href="/secretaria/professores">Inserir Professor</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/secretaria/grades">Grades</Nav.Link>

                            <Nav.Link href="/secretaria/calendarioAcademico">Calendário Acadêmico</Nav.Link>
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