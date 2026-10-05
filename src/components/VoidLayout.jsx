/*
  The ORYZO void-mode layout: three columns of text / object / text sharing
  one grid, with an 18px gutter between them.

  Columns are named rather than positional so callers cannot accidentally
  produce a layout that is not three columns. Placement is handled in CSS
  with explicit grid-column rules, which keeps the reading order on narrow
  screens equal to the DOM order (lead, object, support) while the desktop
  arrangement can be mirrored via `reverse`.

  There are no containers around the columns — no cards, no borders, no
  rounded surfaces. The columns are unified by the grid, not by chrome.
*/
export default function VoidLayout({
  lead,
  object,
  support,
  reverse = false,
  className = '',
}) {
  const classes = ['void', reverse ? 'void--reverse' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className="void__col void__col--lead">{lead}</div>
      <div className="void__col void__col--object">{object}</div>
      <div className="void__col void__col--support">{support}</div>
    </div>
  )
}