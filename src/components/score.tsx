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
          renderer: { elementId: container.id, width: 500, height: 500 }
        });

        const system = factory.System({ width: 400 });

        const notes: Tickable[] = props.notes.map(note => {
            return factory.StaveNote(note)
        })
        const voices = factory.Voice().addTickables(notes)

        system.addStave({voices: [voices]})
            .addClef("treble")
            .addTimeSignature("4/4")
            .setStyle({ strokeStyle: "white", fillStyle: "white" }); // pentagrama gris claro

        notes.forEach(n => n.setStyle({
          fillStyle: "#fff",    // blanco
          strokeStyle: "#fff"   // blanco
        }));

        factory.draw();
    }
    
    onMount(renderScore)
    createEffect(renderScore)

    return <div id="vexflow-container" ref={container} />
}
