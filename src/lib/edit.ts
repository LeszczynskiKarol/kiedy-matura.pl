// Adresowalność treści dla panelu edycji (saas/edit-architecture.md).
// W buildach preview (PUBLIC_EDIT_PREVIEW=1) komponenty emitują data-edit
// mapujące węzeł DOM na ścieżkę w danych, np.
//   data-edit="pages/index#sections.0.title"
// Overlay edytora czyta te atrybuty i pozwala edytować in-place.
// W buildach produkcyjnych atrybuty NIE są emitowane (zero narzutu).

export const EDIT_PREVIEW = import.meta.env.PUBLIC_EDIT_PREVIEW === "1";

export function editAttrs(path: string): Record<string, string> {
  return EDIT_PREVIEW ? { "data-edit": path } : {};
}
