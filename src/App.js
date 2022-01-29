import React, { useState } from "react";
import axios from "axios";
import "./style/css/App.css";

import Modal from "./Components/Modal/Modal.js";

import pokeballIcon from "./assets/pokeballIcon.png";
import lightIcon from "./assets/lightIcon.png";
import buttonsIcon from "./assets/buttonsIcon.png";
import cancelIcon from "./assets/cancelIcon.png";
import confirmIcon from "./assets/confirmIcon.png";

const App = () => {
  const [pokemon, setPokemon] = useState("p");
  const [pokemonData, setPokemonData] = useState([]);

  const getPokemon = async () => {
    const toArray = [];

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonData(toArray);
      console.log(res);
    } catch (error) {
      setIsModalVisible(true);
      cleanPokedex();
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getPokemon();
  };

  const pokemonNameInput = React.useRef();
  const cleanPokedex = () => {
    pokemonNameInput.current.value = "";
    setPokemon("p");
    setPokemonData([]);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className="App">
      <div className="header">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 683.000000 158.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,158.000000) scale(0.100000,-0.100000)"
            fill="#ff0000"
            stroke="none"
          >
            <path
              d="M0 789 l0 -790 1038 4 c1083 5 1077 5 1264 52 223 56 397 186 581 435 192 261 277 354 377 419 90 58 259 110 389 120 58 5 798 7 1644 5 l1537 -3 0 275 0 274 -3415 0 -3415 0 0 -791z"
              stroke="black"
              strokeWidth="50px"
            />
          </g>
        </svg>

        <img className="lightIcon" src={lightIcon} alt="lightIcon" />
        <img className="pokeballIcon" src={pokeballIcon} alt="pokeballIcon" />
      </div>
      <div className="infos">
        <ul>
          {pokemonData.map((data) => (
            <li key="{item}">
              {
                <img
                  id="pokemonImage"
                  src={data.sprites["front_default"]}
                  alt="pokemonImage"
                />
              }
            </li>
          ))}
        </ul>
      </div>
      <div className="options-container">
        <h1>Digite abaixo o nome do pokemon</h1>
        <div className="options">
          <img className="buttonsIcon" src={buttonsIcon} alt="buttonsIcon" />

          <form onSubmit={handleSubmit}>
            <label>
              <input
                id="pokemonName"
                type="text"
                onChange={handleChange}
                placeholder=""
                ref={pokemonNameInput}
              ></input>
            </label>
          </form>

          <div className="cancelConfirmContainer">
            <img
              className="cancelIcon"
              src={cancelIcon}
              onClick={cleanPokedex}
              alt="cancelIcon"
            />
            <img
              className="confirmIcon"
              src={confirmIcon}
              onClick={handleSubmit}
              alt="confirmIcon"
            />
          </div>
        </div>
      </div>
      {isModalVisible ? (
        <Modal onClose={() => setIsModalVisible(false)}>
          <h1>Pokemon não encontrado!</h1>
        </Modal>
      ) : null}
    </div>
  );
};

export default App;
