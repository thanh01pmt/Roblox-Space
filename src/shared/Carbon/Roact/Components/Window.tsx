import Roact from "@rbxts/roact";
import { Find } from "shared/Carbon/Utility/Find";
import { FindAncestor } from "shared/Carbon/Utility/FindAncestor";
import { Tween } from "shared/Carbon/Utility/UI";

interface WindowProperties {
	Title: string;
	Icon?: string;
	Scrolling?: boolean;
	Enabled?: boolean;
}

const defaultButtonColor = Color3.fromRGB(93, 93, 93)
const animInfo = new TweenInfo(.15, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);
const ButtonAnims = {
	MouseEnter: (rbx: GuiButton) => {
		let color = new Color3();
		switch(rbx.Name) {
			case "Close":
				color = Color3.fromRGB(251, 97, 88);
				break;
			case "Maximize":
				color = Color3.fromRGB(254, 189, 46);
				break;
			case "Minimize":
				color = Color3.fromRGB(41, 203, 64);
				break;
		}

		Tween(rbx, animInfo, {
			BackgroundColor3: color
		});
	},
	MouseLeave: (rbx: GuiButton) => Tween(rbx, animInfo, {
		BackgroundColor3: defaultButtonColor
	})
};

export const WindowUIStyle = {
    ZIndexBehavior: Enum.ZIndexBehavior.Global
}

export class Window extends Roact.Component<WindowProperties> {
	public render() {
		return (
			<frame
				Key={this.props.Title}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(99, 102, 104)}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0.5, 0, 0.55, 0)}
				Visible={this.props.Enabled ?? true}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
				<frame
					Key="Topbar"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(53, 53, 53)}
					Position={new UDim2(0.5, 0, 0.075, 1)}
					Size={new UDim2(1, -5, 0.15, -5)}
					ZIndex={2}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
					<textbutton
						Key="Close"
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutoButtonColor={false}
						BackgroundColor3={defaultButtonColor}
						Font={Enum.Font.SourceSans}
						Position={new UDim2(0.04, 0, 0.35, 0)}
						Size={new UDim2(0.04, 0, 0.45, 0)}
						Text={""}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextSize={14}
						ZIndex={3}
						Event={{
							MouseEnter: ButtonAnims.MouseEnter,
							MouseLeave: ButtonAnims.MouseLeave,
							MouseButton1Click: (rbx: GuiButton) => FindAncestor<Frame>(rbx, this.props.Title).Visible = false
						}}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
					</textbutton>
					<textbutton
						Key="Maximize"
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutoButtonColor={false}
						BackgroundColor3={defaultButtonColor}
						Font={Enum.Font.SourceSans}
						Position={new UDim2(0.095, 0, 0.35, 0)}
						Size={new UDim2(0.04, 0, 0.45, 0)}
						Text={""}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextSize={14}
						ZIndex={3}
						Event={{
							MouseEnter: ButtonAnims.MouseEnter,
							MouseLeave: ButtonAnims.MouseLeave,
							MouseButton1Click: (rbx: GuiButton) => {
								const ui = FindAncestor<ScreenGui>(rbx, this.props.Title);
								const scale = Find<UIScale>(ui, "UIScale");
								scale.Scale += .1;
								scale.Scale = math.clamp(scale.Scale, .6, 1.8);
							}
						}}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
					</textbutton>
					<textbutton
						Key="Minimize"
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutoButtonColor={false}
						BackgroundColor3={defaultButtonColor}
						Font={Enum.Font.SourceSans}
						Position={new UDim2(0.15, 0, 0.35, 0)}
						Size={new UDim2(0.04, 0, 0.45, 0)}
						Text={""}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextSize={14}
						ZIndex={3}
						Event={{
							MouseEnter: ButtonAnims.MouseEnter,
							MouseLeave: ButtonAnims.MouseLeave,
							MouseButton1Click: (rbx: GuiButton) => {
								const ui = FindAncestor<ScreenGui>(rbx, this.props.Title);
								const scale = Find<UIScale>(ui, "UIScale");
								scale.Scale -= .1;
								scale.Scale = math.clamp(scale.Scale, .6, 1.8);
							}
						}}
					>
						<uicorner CornerRadius={new UDim(1, 0)} />
					</textbutton>
					<textlabel
						Key="Title"
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Font={Enum.Font.Ubuntu}
						Position={new UDim2(0.525, 0, 0.35, 0)}
						Size={new UDim2(0.325, 0, 0.525, 0)}
						Text={this.props.Title}
						TextColor3={Color3.fromRGB(164, 164, 164)}
						TextScaled={true}
						TextSize={14}
						TextStrokeTransparency={0.85}
						TextWrapped={true}
						ZIndex={3}
					/>
					<imagelabel
						Key="Icon"
						AnchorPoint={new Vector2(0.5, 0.5)}
						BackgroundTransparency={1}
						Image={this.props.Icon ?? "rbxassetid://6698452467"}
						Position={new UDim2(0.324, 0, 0.35, 0)}
						Size={new UDim2(0.058, 0, 0.625, 0)}
						ZIndex={3}
					>
						<uicorner CornerRadius={new UDim(0, 5)} />
					</imagelabel>
				</frame>
				<frame
					Key="Window"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(46, 46, 46)}
					Position={new UDim2(0.5, 0, 0.55, -1)}
					Size={new UDim2(1, -5, 0.9, -5)}
					ZIndex={2}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
				</frame>
				<frame
					Key="OutStroke"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, 2, 1, 2)}
					ZIndex={-1}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
				</frame>
				<frame
					Key="InStroke"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(0, 0, 0)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, -4, 1, -4)}
				>
					<uicorner CornerRadius={new UDim(0, 10)} />
				</frame>
				<uiaspectratioconstraint AspectRatio={1.5} />
				<uiscale Key="UIScale" Scale={1.3} />
				<scrollingframe
					Key="Content"
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Position={new UDim2(0.5, 0, 0.55, 0)}
					ScrollBarImageColor3={Color3.fromRGB(93, 93, 93)}
					ScrollBarThickness={14}
					ScrollBarImageTransparency={this.props.Scrolling ? 0 : 1}
					ScrollingEnabled={this.props.Scrolling ?? false}
					Size={new UDim2(0.985, 0, 0.9, 0)}
					ZIndex={3}
				>
				</scrollingframe>
			</frame>
		);
	}
}