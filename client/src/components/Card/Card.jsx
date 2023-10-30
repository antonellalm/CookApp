import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const navigate = useNavigate();
  const {
    name,
    image,
    healthScore,
    diets,
    summary,
    setCardValues,
    setModalActivado,
  } = props;

  function mostrarModal(name, image, healthScore, diets, summary) {
    setCardValues({
      name,
      image,
      healthScore,
      diets,
      summary,
    });
    setModalActivado(true);
  }

  const toDetail = () => {
    console.log(props.id);
    navigate(`/detailrecipe/${props.id}`);
  };
  return (
    <div
      className={styles.mainContainer}
      onClick={() => {
        mostrarModal(name, image, healthScore, diets, summary);
      }}
    >
      <img src={image} alt={name} className={styles.image} />

      <div key={props.id} className={styles.cardsContainer}>
        <h3 className={styles.name}>{name}</h3>

        <div className={styles.holis}>
          <p className={styles.healthScore}>
            Healthscore:
            <p>{healthScore}</p>
          </p>

          <p className={styles.tituloDiet}>Diets: </p>
        </div>

        <div className={styles.diet}>
          {diets?.map((diet, i) => {
            return (
              <div key={i} className={styles.diets}>
                <p classNam={styles.dieta}>
                  {diet.charAt(0).toUpperCase() + diet.slice(1)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
// el componente card esta renderizado en home , por lo tanto todo lo que se mueste en la card se mostrara en home , pero todo lo que yo haga en el componente queda en el comopente por eso el componente modal lo tenfo que renderizar en home, poner lo estados de que se active o desactive en home , y desde home le paso el setactivate a card, entonces cuando se haga click en la carta seteo el estado en true y se muestra el modal.
//Al modal que se muestra hay que pasarle las porpiedades que se mostraran de la carta y esa info parte de la card que se clickea. Entonces cuando se clickea no solo se puede setear el estado en true para que se muestre sino que podemos cambiar un estado en donde se rellenen todas las propiedades de la carta
//cuando se haga click se puede ejecutar una accion que seteee las propiedas de la carta nueva que se clickeo y asi la actualiza.

//crear estado en home para setear el activado y set activado +  estado de la indo que se muestra en el modal , que es un objeto.
//pasar el setactivado y el setcardvalue al componente card renderizado en home
//En card vamos a generar una funcion onClick en la div contenedor de la carta y adentro una arrow function donde se setea el estado en true, setactivado (true) y se ejecuta la funcion change valueCards(valor.valor.varlor) pasandole los valores de la carta que estan destructurados, La funcion setea el estado setcardvalues con todos los valores pasados por parametros
//Creamos el componente Modal, lo renderizamos en home, y le pasamos como propiedades el valor cardValues, asi luego en el componente modal se podrá rendirar la info como cardvalues.diets etc
