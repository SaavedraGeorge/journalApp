import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {
    const dateNote = moment(date);
    const dispatch = useDispatch();

    const handleActiveClick = () => {
        dispatch(
            activeNote( id, {
                date, title, body, url
            })
        );
    }

    return (
        <div 
            className="journal__entry pointer"
            onClick={handleActiveClick}
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }
            <div className="journal_entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>

            </div>
            <div className="journal__entry-date-box">
                <span>{ dateNote.format('dddd')} </span>
                <h4>{dateNote.format('DD')}</h4>
            </div>
        </div>
    );
};
