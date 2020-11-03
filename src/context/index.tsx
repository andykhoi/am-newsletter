import React, { FunctionComponent } from 'react';

import { ViewportContextWrapper } from './viewportContext';

export const Store: FunctionComponent = (props) => {
	return (
		<ViewportContextWrapper>
			{ props.children }
		</ViewportContextWrapper>
	)
}