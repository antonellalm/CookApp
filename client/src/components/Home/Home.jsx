import React from "react";
import Navbar from "../Navbar/Navbar";
import Paginado from "../Pagination/Paginado";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//
import styles from "./Home.module.css";
import { getAllRecipes, getDiets, cleanStates } from "../../redux/actions";
import Card from "../Card/Card";
import { DetalleModal } from "../DetalleModal/DetalleModal";

const Home = () => {
  const [modalActivado, setModalActivado] = useState(false);
  const [cardValues, setCardValues] = useState({
    name: "",
    image: "",
    healthScore: 1,
    summary: "",
    diets: [],
  });
  const { myRecipes, loading, diets } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(cleanStates());
  }, [dispatch]);

  useEffect(() => {
    if (!diets.length) {
      dispatch(getDiets());
    }
  }, [dispatch, diets]);

  const [page, setPage] = useState(1);
  //indices del array
  const finalPage = page * 12;
  const startPage = finalPage - 12;
  const actualPage = myRecipes?.slice(startPage, finalPage);
  const totalPages = Math.ceil(myRecipes.length / 12);
  console.log(myRecipes);
  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePageNumber = (n) => {
    setPage(n);
  };

  return (
    <>
      {modalActivado && (
        <DetalleModal
          cardValues={cardValues}
          setModalActivado={setModalActivado}
        />
      )}

      <div className="all">
        {location.pathname === "/home" && <Navbar setPage={setPage} />}

        <div className={styles.contenedor}>
          {loading ? (
            <div className={styles.loader}>
              {/* <img src={loader} alt="Loading" /> */}
            </div>
          ) : actualPage.length > 0 ? (
            actualPage.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <Card
                    setCardValues={setCardValues}
                    setModalActivado={setModalActivado}
                    id={recipe.id}
                    name={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets}
                    healthScore={recipe.healthScore}
                    summary={recipe.summary}
                  />
                </div>
              );
            })
          ) : (
            <h2>it is not available requiered recipe</h2>
          )}
        </div>

        <div className={styles.paginado}>
          <Paginado
            totalPages={totalPages}
            page={page}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
            pageNumber={handlePageNumber}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
