import { NullishFunction } from "../Framework";

export abstract class BaseComponent {    
    public abstract readonly Name: string;
    public abstract Start?: NullishFunction;
    public abstract Update?: NullishFunction;
    public abstract Run?: NullishFunction;
}

export abstract class NetworkComponent extends BaseComponent {    
    abstract readonly Network: object;
}