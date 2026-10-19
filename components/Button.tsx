import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "brand" | "dark" | "white";
  size?: "lg" | "md";
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  /** "scale": plain button that only scales on hover (no colour change). */
  hover?: "roll" | "scale";
};

const variants = {
  brand: { cls: "bg-brand text-white", hover: "#ffe067", second: "text-ink" },
  dark: { cls: "bg-ink text-white", hover: "#dd6537", second: "text-white" },
  white: { cls: "bg-white text-ink", hover: "#dd6537", second: "text-white" },
};

/** Button with the original's slide-up dual label + colour-fill hover. */
export default function Button({ href, children, variant = "brand", size = "lg", type = "button", className = "", disabled, onClick, hover = "roll" }: Props) {
  const v = variants[variant];
  const pad = size === "lg" ? "px-[30px] py-[18px]" : "px-5 py-3";
  if (hover === "scale") {
    const c = `inline-flex rounded-lg ${v.cls} ${pad} label cursor-pointer select-none transition-transform duration-300 ease-out hover:scale-[1.06] active:scale-95 ${className}`;
    return href ? <Link href={href} className={c}>{children}</Link> : <button type={type} onClick={onClick} disabled={disabled} className={c}>{children}</button>;
  }
  const cls = `btn ${v.cls} ${pad} label cursor-pointer select-none ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`;
  const style = { ["--hover-bg" as string]: v.hover } as React.CSSProperties;
  const inner = (
    <>
      <span className="btn-label">{children}</span>
      <span className={`btn-label ${v.second}`} aria-hidden>{children}</span>
    </>
  );
  if (href) return <Link href={href} className={cls} style={style}>{inner}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>{inner}</button>;
}
