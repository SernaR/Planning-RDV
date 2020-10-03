import React from 'react';

import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles( theme => ({
    cockpit: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
}))

const DateSwitchingHeader = ({date, onPrevious, onNext}) => {
    const classes = useStyles()
    return ( 
        <Grid container item xs={12} className={classes.cockpit}>
            <IconButton 
                aria-label="before"
                onClick={onPrevious}>
                <NavigateBeforeIcon />
            </IconButton>
            <Typography className={classes.title}>{date && date.format('Do MMMM YYYY')}</Typography>
            <IconButton 
                aria-label="after"
                onClick={onNext}>
                <NavigateNextIcon />
            </IconButton> 
        </Grid>
     );
}
 
export default DateSwitchingHeader;