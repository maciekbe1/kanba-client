import { find, remove } from "lodash";

export const cardItemChange = (cards, result) => {
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  cards.map((card) => {
    const data = reorder(
      card.list,
      result.source.index,
      result.destination.index
    );
    if (card._id === result.source.droppableId) {
      card.list = data;
    }
    return data;
  });
  return cards;
};

export const cardItemShared = (cards, result) => {
  let start = find(cards, (o) => {
    return o._id === result.source.droppableId;
  });
  let end = find(cards, (o) => {
    return o._id === result.destination.droppableId;
  });
  const [removed] = start.list.splice(result.source.index, 1);
  removed.cardID = result.destination.droppableId;
  end.list.splice(result.destination.index, 0, removed);
  return { start, end, newCards: cards };
};

export const cardChange = (cards, result) => {
  const [removed] = cards.splice(result.source.index, 1);
  cards.splice(result.destination.index, 0, removed);
  return cards;
};

export const cardItemsSelectedChange = (cards, result, selected) => {
  const destinationCard = cards.find(
    (card) => card._id === result.destination.droppableId
  );

  cards.forEach((card) => {
    selected.forEach((s) => {
      remove(card.list, ["_id", s._id]);
      s.cardID = result.destination.droppableId;
    });
  });

  destinationCard.list.splice(result.destination.index, 0, ...selected);

  return cards;
};

export const removeSelectedItems = (cards, selectedItems) => {
  cards.forEach((card) => {
    selectedItems.forEach((s) => {
      remove(card.list, ["_id", s._id]);
    });
  });
  return cards;
};
