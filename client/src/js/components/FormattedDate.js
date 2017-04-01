import React from 'react'
import moment from 'moment'

function FormattedDate(props) {
	const format = "MMMM Do YYYY, h:mm A"; // March 30th 2017, 11:24:57 AM
	const formatted = moment(props.date).format(format);
	return(<span> {formatted} </span>)
}
export default FormattedDate;