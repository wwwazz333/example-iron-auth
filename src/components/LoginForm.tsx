import { FormEvent } from 'react'

import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import { TextField } from './TextFeild';

// create the mapping
const mapping = [
  [z.string(), TextField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
const MyLoginForm = createTsForm(mapping);

const LoginFormSchema = z.object({
  login: z.string(),
  password: z.string(),
})

export default function Form({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string
  onSubmit: (data: z.infer<typeof LoginFormSchema>) => void
}) {
  return (
    <MyLoginForm
      schema={LoginFormSchema}
      onSubmit={onSubmit}
      renderAfter={() => <button type="submit">LogIn</button>}
    />
  );
}
