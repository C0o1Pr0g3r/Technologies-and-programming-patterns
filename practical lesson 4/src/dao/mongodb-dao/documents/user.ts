import { ObjectId } from "mongodb";

export interface MongoDBUser {
    login: string;
    password: string;
    role_id: ObjectId;

    [index: string]: MongoDBUser[keyof MongoDBUser];
}