import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import List from "components/Cards/DragDrop/List";
import CardNavbar from "components/Cards/DragDrop/CardComponent/CardNavbar";
import Collapse from "@material-ui/core/Collapse";

const getCardStyle = (draggableStyle) => ({
  margin: `0 0 8px 0`,
  ...draggableStyle
});

export default function DndCard({ card, index, onRemove }) {
  return (
    <Draggable key={card._id} draggableId={card._id} index={index}>
      {(provided) => (
        <Card
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          style={getCardStyle(provided.draggableProps.style)}
          className="card-component"
        >
          <CardContent>
            <CardNavbar
              cardID={card._id}
              cardTitle={card.title}
              cardExpand={card.expand}
              listLength={card.list.length}
              index={index}
              onRemove={onRemove}
              provided={provided}
            />
            <Collapse in={card.expand} timeout="auto" unmountOnExit>
              <InnerList card={JSON.stringify(card)} />
            </Collapse>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
const InnerList = React.memo(function InnerList({ card }) {
  return <List card={JSON.parse(card)} />;
});
