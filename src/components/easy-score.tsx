import { createEffect, onMount } from "solid-js";
import { Factory, Tickable } from "vexflow";

export type Note = {
    keys: string[],
    duration: string
}

export function Score(props: { notes: Note[] }) {
    let container!: HTMLDivElement 

    const renderScore = () => {
        container.innerHTML = "";
        const factory = new Factory({
          renderer: { elementId: container.id, width: 1100, height: 900 }
        });

        let x = 120
        let y = 80

        function appendSystem(width: number) {
            const system = factory.System({ x, y, width })
            x += width
            return system
        }

        let system = appendSystem(400)
        const score = factory.EasyScore()
        // Bind these three functions so the code looks cleaner.
        // Instead of score.voice(...), just call voice(...).
        const voice = score.voice.bind(score);
        const notes = score.notes.bind(score);
        const beam = score.beam.bind(score);

        system.addStave({
            voices: [
                voice(
                    notes("C#5/q, B4, A4, G#4")
                ),
            ]})
            .addClef("treble")
            .addTimeSignature("4/4")

        system.addStave({
            voices: [voice(notes("C#3/q, B2, A2/8, B2, C#3, D3", { clef: "bass", stem: "up" }))]
        })
            .addClef("bass")
            .addTimeSignature("4/4")

        system.addConnector()
        
        system = appendSystem(400)
        system.addStave({
            voices: [
                voice(
                    notes("C#5/q, B4, A4, G#4")
                ),
            ]})

        system.addStave({
            voices: [voice(notes("C#3/q, B2, A2/8, B2, C#3, D3", { clef: "bass", stem: "up" }))]
        })

        factory.draw();
    }
    
    onMount(renderScore)
    createEffect(renderScore)

    return <div id="vexflow-container" ref={container} />
}
