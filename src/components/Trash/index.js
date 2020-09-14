import React from 'react';
import './style.css';

const Trash = () => {
  const storageKey = 'salesforce_plugin_to_familysearch';

  return (
    <div>
      <button
        type="button"
        className="header-trash"
        aria-label="Clean"
        onClick={() => localStorage.setItem(storageKey, [])}
      />
    </div>
  );
};

export default Trash;
