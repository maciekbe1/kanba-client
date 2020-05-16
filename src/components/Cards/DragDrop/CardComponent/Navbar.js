import React from "react";
import Title from "components/Common/Title";
import Actions from "components/Cards/DragDrop/CardComponent/Actions";
import { removeCard, updateCard } from "actions/cardsActions";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

export default function Navbar({ card, index, onRemove, provided }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);

  const onRemoveCard = () => {
    onRemove({
      dialogTitle: "Napewno chcesz usunac karte?",
      dialogText: card.title,
      remove: () => {
        CardsService.removeCard(card._id, user.data._id, user.token);
        dispatch(removeCard({ cardID: card._id }));
      }
    });
  };

  const onTitleChange = (title) => {
    dispatch(
      updateCard({
        cardID: card._id,
        title: title,
        token: user.token,
        index
      })
    );
  };

  const onToggle = () => {
    dispatch(
      updateCard({
        cardID: card._id,
        expand: !card.expand,
        token: user.token,
        index
      })
    );
  };

  return (
    <div className="card-navbar-component">
      <div className="flex align-center">
        <div {...provided.dragHandleProps} style={{ display: "flex" }}>
          <DragIndicatorIcon />
        </div>
        <Title title={card.title} onTitleChange={onTitleChange} />
      </div>
      <Actions
        expand={card.expand}
        listLength={card.list.length}
        onRemoveCard={onRemoveCard}
        onToggle={onToggle}
        cardID={card._id}
      />
    </div>
  );
}
