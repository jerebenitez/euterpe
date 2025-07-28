import Check from "lucide-solid/icons/check";
import { createSignal, For, Setter, Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Grid } from "~/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { NoteRecognitionForm } from "~/exercises/note-recognition/form";

type ClefTypes = "treble" | "bass" | "both";
type ClefSelectorOption = {
  name: string;
  value: ClefTypes;
};

function ClefSelector(props: {
  clef: ClefTypes;
  setClef: Setter<ClefTypes>;
  options: ClefSelectorOption[];
}) {
  const defaultValue = props.options.find((item) => item.value === props.clef);

  return (
    <>
      <Select
        onChange={(value) => {
          if (value) props.setClef(value.value);
        }}
        defaultValue={defaultValue}
        options={props.options}
        optionValue="value"
        optionTextValue="name"
        placeholder="Select a clef"
        itemComponent={(p) => (
          <SelectItem item={p.item}>{p.item.rawValue.name}</SelectItem>
        )}
      >
        <SelectTrigger aria-label="Clef" class="w-[180px]">
          <SelectLabel>Clef: </SelectLabel>
          <SelectValue<ClefSelectorOption>>
            {(state) => state.selectedOption().name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
    </>
  );
}

type Key = "A" | "B" | "C" | "D" | "E" | "F";

function KeySelector(props: { key: Key; setKey: Setter<Key>; options: Key[] }) {
  return (
    <>
      <Select
        value={props.key}
        onChange={props.setKey}
        defaultValue={props.key}
        options={props.options}
        placeholder="Select a key"
        itemComponent={(p) => (
          <SelectItem item={p.item}>{p.item.rawValue}</SelectItem>
        )}
      >
        <SelectTrigger aria-label="Clef" class="w-[180px]">
          <SelectLabel>Key: </SelectLabel>
          <SelectValue<Key>>{(state) => state.selectedOption()}</SelectValue>
        </SelectTrigger>
        <SelectContent />
      </Select>
    </>
  );
}

export default function NoteRecognitionPage() {
  const [clef, setClef] = createSignal<ClefTypes>("both");
  const clefOptions: { name: string; value: ClefTypes }[] = [
    { name: "G (treble)", value: "treble" },
    { name: "F (bass)", value: "bass" },
    { name: "Grand staff", value: "both" },
  ];

  const [key, setKey] = createSignal<Key>("C");
  const keys: Key[] = ["A", "B", "C", "D", "E", "F"];

  return (
    <main class="container flex flex-col gap-4 p-8 h-full">
      <Grid cols={4} class="w-full gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>KPI 1</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average</CardTitle>
          </CardHeader>
          <CardContent>0,3 s</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
          <CardContent>KPI 3</CardContent>
        </Card>
      </Grid>
      <nav class="flex w-full justify-between items-center">
        <ClefSelector clef={clef()} setClef={setClef} options={clefOptions} />
        <KeySelector key={key()} setKey={setKey} options={keys} />
      </nav>
      <nav class="flex w-full justify-between items-center">
        <NoteRecognitionForm id="form-id" />
      </nav>
      <section class="flex-1">Exercise</section>
      <footer class="self-end">
        <Button type="submit" form="form-id">Begin!</Button>
      </footer>
    </main>
  );
}
