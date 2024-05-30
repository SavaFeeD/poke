import { db } from "../firebase";
import { child, push, update, ref as dbRef} from 'firebase/database';
import { useDatabaseList } from 'vuefire';

export class Table {
  tableName: string;
  updates: any;
  
  constructor(tableName: string) {
    this.tableName = tableName;
    this.updates = {};
  }

  private getDB(table: string, id?: string) {
    if (!!id) {
      return dbRef(db, table + '/' + id);
    } else {
      return dbRef(db, table);
    }
  }

  public get<T>(id?: string) {
    const dbReference = (!!id) ? this.getDB(this.tableName, id) : this.getDB(this.tableName); 
    
    // return useCollection<IOwner[]>(ownersCollection);
    return useDatabaseList<T>(dbReference);
  }

  public set<T>(data: T) {
    // A post entry.
    const schema: T = data;

    // Get a key for a new Post.
    const newSchemaKey = push(child(dbRef(db), this.tableName)).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    this.updates[`/${this.tableName}/` + newSchemaKey] = schema;

    return newSchemaKey;
  }

  public update() {
    const up = update(dbRef(db), this.updates);
    this.updates = {};
    return up;
  }
}