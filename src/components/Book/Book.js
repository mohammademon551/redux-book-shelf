import React, { useEffect, useState } from "react";
import {
  HiPlusCircle,
  HiMinusCircle,
  HiCheckCircle
} from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { addToReadingList, removeFromReadingList, AddToFinishList } from "../../redux/actions/bookActions";
import styles from './book.module.css'
const SingleBook = (props) => {
  const { id, title, author, coverImageUrl, synopsis } = props.book;
  const [isadded, setAdded] = useState(false)
  const dispatch = useDispatch()

  const alreadyAdded = useSelector((state) => {
    const totalBook =   state.books.readingList;
    const isAlreadyAdded = totalBook.find(book => book.id === id);
    return isAlreadyAdded;
  })

  useEffect(() => {
    if (alreadyAdded) {
      setAdded(true)
    }
  }, [id, alreadyAdded])

  const location = useLocation().pathname;


  return (
    <div className='card d-flex mb-3 p-3'
      style={{ position: 'relative' }}
    >
      <div className='row'>
        <div className='col-md-3'>
          <img className="img-fluid" src={coverImageUrl} alt='' />
        </div>
        <div className='col-md-9'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <h6>{author}</h6>
            <p className='card-text'>{synopsis.slice(0, 500)} ...</p>
          </div>
        </div>
      </div>
      <div className={styles.control_icons} >
        {
          isadded === true || location === '/reading' ?
            <HiMinusCircle
              onClick={() => { dispatch(removeFromReadingList(props.book)); setAdded(false) }}
              title="Remove from list" className={styles.minus_icon} /> : ''
        }
        {
          isadded === false && location !== '/reading' && location !== '/finish' &&
          <HiPlusCircle
            onClick={() => { dispatch(addToReadingList(props.book)); setAdded(true) }}
            title="Add to Reading" className={styles.plus_icon} />
        }
        {
          location === '/reading' &&
          <HiCheckCircle
            onClick={() => dispatch(AddToFinishList(props.book))}
            title="Mark as Finish" className={styles.check_icon} />
        }
      </div>
    </div>
  );
};

export default SingleBook;