import { onMount } from "solid-js";
import VexFlow from "vexflow";

export function Score() {
    let container!: HTMLDivElement 
    
    onMount(() => {
        const factory = new VexFlow.Factory({
          renderer: { elementId: container.id, width: 500, height: 200 },
        });
        
        const score = factory.EasyScore();
        const system = factory.System();

        system
            .addStave({
                voices: [
                    score.voice(score.notes('C#5/q, B4, A4, G#4', { stem: 'up' })),
                    score.voice(score.notes('C#4/h, C#4', { stem: 'down' })),
                ],
            })
            .addClef('treble')
            .addTimeSignature('4/4')
        
        factory.draw();
    })

    return <div id="vexflow-container" ref={container} />
}
