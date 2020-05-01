import React, { useState, useCallback } from "react";
import DragDropComponent from "components/Cards/DragDrop/DragDropComponent";

import RemoveDialog from "components/Cards/RemoveDialog";
import Container from "@material-ui/core/Container";
import SideDial from "components/Cards/Actions/SideDial";

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
      <Container>
        <DragDropComponent onRemove={onRemove} />
        <RemoveDialog open={dialog} onClose={onClose} data={data} />
      </Container>
      <SideDial onRemoveItems={onRemove} />
    </>
  );
}
