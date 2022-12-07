import server from "./httpSource";

export default class createFlowDAO {
  //Uploads flow to DB, returning the created flow's information and status
  async uploadFlow(flow) {
    try {
      const res = await server.post("/flow/add", flow);
      return { status: true, res: res };
    } catch (e) {
      return { status: false };
    }
  }
}
