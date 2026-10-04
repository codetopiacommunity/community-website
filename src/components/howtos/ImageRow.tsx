import type { ReactNode } from "react";

/**
 * Lays out the images inside it side by side, e.g. two phone screenshots.
 * In a guide:
 *
 *   <ImageRow>
 *   ![Channel list on a phone](...)
 *   ![An open channel on a phone](...)
 *   </ImageRow>
 *
 * Markdown wraps the images in a paragraph; `display: contents` on it lets
 * the images themselves become the row's items. They share the width
 * equally and wrap onto a new line when the screen is too narrow.
 */
export function ImageRow({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 flex flex-wrap items-start justify-center gap-4 [&>p]:contents [&_img]:my-0 [&_img]:mx-0 [&_img]:h-auto [&_img]:min-w-[8rem] [&_img]:flex-1 [&_img]:basis-0 [&_img]:object-contain">
      {children}
    </div>
  );
}
