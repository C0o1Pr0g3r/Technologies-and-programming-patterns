export interface MongoDBRole {
    name: string;

    [index: string]: MongoDBRole[keyof MongoDBRole];
}