export function WaitFor<T extends Instance>(instance: Instance, instanceName: string): T {
    return instance.WaitForChild(instanceName) as T;
}