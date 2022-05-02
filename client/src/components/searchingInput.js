import React from 'react';

const SearchingInput = (props) =>
    <div className={"searchbar"}>
        <input value={props.value} onChange={props.handleChange} className="textbox" maxLength="2048" type="text" autoCapitalize="off" autoComplete="off" autoCorrect="off" spellCheck="false" title="Search" placeholder="Search" />
    </div>
export default SearchingInput;