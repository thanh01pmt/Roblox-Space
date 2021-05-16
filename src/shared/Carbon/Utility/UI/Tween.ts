import { TweenService as Tweens } from "@rbxts/services";

export function Tween(i: Instance, ti: TweenInfo, goal: object): Tween {
    const tween: Tween = Tweens.Create(i, ti, goal);
    tween.Play();
    return tween;
}