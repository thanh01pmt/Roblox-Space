import { Players, ReplicatedStorage as Replicated, Workspace, RunService as Runtime } from "@rbxts/services";
import { BaseComponent, NetworkComponent } from "./Internal/Component";
import { Disposable } from "./Classes/Utility/Disposable";
import { UI } from "./Classes/Client/UI";
import { Exception } from "./Internal/Exception";
import { Find } from "./Utility/Find";

const Camera = Workspace.CurrentCamera as Camera;
const Assets = Find<Folder>(Replicated, "Assets");
const Player: Player = Players.LocalPlayer;
let Character: Model;

if (Player) 
    Character = Player.Character ?? Player.CharacterAdded.Wait()[0];

export type NullishInstance = 
    | Instance
    | undefined;

export type NullishModel = 
    | Model 
    | undefined;
    
export type NullishBoolean =
    | boolean
    | undefined;

export type NullishNumber = 
    | number
    | undefined;

export type NullishFunction = 
    | Callback
    | undefined;
 
export class Carbon {
    public static readonly Render: RBXScriptSignal = Runtime.RenderStepped;
    public static readonly Stepped: RBXScriptSignal = Runtime.Stepped;
    public static readonly Update: RBXScriptSignal = Runtime.Heartbeat;
    private static readonly isClient = Runtime.IsClient()

    public static RunComponents(...componentList: BaseComponent[]) {
        componentList.forEach(component => this.RunComponent(component));
    }

    public static RunComponent(component: BaseComponent) {
        if (component.Start) {
            try {
                component.Start(component);
            } catch(err) {
                throw new Exception(`[${component.Name}] ${err}`);
            }
        }

        let step: RBXScriptConnection;
        let upd: RBXScriptConnection;

        if (this.isClient) {
            Runtime.BindToRenderStep(
                component.Name, 
                Enum.RenderPriority.Camera.Value, 
                (dt: number): void => {
                    /*  Compiler fails here. 
                        component.Update(dt) should compile to component:Update(dt). 
                        Instead, it compiles to component.Update(dt), therefore I use component.Update(component, dt)  */
                    if (component.Update) {
                        try {
                            component.Update(component, dt);
                        } catch(err) {
                            throw new Exception(`[${component.Name}] ${err}`);
                        }
                    }
                }
            );

            step = this.Stepped.Connect((time: number, dt: number): void => {
                if (component.Run) {
                    try {
                        component.Run(component, time, dt);
                    } catch(err) {
                        throw new Exception(`[${component.Name}] ${err}`);
                    }
                }
            });

            if (!component.Update)
                Runtime.UnbindFromRenderStep(component.Name);
            if (!component.Run)
                step.Disconnect();
        } else {
            upd = this.Update.Connect((dt: number): void => {
                if (component.Update) {
                    try {
                        component.Update(component, dt);
                    } catch(err) {
                        throw new Exception(`[${component.Name}] ${err}`);
                    }
                }
            });

            if (!component.Update)
                upd.Disconnect();
        }
    }
}

export { Assets, Player, Character, Camera };
export { 
    UI,
    Disposable,
    NetworkComponent,
    BaseComponent as Component,
};