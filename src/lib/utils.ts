export function getNoteName(noteNumber: number): string {
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(noteNumber / 12) - 1
    const note = names[noteNumber % 12]

    return `${note}/${octave}`
}
