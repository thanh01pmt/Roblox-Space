import Roact from "@rbxts/roact";
import { PUI } from "shared/Carbon/Classes/Client/UI";
import { Window, WindowUIStyle } from "shared/Carbon/Roact/Components/Window";

Roact.mount(
    (
        <screengui {...WindowUIStyle}>
            <Window Title="Window Test" />
        </screengui>
    ),
    PUI, "WindowUI"
);