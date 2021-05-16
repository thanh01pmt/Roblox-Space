import DataStore2 from "@rbxts/datastore2"
import { Remotes } from "shared/Carbon/Remotes";

type Store = DataStore2<unknown>;

export class DataBase {
    private readonly NetworkUpdate = Remotes.Server.Create("DataBaseUpdate");
    
    public constructor(
        private readonly player: Player, 
        ...dataTypes: string[]
    ) {
        DataStore2.Combine("DATA", ...dataTypes);
    }

    private GetStore(name: string): Store {
        return DataStore2(name, this.player);
    }

    public InitStore(name: string, defaultValue?: unknown): Store {
        const store = this.GetStore(name);

        if (defaultValue !== undefined) {
            store.Get(defaultValue);
            store.Set(defaultValue);
        }

        store.Save();

        const db = this;
        function updateClient(storeName: string, value: unknown): void {
            store.Save();
            db.NetworkUpdate.SendToPlayer(db.player, storeName, value);
        }

        store.OnUpdate((value: unknown) => updateClient(name, value));
        return store;
    }

    public Get(name: string, defaultValue?: any): Promise<unknown> {
        const store = this.GetStore(name);
        return store.GetAsync();
    }

    public Set(name: string, value: any): Promise<unknown> {
        const store = this.GetStore(name);
        return new Promise(() => {
            store.Set(value)
            return value;
        });
    }
}