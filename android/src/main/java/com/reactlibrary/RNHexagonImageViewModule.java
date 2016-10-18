
package com.reactlibrary;

import android.graphics.Color;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.github.siyamed.shapeimageview.HexagonImageView;

public class RNHexagonImageViewModule extends SimpleViewManager<HexagonImageView> {

  private ReactContext reactContext;
  private final String LOG_KEY = "HEXAGON_IMAGE_VIEW";

  public RNHexagonImageViewModule(ReactContext context) {
    this.reactContext = context;
  }

  @Override
  public String getName() {
    return "RNHexagonImageView";
  }

  @Override
  protected HexagonImageView createViewInstance(ThemedReactContext reactContext) {
    return new HexagonImageView(reactContext);
  }

  @ReactProp(name="src")
  public void setSource(final HexagonImageView view, final String src) {
//    Log.d(LOG_KEY, src);
    new DownloadImageTask(view, reactContext).execute(src);
  }

  private int getColorFromString(String color) {
    if (color == null) {
      return Color.TRANSPARENT;
    }
    if (color.startsWith("rgb")) {
      String[] colors = color.substring(4, color.length() - 1).split(",");
      String hex = String.format("#%02x%02x%02x",
              Integer.valueOf(colors[0].trim()),
              Integer.valueOf(colors[1].trim()),
              Integer.valueOf(colors[2].trim())
      );
      return Color.parseColor(hex);
    }


    return Color.parseColor(color);
  }

  @ReactProp(name="backgroundColor")
  public void setBackgroundColor(HexagonImageView view, @Nullable String color) {
    view.setBackgroundColor(getColorFromString(color));
  }

  @ReactProp(name="borderWidth", defaultInt = 0)
  public void setBorderWidth(HexagonImageView view, int width) {
    view.setBorderWidth(width);
  }

  @ReactProp(name="borderColor")
  public void setBorderColor(HexagonImageView view, @Nullable String color) {
    view.setBorderColor(getColorFromString(color));
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
