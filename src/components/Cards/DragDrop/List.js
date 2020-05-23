import React, { memo } from "react";
import Item from "components/Cards/DragDrop/Item";
import { Droppable } from "react-beautiful-dnd";
import ItemInfo from "components/Cards/DragDrop/ItemComponent/ItemInfo";
import { updateItem } from "actions/cardsActions";
import * as CardsService from "services/CardsService";
import { useDispatch, useSelector } from "react-redux";
import Title from "components/Common/Title";

export default function List({ card }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const isOpen = useSelector((state) => state.cardsReducer.isContentOpen);
  const itemContent = useSelector(
    (state) => state.cardsReducer.itemContentData
  );
  const InfoComponent = ({ item }) => {
    return <ItemInfo status={item.status} priority={item.priority} />;
  };
  const TitleComponent = ({ item }) => {
    const onItemChange = (element, type) => {
      CardsService.updateItem(card._id, item._id, type, element, token);
      dispatch(
        updateItem({
          itemID: item._id,
          cardID: card._id,
          [type]: element
        })
      );
      if (isOpen && type === "title" && itemContent._id === item._id) {
        const elem = document.querySelector(
          `.card-item-content .title-component p`
        );
        elem.textContent = element;
      }
    };
    return <Title title={item.title} onTitleChange={onItemChange} />;
  };
  return (
    <Droppable droppableId={card._id} type="LIST">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ minHeight: "20px" }}
        >
          {card.list.map((item, index) => (
            <InnerItem
              cardID={card._id}
              key={item._id}
              item={item}
              index={index}
              info={<InfoComponent item={item} />}
              title={<TitleComponent item={item} />}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const InnerItem = memo(function InnerItem({
  item,
  index,
  cardID,
  info,
  title
}) {
  return (
    <Item item={item} index={index} cardID={cardID} info={info} title={title} />
  );
});
