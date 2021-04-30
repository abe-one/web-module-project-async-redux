import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../helpers/mapStateToProps";
import { fetchUrlPokemon, setKeyDown, fetchPrevNextUrlPokemon } from "../store";

const Pagination = ({
  pagination,
  onDisplayCount,
  fetchUrlPokemon,
  userKeyDown,
  fetchPrevNextUrlPokemon,
}) => {
  //

  const { totPokemonCount, nextCall, prevCall, currentCall } = pagination;

  useEffect(() => fetchPrevNextUrlPokemon(prevCall, nextCall), [
    prevCall,
    nextCall,
    fetchPrevNextUrlPokemon,
  ]);

  useEffect(() => {
    if (userKeyDown === "ArrowLeft") {
      prevCall
        ? fetchUrlPokemon(prevCall)
        : console.log("You're at the beginning");
    } else if (userKeyDown === "ArrowRight") {
      nextCall ? fetchUrlPokemon(nextCall) : console.log("You're at the end");
    }
  }, [userKeyDown, fetchUrlPokemon, prevCall, nextCall]);

  return (
    <div className="pagination">
      {prevCall ? (
        <input
          type="button"
          onClick={() => {
            fetchUrlPokemon(prevCall);
          }}
          value={`Previous ${currentCall.callCount} of ${currentCall.prevCount}`}
        />
      ) : null}
      <p>
        Displaying {onDisplayCount} of {totPokemonCount} Pokemon
      </p>
      {nextCall ? (
        <input
          type="button"
          value={`Next ${currentCall.callCount} of ${currentCall.nextCount}`}
          onClick={() => {
            fetchUrlPokemon(nextCall);
          }}
        />
      ) : null}
    </div>
  );
};

const mapState = mapStateToProps(
  "pagination",
  "userKeyDown",
  "prevUrlPokemon",
  "nextUrlPokemon"
);

export default connect(mapState, {
  fetchUrlPokemon,
  setKeyDown,
  fetchPrevNextUrlPokemon,
})(Pagination);
