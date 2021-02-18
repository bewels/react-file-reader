import React, {useState} from 'react';

import HTMLFlipBook from "react-pageflip";

import RenderBook from '../renderBook/renderBook';

import styled from 'styled-components';
const RendBook = styled.div`
  padding: 0 150px;
  background: #ffe3a1;
  text-align: justify;

`


function OpenBook (){
    const [textBook, setText] = useState(null);

    const handleFiles = e => {
        let file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
             setText(reader.result);
        }
        reader.readAsText(file);
        
    }
    
     return(
        <RendBook>
            <input type="file" onChange={handleFiles}/>
            <RenderBook text={textBook} />
        </RendBook>
      );
  }




export default OpenBook;
