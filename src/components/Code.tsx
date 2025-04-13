import { createRef, type ComponentChildren } from "preact";
import { signal, computed } from "@preact/signals";

const Code = ({ children, ...props }: { children: ComponentChildren }) => {
  const snippetRef = createRef<HTMLPreElement>();
  const timeoutRef = createRef<ReturnType<typeof setTimeout>>();
  const hasBeenCopiedRecently = signal(false);

  const buttonText = computed(() => {
    return hasBeenCopiedRecently.value ? "Copied!" : "Copy";
  });

  const copyToClipboard = async () => {
    let snippet = snippetRef.current;
    let snippetText = snippet?.innerText ?? "";
    await navigator.clipboard.writeText(snippetText);

    hasBeenCopiedRecently.value = true;

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      hasBeenCopiedRecently.value = false;
    }, 1000);
  };

  return (
    <div className="group relative -mx-2 md:mx-[inherit] [&_code]:max-w-full [&_pre]:px-8 md:[&_pre]:px-6">
      {/* prettier-ignore */}
      <pre {...props} ref={snippetRef}>{children}</pre>
      <button
        className="absolute top-1 right-1 rounded border border-neutral-200 px-2 text-sm opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => {
          if (timeoutRef.current) {
            return false;
          } else {
            copyToClipboard();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Code;
