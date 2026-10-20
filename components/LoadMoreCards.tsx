"use client";
import { useState } from "react";
import { CardGrid } from "./ui";

type Item = { slug?: string; t: string; d?: string; img?: string; icon?: string };

/** Card grid that shows the first few items and reveals the rest on "Load More". */
export default function LoadMoreCards({ items, initial, cols, hrefPrefix, tall }: { items: Item[]; initial: number; cols: 2 | 3; hrefPrefix: string; tall?: boolean }) {
  const [shown, setShown] = useState(initial);
  return (
    <div>
      <CardGrid cols={cols} hrefPrefix={hrefPrefix} tall={tall} items={items.slice(0, shown)} />
      {shown < items.length && (
        <div className="mt-12 flex justify-center">
          <button onClick={() => setShown(items.length)} className="group label relative pb-1 text-[18px]">
            Load More
            {/* underline slides away to the left on hover and returns from the right */}
            <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(.65,0,.35,1)] group-hover:origin-left group-hover:scale-x-0" />
          </button>
        </div>
      )}
    </div>
  );
}
