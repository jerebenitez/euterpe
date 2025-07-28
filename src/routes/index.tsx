import { createSignal } from "solid-js";
import { MIDIController } from "~/components/midi-controller";
import { Score } from "~/components/easy-score";

export default function Home() {
    const [note, setNote] = createSignal<string[]>([])

    const notes = () => {
        const firstNote = note().length > 0 ? note() : ['b/4']
        const duration = note().length > 0 ? 'q' : 'qr'

        return [
		    { keys: firstNote, duration: duration },
		    { keys: ['b/4'], duration: 'qr' },
		    { keys: ['b/4'], duration: 'qr' },
		    { keys: ['b/4'], duration: 'qr' },
        ]
    };

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">{note().length > 0 ? note() : "None"}</h1>
            <MIDIController setNotes={setNote}>
                <Score notes={notes()} />
            </MIDIController>
        </main>
    );
}
