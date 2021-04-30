import axios from "axios";

//\/\/\/\/\/\/\/\/\/\ ACTION TYPES /\/\/\/\/\/\/\/\/\/\\

export const SET_KEYDOWN = "SET_KEYDOWN";

//\/\/\/\/\/\/\/\/\/\ FETCH ACTION TYPES /\/\/\/\/\/\/\/\/\/\\

export const URL_POKEMON = "URL_POKEMON";
export const PREV_URL_POKEMON = "PREV_URL_POKEMON";
export const NEXT_URL_POKEMON = "NEXT_URL_POKEMON";
export const PREV_PKMN = "PREV_PKMN";
export const NEXT_PKMN = "NEXT_PKMN";
export const ANY = "ANY";
export const PKMN = "PKMN";
export const fSTART = (dataName) => `FETCH_${dataName}_START`;
export const fSUCCESS = (dataName) => `FETCH_${dataName}_SUCCESS`;
export const fFAILURE = (dataName) => `FETCH_${dataName}_FAILURE`;
export const fCOMPLETE = (dataName) => `FETCH_${dataName}_COMPLETE`;

//\/\/\/\/\/\/\/\/\/\ ACTION CREATOR /\/\/\/\/\/\/\/\/\/\\

const actionCreator = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

//\/\/\/\/\/\/\/\/\/\ ACTIONS /\/\/\/\/\/\/\/\/\/\\

export const setKeyDown = (key) => actionCreator(SET_KEYDOWN, key);

const fetchData = (dispatch, getState, dataName, url) => {
  if (!getState().pendingCalls.find((call) => call === url)) {
    dispatch(actionCreator(fSTART(dataName), url));
    dispatch(actionCreator(fSTART(ANY), url));

    axios
      .get(url)
      .then((res) => {
        dispatch(actionCreator(fSUCCESS(dataName), res.data));
      })
      .catch((err) =>
        dispatch(actionCreator(fFAILURE(dataName), `${err.message}`))
      )
      .finally(() => {
        dispatch(actionCreator(fCOMPLETE(dataName)));
        dispatch(actionCreator(fCOMPLETE(ANY), url));
      });
  } // fetchData
};

export const fetchUrlPokemon = (url) => (dispatch, getState) => {
  dispatch(setKeyDown(null));

  const prevUrl = getState().prevUrlPokemon;
  const nextUrl = getState().prevUrlPokemon;

  if (url === prevUrl.url) {
    dispatch(actionCreator(fSUCCESS(URL_POKEMON), prevUrl));
  } else if (url === nextUrl.url) {
    dispatch(actionCreator(fSUCCESS(URL_POKEMON), nextUrl));
  } else {
    fetchData(dispatch, getState, URL_POKEMON, url);
  }
};
//\/\/\/\/\/\/\/\/\/\  /\/\/\/\/\/\/\/\/\/\\

export const fetchPkmn = (url) => (dispatch, getState) => {
  const pokemonList = getState().pokemonList;
  const idFromUrl = parseInt(
    url.split("https://pokeapi.co/api/v2/pokemon/")[1].slice(0, -1)
  );
  const matchingPkmn = pokemonList.find((pkmn) => pkmn.id === idFromUrl);
  if (!matchingPkmn) {
    fetchData(dispatch, getState, PKMN, url);
  }
}; //fetchPkmn

export const fetchPrevNextUrlPokemon = (prevCall, nextCall) => (
  dispatch,
  getState
) => {
  if (prevCall) {
    fetchData(dispatch, getState, PREV_URL_POKEMON, prevCall);
  } /*
  Handle else, set to null
  null payload targeting state??
   */
  if (nextCall) {
    fetchData(dispatch, getState, NEXT_URL_POKEMON, nextCall);
  }
}; //fetchPrevNextUrlPokemon

//\/\/\/\/\/\/\/\/\/\  /\/\/\/\/\/\/\/\/\/\\
