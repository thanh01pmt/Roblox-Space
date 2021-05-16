export function Find<T extends Instance>(instance: Instance, instanceName: string): T {
    return instance.FindFirstChild(instanceName, true) as T;
}