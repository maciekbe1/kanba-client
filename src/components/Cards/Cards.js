import React, { useEffect, useState, memo, useCallback } from "react";
import { setCards } from "actions/cardsActions";
import { setBar } from "actions/layoutActions";

import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import { CARDS_PROBLEM_MESSAGE } from "constants/index";
import CardsView from "components/Cards/CardsView";

export default function TestCards() {
  const userID = useSelector(state => state.authReducer.data._id);
  const token = useSelector(state => state.authReducer.token);
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    return fetchCards(dispatch, userID, token, setPending);
  }, [dispatch, userID, token, setPending]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return pending ? <div>loading</div> : <InnerCardView pending={pending} />;
}

const InnerCardView = memo(function InnerComponent({ pending }) {
  return <CardsView pending={pending} />;
});

function fetchCards(dispatch, userID, token, setPending) {
  CardsService.getCards(userID, token)
    .then(res => {
      setPending(false);
      return dispatch(setCards({ cards: res.data }));
    })
    .catch(error => {
      dispatch(
        setBar({ type: "error", message: CARDS_PROBLEM_MESSAGE, active: true })
      );
    });
}
