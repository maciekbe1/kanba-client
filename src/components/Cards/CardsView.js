import React, { useState, useCallback } from "react";
import DragDropComponent from "components/Cards/DragDrop/DragDropComponent";

import RemoveDialog from "components/Cards/RemoveDialog";
import Container from "@material-ui/core/Container";
import SideDial from "components/Cards/Actions/SideDial";
import Content from "components/Cards/DragDrop/ItemComponent/Content";

export default function CardsView() {
  const [dialog, setDialog] = useState(false);
  const [data, setData] = useState();

  const onRemove = useCallback((cardData) => {
    setData(cardData);
    setDialog(!dialog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClose = () => {
    setDialog(!dialog);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        style={{ display: "flex", height: "calc(100vh - 112px)" }}
      >
        <DragDropComponent onRemove={onRemove} />
        <Content />
      </Container>
      <RemoveDialog open={dialog} onClose={onClose} data={data} />
      <InnerSideDial onRemoveItems={onRemove} />
    </>
  );
}

const InnerSideDial = React.memo(function InnerSideDial({ onRemoveItems }) {
  return <SideDial onRemoveItems={onRemoveItems} />;
});
