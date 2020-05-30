import React from "react";
import Title from "components/Common/Title";
import Actions from "components/Cards/DragDrop/CardComponent/Actions";
import { removeCard, updateCard } from "actions/cardsActions";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

export default function Navbar({
  cardID,
  listLength,
  cardTitle,
  cardExpand,
  index,
  onRemove,
  provided
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer);

  const onRemoveCard = () => {
    onRemove({
      dialogTitle: "Napewno chcesz usunac karte?",
      dialogText: cardTitle,
      remove: () => {
        CardsService.removeCard(cardID, user.data._id, user.token);
        dispatch(removeCard({ cardID }));
      }
    });
  };

  const onTitleChange = (title) => {
    dispatch(
      updateCard({
        cardID,
        title: title,
        token: user.token,
        index
      })
    );
  };

  const onToggle = () => {
    dispatch(
      updateCard({
        cardID,
        expand: !cardExpand,
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
        <Title title={cardTitle} onTitleChange={onTitleChange} />
      </div>
      <Actions
        expand={cardExpand}
        listLength={listLength}
        onRemoveCard={onRemoveCard}
        onToggle={onToggle}
        cardID={cardID}
      />
    </div>
  );
}
