import "./Layout.css";

export default function TopNav() {
  return (
    <header className="topnav">
      {/* Center search bar */}
      <div className="topnav__search">
        <div className="searchbox">
          <span className="searchbox__icon" aria-hidden>🔍</span>
          <input type="text" placeholder="Search or type" />
        </div>
      </div>

      {/* Right icons */}
      <div className="topnav__actions">
        <button className="icon-btn" aria-label="Messages">
          💬 
        </button>
        <button className="icon-btn" aria-label="Notifications">
          🔔
        </button>
      </div>
    </header>
  );
}
