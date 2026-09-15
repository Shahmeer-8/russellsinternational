import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "@/types/api";

/**
 * A header link that opens a submenu.
 *
 * Opens on hover for a mouse and on click or Enter for everything else, because
 * hover alone leaves the menu unreachable by keyboard and unusable on a
 * touchscreen, where the first tap would otherwise just follow the parent link.
 *
 * The parent is a button rather than a link even when it has a URL of its own:
 * a control that both navigates and opens a menu does one of the two by accident.
 * Its destination is repeated as the first entry in the menu instead, so nothing
 * becomes unreachable.
 */
const NavDropdown = ({
  item,
  renderLink,
  isActive,
}: {
  item: NavigationItem;
  renderLink: (child: NavigationItem, mobile?: boolean) => JSX.Element;
  isActive: (url: string) => boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // A menu opened by click stays open until something else is clicked; without
  // this it can only be dismissed by opening another one.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const children = item.children ?? [];
  const anyChildActive = children.some((child) => isActive(child.url));

  return (
    <div
      ref={containerRef}
      /*
       * `flex` matters: as a plain block this wrapper took the inherited 24px
       * line-height and stood 24px tall while every sibling link was 19.5px.
       * The row centres each child on its own height, so the button inside ended
       * up sitting just under a pixel lower than the links beside it — small
       * enough to look like sloppy alignment rather than a bug, which is exactly
       * how it was reported. Sized by the button, it lines up exactly.
       */
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium transition-colors ${
          isActive(item.url) || anyChildActive
            ? "text-accent"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2">
          <div className="min-w-[13rem] rounded-xl border border-border bg-background p-2 shadow-surface-lg">
            {children.map((child) => (
              <div key={child.id} className="rounded-lg px-3 py-2 hover:bg-muted">
                {renderLink(child)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
