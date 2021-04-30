import React, { useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../helpers/mapStateToProps";
import LoadingSpinner from "./LoadingSpinner";

const PokeCard = ({ pkmn }) => {
  const [isLoading, setIsLoading] = useState(true);

  let sprite = pkmn.sprites.other["official-artwork"].front_default;
  sprite = sprite ? sprite : pkmn.sprites.front_default;

  return (
    <div className="poke-card">
      <img
        src={sprite}
        hidden={isLoading}
        onLoad={() => setIsLoading(false)}
        // Handle image errors
        onError={() => {}}
        alt={pkmn.name}
      />
      <LoadingSpinner hidden={!isLoading} />
      <h4>{pkmn.name[0].toUpperCase() + pkmn.name.substring(1)}</h4>
    </div>
  );
};

const mapState = mapStateToProps("urlPokemon");

export default connect(mapState, {})(PokeCard);
