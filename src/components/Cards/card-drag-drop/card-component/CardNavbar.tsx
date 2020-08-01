import React from "react";
import Title from "components/Common/Title";
import CardMenu from "components/Cards/card-drag-drop/card-component/CardMenu";
import {
  removeCard,
  updateCard,
  closeItemContent
} from "store/actions/cardsActions";
import { useDispatch, useSelector } from "react-redux";
import * as CardsService from "services/CardsService";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { UserTypes } from "store/types";
interface RootState {
  authReducer: UserTypes;
}
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
  const userID: string = useSelector(
    (state: RootState) => state.authReducer.data._id
  );
  const token: string = useSelector(
    (state: RootState) => state.authReducer.token
  );
  const item = useSelector((state: any) => state.cardsReducer.itemContentData);

  const onRemoveCard = () => {
    onRemove({
      dialogTitle: "Napewno chcesz usunac karte?",
      dialogText: cardTitle,
      remove: () => {
        CardsService.removeCard(cardID, userID);
        if (item?.cardID === cardID) {
          dispatch(closeItemContent());
        }
        dispatch(removeCard({ cardID }));
      }
    });
  };

  const onTitleChange = (title: string) => {
    dispatch(
      updateCard({
        cardID,
        title: title,
        token,
        index
      })
    );
  };

  const onToggle = () => {
    dispatch(
      updateCard({
        cardID,
        expand: !cardExpand,
        token,
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
      <CardMenu
        expand={cardExpand}
        listLength={listLength}
        onRemoveCard={onRemoveCard}
        onToggle={onToggle}
        cardID={cardID}
      />
    </div>
  );
}
