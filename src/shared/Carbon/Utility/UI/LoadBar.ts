import ObjectEvent from "@rbxts/object-event";
import { Tweenable } from "../../Classes/Client/Tweenable";
import { UI } from "shared/Carbon/Classes/Client/UI";

export class LoadBar extends Tweenable {
    private progressSpeed: number;
    private top: Frame;
    private info: TweenInfo;
    private defaultSize: UDim2;

    public Progress: number;
    public Finished: ObjectEvent<any>;

    public constructor(bar: Frame, progressSpeed: number = .2) {
        const top = UI.FindElement<Frame>(bar, "Top");
        super(top);
        this.progressSpeed = progressSpeed;
        this.top = top;
        this.info = new TweenInfo(this.progressSpeed);
        this.defaultSize = this.top.Size;

        this.Progress = 0;
        this.Finished = new ObjectEvent();
        this.SetProgress();
    }

    public RandomlyAddProgress(speed: number = 1) {
        while (this.Progress !== 100)
            this.AddProgress(math.random(1/3, 1.25) * speed);
    }

    public AddProgress(progress: number = 1) {
        this.SetProgress(this.Progress + progress);
    }

    public SetProgress(progress: number = 0) {
        this.Progress = math.clamp(progress, 5, 100);
        this.Tween(this.info, {
            Size: new UDim2(
                this.Progress / 100,
                this.defaultSize.X.Offset,
                this.defaultSize.Y.Scale,
                this.defaultSize.Y.Offset
            )
        }).Completed.Wait();

        if (this.Progress === 100)
            this.Finished.Fire();
    }
}