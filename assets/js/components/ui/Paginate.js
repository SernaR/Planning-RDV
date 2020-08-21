import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles(() => ({
    root: {
        display:'flex',
        justifyContent: 'flex-end'
    },
    count: {
        fontSize : '16px',
        color: '#000!important'
    }
}))


const Paginate = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
    const classes = useStyles();
    const pagesCount = Math.ceil(length / itemsPerPage);

    const start = currentPage * itemsPerPage - itemsPerPage + 1
    const end = currentPage === pagesCount ? length : start + itemsPerPage - 1

    return ( 
        <div className={classes.root}>
            <IconButton disabled className={classes.count}> {start}-{end} sur {length}</IconButton>
            <IconButton 
                aria-label="before"
                disabled={ currentPage === 1 }
                onClick={() => onPageChanged(currentPage - 1)}>
                <NavigateBeforeIcon />
            </IconButton>
            <IconButton 
                aria-label="after"
                disabled={ currentPage === pagesCount }
                onClick={() => onPageChanged(currentPage + 1)}>
                <NavigateNextIcon />
            </IconButton>
        </div>  
    );
}

Paginate.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

 
export default Paginate;