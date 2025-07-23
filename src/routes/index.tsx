import { createSignal, onCleanup, onMount } from "solid-js";

function getNoteName(noteNumber: number): string {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(noteNumber / 12) - 1
    const note = names[noteNumber % 12]

    return `${note}${octave}`
}

export default function Home() {
    const inputs: MIDIInput[] = []
    const [note, setNote] = createSignal<string[]>([])

    onMount(() => {

        const handleMIDIMessage = (message: MIDIMessageEvent) => {
            if (message.data) {
                const [command, note, velocity] = message.data

                if (command === 144 && velocity > 0) {
                    setNote(prev => [ ...prev, getNoteName(note) ])
                } else if (command === 128) {
                    setNote(prev => prev.filter(item => item !== getNoteName(note)))
                }
            }
        }

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(access => {
                    for (const input of access.inputs.values()) {
                        input.onmidimessage = handleMIDIMessage
                        inputs.push(input)
                    }
                })
                .catch(() => {
                    console.log("Could not access your MIDI devices.")
                })
        }
    })
    
    onCleanup(() => {
        for (const input of inputs) {
            input.onmidimessage = null
        }
    })

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">{note()}</h1>
        </main>
    );
}
