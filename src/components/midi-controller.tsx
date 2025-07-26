import { JSXElement, onCleanup, onMount, Setter } from "solid-js"
import { getNoteName } from "~/lib/utils"

type MIDIControllerProps = {
    setNotes: Setter<string[]>
    children: JSXElement
}

export function MIDIController(props: MIDIControllerProps) {
    const inputs: MIDIInput[] = []

    onMount(() => {

        const handleMIDIMessage = (message: MIDIMessageEvent) => {
            if (message.data) {
                const [command, note, velocity] = message.data

                if (command === 144 && velocity > 0) {
                    props.setNotes(prev => [ ...prev, getNoteName(note) ])
                } else if (command === 128) {
                    props.setNotes(prev => prev.filter(item => item !== getNoteName(note)))
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

    return props.children
}
