import React, { useEffect, useState } from 'react';
import CardBook from './CardBook/CardBook';
import style from './home.module.css';
import { Paginacion } from './Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getLibros } from '../../redux/features/data/dataSlice';
import Search from '../Search/Search';
import Filters from '../Filters/Filters';

export default function Home() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibros());
    }, [dispatch]);

    let books = useSelector((state) => state.data.books);

    //logica de paginado

    const [pagina, setPagina] = useState(1);

    const porPagina = 10;

    const maximo = books.length / porPagina;

    //logica para mostrar el search en home en modo responsive

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 600) {
            setShow(true);
        }
    }, [setShow]);

    return (
        <div className={style.Container}>
            <Filters setPagina={setPagina} />
            <div className={style.Container__Search}>{show && <Search />}</div>
            <div className={style.Container__PanelCards}>
                {books
                    .slice(
                        (pagina - 1) * porPagina,
                        (pagina - 1) * porPagina + porPagina
                    )
                    .map((l, i) => {
                        return (
                            <CardBook
                                name={l.title}
                                id={l.isbn13}
                                author={l.author}
                                gender={l.gender}
                                idiom={l.idiom}
                                format={l.format}
                                price={l.price}
                                img={l.image}
                                key={i}
                            />
                        );
                    })}
            </div>
            <div className={style.Container__Pagination}>
                <Paginacion
                    pagina={pagina}
                    setPagina={setPagina}
                    maximo={maximo}
                />
            </div>
        </div>
    );
}
