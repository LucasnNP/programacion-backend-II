import TicketDAO from "../dao/TicketDAO.js";

export default class TicketRepository {
  constructor() {
    this.dao = new TicketDAO();
  }

  create(ticketData) {
    return this.dao.create(ticketData);
  }

  getById(id) {
    return this.dao.getById(id);
  }
}
