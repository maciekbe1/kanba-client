import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@material-ui/core";
import DroppableContainer from "./DroppableContainer";
import RemoveCard from "./RemoveCard";
import Modal from "../Utils/Modal";
import CreateCardItem from "./CreateCardItem";

export default function DragDropComponent({ cards, onDragEnd, userID }) {
	const [dialog, setDialog] = useState(false);
	const [cardID, setCardID] = useState();
	const [open, setOpen] = useState(false);
	const [isDrag, setIsDrag] = useState(false);
	const modalHandler = card => {
		setCardID(card);
		setOpen(!open);
	};

	const dialogHandler = () => {
		setDialog(!dialog);
	};

	const removeCard = card => {
		setCardID(card);
		setDialog(true);
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="all-cards" type="CARD">
					{provided => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{cards.map((card, key) => (
								<Draggable
									key={card._id}
									draggableId={card._id}
									index={key}
									isDragDisabled={isDrag}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Card
												style={{
													margin: "5px auto",
													overflow: "visible"
												}}
											>
												<DroppableContainer
													droppableId={card}
													list={cards[key].list}
													removeCard={removeCard}
													index={key}
													modalHandler={modalHandler}
													setIsDrag={setIsDrag}
												/>
												{/* {provided.placeholder} */}
											</Card>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<RemoveCard
				dialog={dialog}
				dialogHandler={dialogHandler}
				cardID={cardID}
				userID={userID}
			/>
			<Modal modalHandler={modalHandler} openProps={open}>
				<CreateCardItem modalHandler={modalHandler} cardID={cardID} />
			</Modal>
		</>
	);
}
