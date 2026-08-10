// Mapowanie pola `background` sekcji na klasy tła.
// Alternacja teł między sekcjami to hard rule — panel edycji / agent
// ustawia background w danych strony, nie w komponentach.

const bgClassMap: Record<string, string> = {
  bg: "",
  subtle: "bg-[var(--color-bg-subtle)]",
  elevated: "bg-[var(--color-bg-elevated)]",
};

export function sectionBg(background?: "bg" | "subtle" | "elevated"): string {
  return background ? bgClassMap[background] : "";
}
