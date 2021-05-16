interface Workspace extends Model {
	Camera: Camera;
	Baseplate: Part & {
		Texture: Texture;
	};
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
}
