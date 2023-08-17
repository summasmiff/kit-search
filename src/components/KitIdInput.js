import React from 'react';
import { useEffect, useState, useRef } from 'react';
import ajax from '../ajax';
import KitList from './KitList';

const KitIdInput = () => {
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [optionIdx, setOptionIdx] = useState(0)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (input !== '') {
      ajax.get(`/search?kit_id=${input}`).then(({ data }) => {
        setOptions(data);
      })
    }
  }, [input])

  return (
    <div className='search-container'>
      <div className='search-box'>
        <label htmlFor="kit-id">Kit ID: </label>
        <input
          id="kit-id"
          type='text'
          ref={inputRef}
          placeholder="00-000-0000"
          value={input}
          onChange={e => { setInput(e.target.value) }}
        />
        <ul className={options.length === 1 ? "hidden dropdown-menu scrollable" : "dropdown-menu scrollable"}>
          {options.slice(0, 5).map((option, idx) =>
            <li key={idx}>
              <button className={`${idx === optionIdx ? "selected" : ""} pointer-link`} onMouseOver={() => setOptionIdx(idx)} onClick={() => setInput(options[optionIdx].label_id)}>
                {option.label_id}
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className='result-container'>
        <KitList kits={options} />
      </div>
    </div >
  );
}
export default KitIdInput;
