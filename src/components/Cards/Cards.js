import React, { useEffect } from "react";
import { setCards, setCardsLoaded } from "actions/cardsActions";
import { setBar } from "actions/layoutActions";

import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import { CARDS_PROBLEM_MESSAGE } from "constants/index";
import CardsView from "components/Cards/CardsView";
export default function Cards() {
  const userID = useSelector((state) => state.authReducer.data._id);
  const token = useSelector((state) => state.authReducer.token);
  const isCardsLoaded = useSelector(
    (state) => state.cardsReducer.isCardsLoaded
  );
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCards(dispatch, userID, token, setCardsLoaded);
  }, [dispatch, userID, token]);
  return isCardsLoaded ? <CardsView token={token} /> : <div>Ładuję...</div>;
}

function fetchCards(dispatch, userID, token, setCardsLoaded) {
  CardsService.getCards(userID, token)
    .then((res) => {
      dispatch(setCards({ cards: res.data }));
      dispatch(setCardsLoaded(true));
    })
    .catch((error) => {
      dispatch(
        setBar({ type: "error", message: CARDS_PROBLEM_MESSAGE, active: true })
      );
    });
}
