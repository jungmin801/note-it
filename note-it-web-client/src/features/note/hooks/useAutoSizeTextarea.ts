export function useAutosizeTextarea(textareaRef: React.RefObject<HTMLTextAreaElement | null>) {
  return (next?: string) => {
    const el = textareaRef.current;
    if (!el) return 0;
    el.style.height = '0px';
    if (typeof next === 'string') el.value = next;
    const h = el.scrollHeight;
    el.style.height = `${h}px`;
    return h;
  };
}
