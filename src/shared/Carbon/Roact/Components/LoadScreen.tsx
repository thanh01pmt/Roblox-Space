import Roact from "@rbxts/roact";

interface LoadScreenProps {
	Image: string
}

export function LoadScreen(args: LoadScreenProps) {
	return <screengui ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
		<imagelabel
			Key="Background"
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundTransparency={1}
			Image={args.Image}
			Position={new UDim2(0.5, 0, 0.5, -25)}
			Size={new UDim2(1, 0, 1, 50)}
		>
			<frame
				Key="Bar"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(67, 77, 111)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.75, 0)}
				Size={new UDim2(0.4, 0, 0.05, 0)}
			>
				<frame
					Key="Top"
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BorderSizePixel={0}
					ClipsDescendants={true}
					Size={new UDim2(1, 0, 1, 0)}
				>
					<uicorner CornerRadius={new UDim(0, 16)} />
					<uigradient
						Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(221, 221, 221))])}
						Rotation={90}
					/>
				</frame>
				<uicorner CornerRadius={new UDim(0, 16)} />
				<uigradient
					Color={new ColorSequence([new ColorSequenceKeypoint(0, Color3.fromRGB(255, 255, 255)), new ColorSequenceKeypoint(1, Color3.fromRGB(221, 221, 221))])}
					Rotation={90}
				/>
			</frame>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBlack}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0, 200, 0, 50)}
				Text="Loading..."
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextStrokeTransparency={0.4}
				TextWrapped={true}
			/>
		</imagelabel>
	</screengui>
}