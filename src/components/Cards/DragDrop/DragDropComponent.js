import React, { memo } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Card from "components/Cards/DragDrop/Card";

import * as CardsService from "services/CardsService";
import * as CardsHelper from "helper/CardsHelper";

import { cloneDeep, isNull, find, isNil } from "lodash";

import { useSelector, useDispatch } from "react-redux";
import {
  setCards,
  updateCard,
  setSelectedItems
} from "store/actions/cardsActions";
import { isEmpty } from "lodash";

export default function DragDropComponent({ onRemove }) {
  const selectedItems = useSelector(
    (state) => state.cardsReducer.selectedItems
  );
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cardsReducer.cardsState);
  const userID = useSelector((state) => state.authReducer.data._id);

  const onDragEnd = (result) => {
    let newData = cloneDeep(cards);
    if (
      isNull(result.destination) ||
      (result.destination?.index === result.source?.index &&
        result.destination.droppableId === result.source.droppableId)
    ) {
      return cards;
    } else if (selectedItems.length >= 1) {
      const selectedContainItem = selectedItems.some(
        (item) => item._id === result.draggableId
      );

      const position = result.destination.index;

      if (!selectedContainItem) {
        const card = find(cards, ["_id", result.source.droppableId]);
        const item = find(card.list, ["_id", result.draggableId]);
        const newSelectedItems = [item, ...selectedItems];

        dispatch(setSelectedItems(newSelectedItems));

        CardsService.updateManyItems(
          result.destination.droppableId,
          newSelectedItems.map((item) => {
            return {
              itemID: item._id,
              cardID: isNil(item.cardID)
                ? result.source.droppableId
                : item.cardID
            };
          }),
          position
        );
        const newCards = CardsHelper.cardItemsSelectedChange(
          cards,
          result,
          newSelectedItems
        );
        dispatch(setCards({ cards: newCards }));
      } else {
        CardsService.updateManyItems(
          result.destination.droppableId,
          selectedItems.map((item) => {
            return {
              itemID: item._id,
              cardID: isNil(item.cardID)
                ? result.source.droppableId
                : item.cardID
            };
          }),
          position
        );
        const newCards = CardsHelper.cardItemsSelectedChange(
          cards,
          result,
          selectedItems
        );
        dispatch(setCards({ cards: newCards }));
      }
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId === result.source.droppableId
    ) {
      try {
        CardsService.cardItemChange(result);
        const newCards = CardsHelper.cardItemChange(newData, result);
        dispatch(
          setCards({
            cards: newCards
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else if (
      result.type === "LIST" &&
      result.destination.droppableId !== result.source.droppableId
    ) {
      try {
        const { start, end, newCards } = CardsHelper.cardItemShared(
          cards,
          result
        );
        CardsService.cardItemShared(start, end, result);
        dispatch(
          setCards({
            cards: newCards
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const newCards = CardsHelper.cardChange(cards, result);
        dispatch(
          setCards({
            cards: newCards
          })
        );
        dispatch(
          updateCard({
            cardID: result.draggableId,
            position: {
              userID,
              source: result.source.index,
              destination: result.destination.index
            },
            type: "all_cards",
            index: result.source.index
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isEmpty(cards) ? (
    <div>Brak kart</div>
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-cards" type="CARD">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              flex: "1 1 auto",
              overflowY: "auto",
              height: "calc(100vh - 112px)"
            }}
          >
            {cards.map((card, index) => (
              <InnerCard
                card={JSON.stringify(card)}
                key={card._id}
                index={index}
                onRemove={onRemove}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
const InnerCard = memo(function InnerCard({ card, onRemove, index }) {
  return <Card card={JSON.parse(card)} index={index} onRemove={onRemove} />;
});
