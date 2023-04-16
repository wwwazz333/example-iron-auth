import { useTsController } from "@ts-react/form";

export function TextField() {
	const {
		field: { onChange, value },
		error,
	} = useTsController<string>();

	return (
		<div>
			<input
				onChange={(e) => onChange(e.target.value)}
				value={value ? value : ""}
				className="border border-gray-300 rounded-md"
			/>
			{error && error.errorMessage}
		</div>
	);
}