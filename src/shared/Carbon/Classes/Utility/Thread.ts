import Maid from "@rbxts/maid";
import ObjectEvent from "@rbxts/object-event";

export class Thread {
	private readonly maid = new Maid();

	public constructor(
		private fn: Callback
	) {}

	public Spawn(...args: unknown[]): unknown {
		return coroutine.wrap(this.fn)(args);
	}

	public FastSpawn(...args: unknown[]): void {
		this.maid.GiveTask(() => {
			const ev = new ObjectEvent();
			const conn = ev.Connect(this.fn);
			ev.Fire(...args);
			conn.Disconnect();
		});
		this.maid.DoCleaning();
	}
}