package com.reactlibrary;

import android.support.annotation.IntegerRes;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class RNHexagonViewModule extends ViewGroupManager<RNShapeView> {

    private ReactContext reactContext;

    public RNHexagonViewModule(ReactContext context) {
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "RNHexagonView";
    }

    @Override
    protected RNShapeView createViewInstance(ThemedReactContext reactContext) {
        return new RNShapeView(reactContext);
    }

    @ReactProp(name="strokeWidth", defaultInt = 0)
    public void setStrokeWidth(RNShapeView view, @Nullable Integer strokeWidth) {
        view.setStrokeWidth(strokeWidth);
    }

    @ReactProp(name="strokeColor")
    public void setStrokeColor(RNShapeView view, @Nullable Integer strokeColor) {
        view.setStrokeColor(strokeColor);
    }

}