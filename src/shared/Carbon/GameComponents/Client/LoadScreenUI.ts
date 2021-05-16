import { Component, Disposable, NetworkComponent, UI } from "shared/Carbon/Framework";
import { LoadBar } from "shared/Carbon/Utility/UI";

export class LoadScreenUI extends Disposable implements Component {
    public readonly Name = "UX";

    public Start() {
        this.GiveTask(() => {
            const loadScreen: ScreenGui = UI.Find("LoadScreen");
            const bg = UI.FindElement<ImageLabel>(loadScreen, "Background");
            const bar = UI.FindElement<Frame>(bg, "Bar");

            const loadbar = new LoadBar(bar);
            loadbar.Finished.Connect(() => loadScreen.Destroy());
            loadbar.RandomlyAddProgress(2);
        })
    }
}