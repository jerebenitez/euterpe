import { createForm, setValue, SubmitHandler, zodForm } from "@modular-forms/solid";
import {
  NoteRecognitionExercise,
  NoteRecognitionExerciseSchema,
} from "./schema";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "~/components/ui/number-field";

export function NoteRecognitionForm(props: { id: string }) {
  const [exerciseForm, { Form, Field }] = createForm<NoteRecognitionExercise>({
    validate: zodForm(NoteRecognitionExerciseSchema),
    initialValues: {
        notesAmount: 1
    }
  });

  const handleSubmit: SubmitHandler<NoteRecognitionExercise> = (
    values,
    event,
  ) => {
    console.log(values);
  };

  return (
    <Form id={props.id} onSubmit={handleSubmit}>
      <Field name="notesAmount" type="number" revalidateOn="change">
        {(field, fieldProps) => (
          <NumberField
            value={field.value}
            validationState={field.error ? "invalid" : "valid"}
            class="w-[180px]"
          >
            <NumberFieldLabel>Notes amount</NumberFieldLabel>
            <NumberFieldGroup>
              <NumberFieldInput
                {...fieldProps}
                aria-invalid={!!field.error} 
                onInput={e => {
                    const value = e.currentTarget.value

                    if (value === "" || isNaN(value)) {
                        setValue(exerciseForm, "notesAmount", 0)
                    } else {
                        const numValue = Number(value)
                        setValue(exerciseForm, "notesAmount", numValue)
                    }
                }}
            />
              <NumberFieldIncrementTrigger />
              <NumberFieldDecrementTrigger />
            </NumberFieldGroup>
            {field.error && (
              <NumberFieldErrorMessage>{field.error}</NumberFieldErrorMessage>
            )}
          </NumberField>
        )}
      </Field>
    </Form>
  );
}
