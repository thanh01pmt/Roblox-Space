import { Character } from "../Framework";
import { Find } from "./Find";

export function Teleport(cf: CFrame | undefined) {
    const torso = Find<BasePart>(Character, "UpperTorso") ?? Find<BasePart>(Character, "UpperTorso");
    torso.CFrame = (cf ?? torso.CFrame).add(new Vector3(0, 6, 0));
}