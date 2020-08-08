import React from 'react';
import PageWrap from '../components/ui/PageWrap';
import { Container } from '@material-ui/core';

const Homepage = (props) => {
    return <PageWrap
    //loading={loading}
    title="Homepage"
    //message={message.current}
    //open={toast}
    /*onClose={() => {
        message.current = ''
        setToast(false)}}*/
    >  
        <Container fixed>
            <p>hello</p>
        </Container> 
    </PageWrap> 
}
 
export default Homepage;