import Maid, { Task } from "@rbxts/maid";

export class Disposable {
    private maid = new Maid();

    public GiveTask(task: Task): number {
        return this.maid.GiveTask(task);
    }

    public Destroy() {
        this.maid.Destroy();
    }
}