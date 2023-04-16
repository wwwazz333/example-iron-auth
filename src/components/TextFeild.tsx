import { useTsController } from "@ts-react/form";

export function TextField() {
	const {
		field: { onChange, value, name },
		error,
	} = useTsController<string>();

	return (
		<div>
			<label>{name} <input
				onChange={(e) => onChange(e.target.value)}
				value={value ? value : ""}
			/></label>
			{error && error.errorMessage}
		</div>
	);
}