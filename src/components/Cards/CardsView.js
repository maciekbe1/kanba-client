import React, { useState, useCallback } from "react";
import { isEmpty } from "lodash";
import DragDropComponent from "components/Cards/DragDrop/DragDropComponent";
import { useSelector } from "react-redux";

import RemoveDialog from "components/Cards/RemoveDialog";

export default function CardsView() {
  const cards = useSelector(state => state.cardsReducer.cardsState);
  const [dialog, setDialog] = useState(false);
  const [data, setData] = useState();

  const onRemove = useCallback(cardData => {
    setData(cardData);
    setDialog(!dialog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = useCallback(() => {
    setDialog(!dialog);
  }, [dialog]);

  return isEmpty(cards) ? (
    <p>nie masz list</p>
  ) : (
    <>
      <DragDropComponent onRemove={onRemove} />
      <RemoveDialog open={dialog} onClose={onClose} data={data} />
    </>
  );
}
