import React, { Component, PropTypes } from 'react';
import { requireNativeComponent, processColor } from 'react-native';

export class HexagonView extends Component {
    static propTypes = {
        borderWidth: PropTypes.number,
        borderColor: PropTypes.string,
        background_Color: PropTypes.string,
        size: PropTypes.number.isRequired,
        isHorizontal: PropTypes.bool,
    };

    static defaultProps = {
    isHorizontal: false,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'white',
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            children,
            borderColor,
            borderWidth,
            background_Color,
            isHorizontal,
            size,
        } = this.props;

        return (
            <NativeRNShapeView
                borderColor={processColor(borderColor).toString()}
                borderWidth={borderWidth}
                background_Color={processColor(background_Color).toString()}
                isHorizontal={isHorizontal}
                size={size}
            >
                    {children}
            </NativeRNShapeView>
            );
        }
}

const NativeRNShapeView = requireNativeComponent('RNShapeView', HexagonView);
