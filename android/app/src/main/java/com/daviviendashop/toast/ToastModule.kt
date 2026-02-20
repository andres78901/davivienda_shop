package com.daviviendashop.toast

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Módulo nativo que expone un método show(message: string).
 * En Android muestra un Toast con el mensaje.
 */
class ToastModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "ToastModule"

  @ReactMethod
  fun show(message: String) {
    val context = reactApplicationContext
    android.os.Handler(context.mainLooper).post {
      Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
  }
}
