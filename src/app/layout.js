import 'bootstrap/dist/css/bootstrap.min.css';
import css from "@/styles/estilos.module.scss";

export const metadata = {

};

export default function RootLayout({ children }) {
    return (
        <html lang="PT-BR">
            <head>
                <title>Follow</title>
            </head>
            <body className={css.background}>
                {children}
            </body>
        </html>
    );
}
