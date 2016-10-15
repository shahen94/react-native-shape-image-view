import React, { Component, PropTypes } from 'react';
import { View, requireNativeComponent } from 'react-native';

export class HexagonView extends Component {
    static propTypes = {
        ...View.propTypes
    }

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { children, ...props } = this.props;

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
