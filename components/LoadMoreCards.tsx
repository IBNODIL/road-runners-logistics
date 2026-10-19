"use client";
import { useState } from "react";
import { CardGrid } from "./ui";
import Button from "./Button";

type Item = { slug?: string; t: string; d?: string; img?: string };

/** Card grid that shows the first few items and reveals the rest on "Load More". */
export default function LoadMoreCards({ items, initial, cols, hrefPrefix, tall }: { items: Item[]; initial: number; cols: 2 | 3; hrefPrefix: string; tall?: boolean }) {
  const [shown, setShown] = useState(initial);
  return (
    <div>
      <CardGrid cols={cols} hrefPrefix={hrefPrefix} tall={tall} items={items.slice(0, shown)} />
      {shown < items.length && (
        <div className="mt-12 flex justify-center">
          <Button variant="dark" onClick={() => setShown(items.length)}>Load More</Button>
        </div>
      )}
    </div>
  );
}
