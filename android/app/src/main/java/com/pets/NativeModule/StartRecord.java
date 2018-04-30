package com.pets.NativeModule;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
            //TO DO
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

