import React from 'react';
import NoteItem from './NoteItem';

/**
 * Groups notes by "Month Year" (Indonesian locale).
 * Notes within each group are sorted newest-first by createdAt.
 * Returns array of { groupKey, groupLabel, notes } sorted newest group first.
 */
function groupNotesByMonth(notes) {
  const groups = {};

  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const groupLabel = date.toLocaleDateString('id-ID', {
      month: 'long',
      year: 'numeric',
    });
    // Zero-padded key for reliable lexicographic sort: "2025-05", "2025-04"
    const groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!groups[groupKey]) {
      groups[groupKey] = { groupKey, groupLabel, notes: [] };
    }
    groups[groupKey].notes.push(note);
  });

  return Object.values(groups)
    .sort((a, b) => b.groupKey.localeCompare(a.groupKey))
    .map((group) => ({
      ...group,
      // Sort notes within each group newest-first
      notes: [...group.notes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    }));
}

function NotesList({
  notes,
  onDelete,
  onArchive,
  searchKeyword = '',
  dataTestId = 'notes-list',
  isArchived = false,
}) {
  const hasNotes = Array.isArray(notes) && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <div
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </div>
      </div>
    );
  }

  const groups = groupNotesByMonth(notes);

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {groups.map(({ groupKey, groupLabel, notes: groupNotes }) => (
        <section
          key={groupKey}
          className="notes-group"
          data-testid={`${groupKey}-group`}
        >
          <div className="notes-group__header">
            <h3 className="notes-group__title">{groupLabel}</h3>
            <span
              className="notes-group__count"
              data-testid={`${groupKey}-group-count`}
            >
              {groupNotes.length} catatan
            </span>
          </div>
          <div className="notes-group__list">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
