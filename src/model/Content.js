export default class Content {
  constructor(
    attachments,
    cardID,
    cardTitle,
    content,
    date,
    labels,
    priority,
    status,
    title
  ) {
    this.attachments = attachments;
    this.cardID = cardID;
    this.cardTitle = cardTitle;
    this.content = content;
    this.date = date;
    this.labels = labels;
    this.priority = priority;
    this.status = status;
    this.title = title;
  }
}
