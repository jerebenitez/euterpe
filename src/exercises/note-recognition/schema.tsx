import z from "zod";

export const NoteRecognitionExerciseSchema = z.object({
    // clef: z.enum(["treble", "bass", "both"]),
    // key: z.object({
    //     root: z.string().regex(/^[A-G][#b]?$/),
    //     variant: z.enum(["major", "natural minor", "harmonic minor"])
    // }),
    notesAmount: z.number().min(0).max(15),
    // rangeMin: z.string().regex(/^A#?0|Bb?0|[A-G][#b]?[1-7]|C8$/),
    // rangeMax: z.string().regex(/^A#?0|Bb?0|[A-G][#b]?[1-7]|C8$/),
// }).refine(data => {
//     if (data.rangeMin[1] > data.rangeMax[1]) return false
//     else if (data.rangeMin[1] === data.rangeMax[1] && data.rangeMin[0] >= data.rangeMax[0]) return false

//     return true
// }, {
//     message: "Min. range value can't be higher or equal than max",
//     path: ["rangeMin"],
//     when(payload) { 
//       return NoteRecognitionExerciseSchema 
//         .pick({ rangeMin: true, rangeMax: true }) 
//         .safeParse(payload.value).success; 
//     },
})

export type NoteRecognitionExercise = z.infer<typeof NoteRecognitionExerciseSchema>
