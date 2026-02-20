#import "RCTToastModule.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>

@implementation RCTToastModule

RCT_EXPORT_MODULE(ToastModule);

RCT_EXPORT_METHOD(show:(NSString *)message)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil
                                                                   message:message
                                                            preferredStyle:UIAlertControllerStyleAlert];
    [[self topViewController] presentViewController:alert animated:YES completion:nil];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
      [alert dismissViewControllerAnimated:YES completion:nil];
    });
  });
}

- (UIViewController *)topViewController
{
  UIWindow *window = nil;
  if (@available(iOS 13.0, *)) {
    for (UIWindowScene *scene in [UIApplication sharedApplication].connectedScenes) {
      if (scene.activationState == UISceneActivationStateForegroundActive) {
        for (UIWindow *w in scene.windows) {
          if (w.isKeyWindow) {
            window = w;
            break;
          }
        }
        if (window) break;
      }
    }
  }
  if (!window) {
    window = [UIApplication sharedApplication].keyWindow;
  }
  if (!window) {
    window = [UIApplication sharedApplication].windows.firstObject;
  }
  UIViewController *root = window.rootViewController;
  while (root.presentedViewController) {
    root = root.presentedViewController;
  }
  return root;
}

@end
