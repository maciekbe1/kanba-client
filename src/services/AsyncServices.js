export default {
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
};
//usage
// await AsyncSerive.asyncForEach(todoListExist.cards, async cardItem => {
//   console.log(cardItem);
//   if (cardItem.id === cardID) {
//     await Todo.find({ _id: todoListID }).updateOne({
//       $push: {
//         list: {
//           id: cuid(),
//           title: newItem.title,
//           content: newItem.content
//         }
//       }
//     });
//   }
// });
