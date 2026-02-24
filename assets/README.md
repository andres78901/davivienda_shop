# Assets – DaviviendaShop

## Icono de la app que sigue al tema

La app usa **react-native-change-icon** para que el icono del launcher (pantalla de inicio) cambie según el tema elegido en Menú → Tema.

- **`icon.png`**: icono por defecto (carrito sobre fondo verde #027333). Se usa como icono principal.
- **Lógica**: al cambiar el tema se llama a `setAppIconForTheme(themeId)` (desde `AppIconThemeSync`). Los nombres de iconos alternativos son: `Default`, `Palette1`, `Palette2`, … `Palette10`.

### Cómo activar el cambio de icono en el launcher

Hay que configurar **iconos alternativos** en Android e iOS (uno por tema). Sin esto, el icono no cambiará en el launcher pero la app seguirá funcionando.

1. **Generar 10 iconos** (mismo diseño, distinto color de fondo según cada tema):
   - Por defecto: #027333  
   - Paleta 1–10: usar el `primary` de cada tema en `src/theme/colors.ts`.
   - Subir cada imagen (1024×1024) a [appicon.co](https://appicon.co) y descargar el .zip (iPhone + Android).

2. **Android**  
   - Renombrar cada set a `ic_launcher_Palette1.png`, `ic_launcher_Palette2.png`, etc. (y `ic_launcher` para Default), dentro de las carpetas `mipmap-*`.  
   - En `AndroidManifest.xml`: quitar el `intent-filter` MAIN/LAUNCHER de `<activity android:name=".MainActivity">`.  
   - Añadir un `<activity-alias>` por icono (ver [react-native-change-icon](https://github.com/skb1129/react-native-change-icon)): por ejemplo `MainActivityDefault` (icono por defecto, `enabled="true"`) y `MainActivityPalette1`, …, `MainActivityPalette10` (`enabled="false"`). Cada uno con `android:icon="@mipmap/ic_launcher_..."` y el mismo `intent-filter` MAIN/LAUNCHER.

3. **iOS**  
   - Añadir en `Info.plist` la clave `CFBundleIcons` → `CFBundleAlternateIcons` con una entrada por tema (Default, Palette1, …, Palette10) apuntando a cada `.appiconset` en `Images.xcassets`.  
   - En Xcode, App Icon → “Include all app icon assets”.

Colores del icono por defecto: verde esmeralda (#027333) y blanco para el carrito.
