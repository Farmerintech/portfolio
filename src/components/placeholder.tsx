import { Badge } from "./ui/badge";
import { cn, isPlaceholder } from "@/lib/utils";

/**
 * Placeholder markers.
 *
 * src/lib/data.ts still contains real "[TODO: ...]" strings for details only
 * the site owner can fill in. These helpers keep that visible on the rendered
 * page — styled as an amber tint plus a small chip rather than the previous
 * amber italics — so unfinished copy can never ship unnoticed.
 */

export function TodoBadge({ className }: { className?: string }) {
  return (
    <Badge variant="todo" className={cn("ml-1.5 align-middle", className)}>
      TODO
    </Badge>
  );
}

/**
 * Renders `text` as a paragraph, flagging it automatically when it still holds
 * a placeholder marker. Falls back to plain text so call sites stay simple.
 */
export function SmartText({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  if (!isPlaceholder(text)) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="italic text-amber-700 dark:text-amber-300/90">
        {text}
      </span>
      <TodoBadge />
    </Tag>
  );
}
