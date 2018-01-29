package com.pets.NativeUI;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.image.ReactImageView;

/**
 * Created by xiaozhen on 2018/1/25.
 */

public class VideoRecordButton extends SimpleViewManager<ComposeRecordBtn> {

    @Override
    public String getName() {
        return "VideoRecordButton";
    }

    @Override
    protected ComposeRecordBtn createViewInstance(ThemedReactContext reactContext) {
        return null;
    }
}
