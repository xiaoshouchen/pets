package com.pets.NativeModule;
import android.app.Activity;
import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.pets.videorecord.TCVideoRecordActivity;

/**
 * Created by xiaoz on 2018/3/2.
 */

public class StartRecord extends ReactContextBaseJavaModule {

    public StartRecord(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "StartRecord";
    }

    @ReactMethod
    public void start() {
        try {
            Activity activity = getCurrentActivity();
            if (null != activity) {
                Intent intent = new Intent(activity, TCVideoRecordActivity.class);
                activity.startActivity(intent);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

