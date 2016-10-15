package com.reactlibrary;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RNShapeImageViewModule extends ViewGroupManager<RNShapeView> {

    private ReactContext reactContext;

    public RNShapeImageViewModule(ReactContext context) {
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "RNShapeView";
    }

    @Override
    protected RNShapeView createViewInstance(ThemedReactContext reactContext) {
        return new RNShapeView(reactContext);
    }
}