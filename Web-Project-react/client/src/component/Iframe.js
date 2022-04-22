import Frame, { FrameContextConsumer } from 'react-frame-component';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const styles = {
    position : 'fixed',
    right : '30px',
    bottom : '30px',
    width : '350px',
    height : '650px',
    borderRadius : '5%',
    border : '0',
    backgroundColor : '#fff',
    zIndex : '10000',
    boxShadow : '0 1rem 3rem rgba(0, 0, 0, 0.175)' 
}

function Iframe({children, isClicked}) {
    const initial = `<!DOCTYPE html>
        <html><head><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body><div id="multiWindow" name="multiWindow">
             <div id="container" name="container"></div>
        </div></body></html>`

    return  <Frame
                initialContent={initial}
                mountTarget='#container'
                style={ isClicked ? {
                        display : 'block',
                        ...styles
                    } : {
                        display : 'none',
                        ...styles
                    }}
            >
                <FrameContextConsumer>
                    {({ document }) => {
                        const cache = createCache({
                            key: 'head',
                            container: document.head,
                        });

                        return (
                        <CacheProvider value={cache}>
                        {children}
                        </CacheProvider>
                        );
                    }}
                </FrameContextConsumer>
            </Frame>
}

export default Iframe;