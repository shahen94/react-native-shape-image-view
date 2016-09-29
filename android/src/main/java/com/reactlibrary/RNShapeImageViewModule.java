
package com.reactlibrary;

import android.graphics.Color;
import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.github.siyamed.shapeimageview.HexagonImageView;

public class RNShapeImageViewModule extends SimpleViewManager<HexagonImageView> {

  private ReactContext reactContext = null;
  private final String LOG_KEY = "HEXAGON_IMAGE_VIEW";

  @Override
  public String getName() {
    return "RNShapeImageView";
  }

  @Override
  protected HexagonImageView createViewInstance(ThemedReactContext reactContext) {
    this.reactContext = reactContext;
    HexagonImageView imageView = new HexagonImageView(reactContext);
    return imageView;
  }

  @ReactProp(name="src")
  public void setSource(final HexagonImageView view, final String src) {
      Log.d(LOG_KEY, src);
    new DownloadImageTask(view).execute(src);
  }

  @ReactProp(name="backgroundColor")
  public void setBackgroundColor(HexagonImageView view, @Nullable String color) {
    Log.d(LOG_KEY, color);
    if (color == null) {
      view.setBackgroundColor(Color.TRANSPARENT);
      return;
    }
    int parsedColor = Color.parseColor(color);
    view.setBackgroundColor(parsedColor);
  }

  @ReactProp(name="borderWidth")
  public void setBorderWidth(HexagonImageView view, int width) {
    Log.d(LOG_KEY, String.valueOf(width));
    view.setBorderWidth(width);
  }

  @ReactProp(name="borderColor")
  public void setBorderColor(HexagonImageView view, @Nullable String color) {
    Log.d(LOG_KEY, color);
    if (color == null) {
      view.setBorderColor(Color.TRANSPARENT);
      return;
    }
    int parsedColor = Color.parseColor(color);
    view.setBorderColor(parsedColor);
  }

  @Override
  public void setAccessibilityLabel(HexagonImageView view, String accessibilityLabel) {
    super.setAccessibilityLabel(view, accessibilityLabel);
  }

  @Override
  public void setAccessibilityComponentType(HexagonImageView view, String accessibilityComponentType) {
    super.setAccessibilityComponentType(view, accessibilityComponentType);
  }

  @Override
  public void setTestId(HexagonImageView view, String testId) {
    super.setTestId(view, testId);
  }
}