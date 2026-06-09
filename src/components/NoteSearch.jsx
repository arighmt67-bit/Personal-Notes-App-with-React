import React from 'react';

function NoteSearch({ keyword, onSearch }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        className="note-search__input"
        type="text"
        placeholder="Cari berdasarkan judul atau isi ..."
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;
