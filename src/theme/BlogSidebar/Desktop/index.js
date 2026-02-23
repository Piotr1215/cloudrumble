import React, {useState} from 'react';
import DesktopSidebar from '@theme-original/BlogSidebar/Desktop';

export default function DesktopSidebarWrapper(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{position: 'relative'}}>
      <button
        className="netrw-toggle"
        onClick={() => {
          setCollapsed(!collapsed);
          document.documentElement.classList.toggle('netrw-collapsed');
        }}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? '\u00BB' : '\u00AB'}
      </button>
      {!collapsed && <DesktopSidebar {...props} />}
    </div>
  );
}
