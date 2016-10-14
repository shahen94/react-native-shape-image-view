import React, { Component, PropTypes } from 'react';
import { requireNativeComponent } from 'react-native';

export class HexagonView extends Component {
    static propTypes = {
        setDefaultSize: PropTypes.bool,
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children } = this.props;

        return (
            <NativeRNShapeView
                {...props}
            >
                {children}
            </NativeRNShapeView>
        );
    }
}

const NativeRNShapeView = requireNativeComponent('RNShapeView', HexagonView);
