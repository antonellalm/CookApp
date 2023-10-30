// import styles from "./DetailRecipe.module.css";
import { NavLink, useParams } from "react-router-dom";
import styles from "./DetailRecipe.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
// import loader from "../img/41pV.gif";
import { useLocation } from "react-router-dom";

export default function Detail() {
  // const { idRecipe } = useParams();
  const { detail, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  //extraer un identificador (id) de una ruta (URL) contenida en location.pathname

  useEffect(() => {
    console.log(id);

    dispatch(getDetail(id));
  }, [dispatch, id]);

  const rexExp = /<[^>]*>/g;
  return (
    <div className={styles.container}>
      <NavLink to="/home">
        <button className={styles.back}>Back</button>
      </NavLink>
      {loading ? (
        <div className={styles.loader}>
          {/* <img src={loader} alt="Loading" className={styles.loader} /> */}
        </div>
      ) : (
        <div className={styles.data}>
          <h1>{detail.title}</h1>
          <img src={detail.image} alt={detail.title} />
          <h4 className={styles.hs}>HealthScore: {detail.healthScore} </h4>
          <h3>Summary</h3>
          <p>{detail.summary?.replace(rexExp, "")}</p>
          <h3>How to </h3>
          {detail.steps ? (
            <p>{detail.steps.replace(rexExp, "")}</p>
          ) : (
            <p>
              There are no instructions to follow for this recipe, but we're
              working on it!
            </p>
          )}
          <h4 className={styles.diets}>
            Diets:{" "}
            {detail.diets?.map((diet, i) => (
              <li key={i}>
                {diet.name.charAt(0).toUpperCase() + diet.name.slice(1)}
              </li>
            ))}
          </h4>
        </div>
      )}
    </div>
  );
}
