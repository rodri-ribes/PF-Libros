import React, { useEffect, useState } from 'react';
import CardBook from './CardBook/CardBook';
import style from './home.module.css';
import { Paginacion } from './Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getLibros } from '../../redux/features/data/dataSlice';
import Search from '../Search/Search';
import Filters from '../Filters/Filters';
import Loading from './Loading/Loading.jsx';
import { Card404 } from '../404/Card404';
import Noresults from './NoResults/Noresults';
import { Grid } from '@mui/material';
import FiltersSidebar from "../Filters/FiltersSidebar"

export default function Home() {
    let dispatch = useDispatch();

    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false)



    useEffect(() => {
        dispatch(getLibros());
    }, [dispatch]);

    let books = useSelector((state) => state.data.books);
    let loading = useSelector((state) => state.data.loading);
    let error = useSelector((state) => state.data.error);

    //logica de paginado

    const [pagina, setPagina] = useState(1);

    const porPagina = 10;

    const ceil = books.length / porPagina;
    const maximo = Math.ceil(ceil)

    //logica para mostrar el search en home en modo responsive

    const [show, setShow] = useState(false);
    const [sizeGrid, setSizeGrid] = useState("")

    const drawerWidth = 240;
    const sizeG = {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
    }
    const sizeGxl = {
        width: "100%"
    }
    useEffect(() => {
        if (window.innerWidth < 600) {
            setShow(true);
        }
        if (window.innerWidth < 1740) {
            setSizeGrid(sizeG)
        }
        if (window.innerWidth > 1739) {
            setSizeGrid(sizeGxl)
        }
    }, [setSizeGrid]);


    
    return (
        <div className={style.Container}>         
                <FiltersSidebar setPagina= {setPagina} />
                <Grid
                   sx={sizeGrid}
                >
                    {/* <Filters setPagina={setPagina} /> */}
                    {/* <div className={style.Container__Search}>{show && <Search />}</div> */}
                    <div className={style.Container__PanelCards}>
                        {error ? <Card404/> :
                            loading ? <Loading/> :
                                (books.length === 0) ? <Noresults/> :
                                books && books
                                    .slice(
                                        (pagina - 1) * porPagina,
                                        (pagina - 1) * porPagina + porPagina
                                    )
                                    .map((l, i) => {
                                        return (
                                            <CardBook
                                                name={l.title}
                                                id={l.isbn13}
                                                price={l.price}
                                                img={l.image}
                                                authors={l.authors}
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
                </Grid>
        </div>
    );
}
