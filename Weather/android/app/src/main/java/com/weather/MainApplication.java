package com.weather;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.reactnativenavigation.bridge.NavigationReactPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication{
  public boolean isDebug() {
       return BuildConfig.DEBUG;
   }
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
         new MainReactPackage(),
            new ImagePickerPackage(),
           new NavigationReactPackage(),
           new PhotoViewPackage(),
           new LinearGradientPackage(),
           new VectorIconsPackage(),
          new RNGeocoderPackage()
     );
   }

   public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
      return "index";
    }
  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  //   @Override
  //   public boolean getUseDeveloperSupport() {
  //     return BuildConfig.DEBUG;
  //   }
  //
  //   @Override
  //   protected List<ReactPackage> getPackages() {
  //     return Arrays.<ReactPackage>asList(
  //         new MainReactPackage(),
  //           new NavigationReactPackage(),
  //           new PhotoViewPackage(),
  //           new LinearGradientPackage(),
  //           new VectorIconsPackage(),
  //          new RNGeocoderPackage()
  //     );
  //   }
  //
  //   @Override
  //   protected String getJSMainModuleName() {
  //     return "index";
  //   }
  //     public List<ReactPackage> createAdditionalReactPackages() {
  //         return getPackages();
  //     }
  //
  //      public boolean isDebug() {
  //          // Make sure you are using BuildConfig from your own application
  //          return BuildConfig.DEBUG;
  //      }
  // };
  //
  // @Override
  // public ReactNativeHost getReactNativeHost() {
  //   return mReactNativeHost;
  // }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }


}
