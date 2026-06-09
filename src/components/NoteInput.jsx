import React from 'react';

const TITLE_MAX_LENGTH = 50;
const BODY_MIN_LENGTH = 10;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      bodyError: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const value = event.target.value;
    if (value.length <= TITLE_MAX_LENGTH) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    const value = event.target.value;
    this.setState({
      body: value,
      bodyError:
        value.length > 0 && value.length < BODY_MIN_LENGTH
          ? 'Isi catatan minimal harus 10 karakter'
          : '',
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const { title, body } = this.state;

    if (body.length < BODY_MIN_LENGTH) {
      this.setState({ bodyError: 'Isi catatan minimal harus 10 karakter' });
      return;
    }

    this.props.addNote({ title, body });
    this.setState({ title: '', body: '', bodyError: '' });
  }

  render() {
    const { title, body, bodyError } = this.state;
    const remainingChars = TITLE_MAX_LENGTH - title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {bodyError && (
          <p className="note-input__feedback--error">{bodyError}</p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          <p
            className={`note-input__title__char-limit${remainingChars < 10 ? ' note-input__title__char-limit--warning' : ''}`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
