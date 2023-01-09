import { DAOType } from "./dao-type.js";
import { IDAO } from "./idao/dao.js";
import { MongoDBDAO } from "./mongodb-dao/dao.js";

export class DAOFactory {
    private static dao: IDAO | null = null;

    public static getDAOInstance(type: DAOType): IDAO | null {
        if (DAOFactory.dao === null) {
            if (type === DAOType.MongoDB) {
                DAOFactory.dao = new MongoDBDAO();
            }
        }

        return DAOFactory.dao;
    }
}
