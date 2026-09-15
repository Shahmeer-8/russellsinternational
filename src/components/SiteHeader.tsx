import AnnouncementTicker from "@/components/AnnouncementTicker";
import Navbar from "@/components/Navbar";

/**
 * Everything pinned to the top of the window: the announcement strip, then the
 * navigation under it.
 *
 * One fixed element rather than two, so the two can never drift apart or overlap
 * each other. Pages clear it with the `pt-header` utility, which is tied to the
 * same height this is laid out to — see `--header-height` in index.css.
 */
const SiteHeader = () => (
  <header className="fixed inset-x-0 top-0 z-50">
    <AnnouncementTicker />
    <Navbar />
  </header>
);

export default SiteHeader;
