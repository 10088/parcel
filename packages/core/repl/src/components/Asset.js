// eslint-disable-next-line no-unused-vars
import {h} from 'preact';
// eslint-disable-next-line no-unused-vars
import Editor from './Editor';

const Asset = props => {
  const {
    name,
    content,
    isEntry,
    editable,
    onChangeName,
    onChangeContent,
    onChangeEntry,
    onClickRemove,
    additionalHeader
  } = props;

  if (editable) {
    return (
      <div class="file">
        <div class="header">
          <input
            type="text"
            class="filename"
            spellcheck="false"
            onChange={e => onChangeName(e.target.value)}
            value={name}
            aria-label="Asset filename"
          />
          {additionalHeader}
          <input
            type="checkbox"
            class="setEntry"
            title="Entrypoint"
            checked={isEntry}
            onChange={e => onChangeEntry(e.target.checked)}
          />
          <button class="remove" onClick={() => onClickRemove(name)}>
            -
          </button>
        </div>
        <div class="source">
          <Editor
            filename={name}
            content={content}
            onChange={onChangeContent}
            editable
          />
        </div>
      </div>
    );
  } else {
    return (
      <div class="file">
        <div class="header">
          <input type="text" class="filename" readonly value={name} />
          {additionalHeader}
        </div>
        <div class="source">
          <Editor filename={name} content={content} />
        </div>
      </div>
    );
  }
};

export default Asset;
