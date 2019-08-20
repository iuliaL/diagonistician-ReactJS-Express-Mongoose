'use strict';

import classNames from 'classnames';

const submitBtnClasses = (condition) => classNames(
	'button-primary',
	{ disabled: condition }
);

export { submitBtnClasses };