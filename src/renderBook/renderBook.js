import React, {useState, useRef} from 'react';
import HTMLFlipBook from "react-pageflip";
import styled from 'styled-components';

const Page = styled.div`
    background: #ffebbd;
    padding: 20px 50px;
    :nth-child(2n){
        background: #e0cfa6;
    }
`
const Title = styled.div`
    font-weight: 900;
    text-align: center;
    margin: 20px 0;
`;

const Img = styled.div`
    text-align: center;
    margin: 20px 0;
`
const BookBody = styled.div`
    ::selection{
        color: #fcf94f;
    }
`

const Btnn = styled.button`
    position: fixed;
    top: 50%;
    left: 0;
`


const RenderBook = ({text}) => {

    const [numPage, setNumPage] = useState(0);
    const flipBook = useRef(null);

    if (!text) return null;

    const width = parseInt(window.getComputedStyle(document.body).width);


    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "application/xml");

    const img = doc.getElementsByTagName('binary')[0].innerHTML;
    const annotation = doc.querySelector('annotation').innerHTML;

    const book = [
        <Img key={0} className="demoPage"><img src={"data:image/png;base64," + img}/></Img>, 
        <div key={1} className="demoPage" dangerouslySetInnerHTML={{ __html: annotation }}></div>,
    ];
    
    const boody = doc.querySelectorAll('section');
    boody.forEach((item, i)  => {
            book.push(<Title key={100 + i} dangerouslySetInnerHTML={{ __html: item.firstChild.innerHTML}}></Title>, <Page key={i + 2} className="demoPage" dangerouslySetInnerHTML={{ __html: item.innerHTML}}></Page>);
    });

    const selectText = () => {
        if (window.getSelection()) {
            if (window.getSelection().toString().length == 0){
                return
            }
            console.log(window.getSelection().toString())
            return
        }
    }

    // const countPage = (e) => {
    //     setNumPage(e.data);
        
    // }

    // const onFlipNext = () => {
    //     flipBook.current.getPageFlip().flipNext();
    // }
    // const onFlipPrev = () => {
    //     flipBook.current.getPageFlip().flipPrev();
    // }

    return (
        <>
            {/* <HTMLFlipBook 
                width={width} 
                height={500}
                showCover={true} 
                className='all'
                maxShadowOpacity={0.2}
                onFlip={countPage}
                ref={flipBook}
                flippingTime={500}
            >
                {book}
            </HTMLFlipBook> */}
                <Btnn onClick={selectText}>Запомнить</Btnn>
                <BookBody>
                    {book}
                </BookBody>
            
            {/* <button onClick={onFlipPrev}>Prev</button>
            <button onClick={onFlipNext}>Next</button> */}
        </>
    );
}

export default RenderBook;