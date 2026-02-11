# Asset Management System

This directory contains the refactored asset management system for WPBones Views. The system separates the responsibility of managing and enqueueing assets (CSS/JS) from the View rendering logic.

## Architecture Overview

The asset management system is built on three main components:

### 1. AssetManager
**Location:** `AssetManager.php`

The `AssetManager` class is responsible for collecting and storing asset information. It acts as a data container and does not interact with WordPress directly.

**Responsibilities:**
- Store collections of scripts and styles
- Store localize script data
- Store inline scripts and styles
- Provide getters for all asset types

**Example:**
```php
$assetManager = new AssetManager();
$assetManager->addScript('my-script', ['jquery'], '1.0.0', true);
$assetManager->addStyle('my-style', [], '1.0.0', 'all');
$assetManager->addLocalizeScript('my-script', 'MyData', ['key' => 'value']);
```

### 2. AssetEnqueuer (Abstract)
**Location:** `AssetEnqueuer.php`

The `AssetEnqueuer` abstract class handles the WordPress enqueueing operations. It takes an `AssetManager` instance and actually registers the assets with WordPress using `wp_enqueue_script()`, `wp_enqueue_style()`, etc.

**Responsibilities:**
- Enqueue scripts and styles using WordPress functions
- Handle localize scripts
- Handle inline scripts and styles
- Define abstract methods for path resolution

**Concrete Implementations:**
- `AdminAssetEnqueuer` - For admin area assets
- `FrontendAssetEnqueuer` - For frontend/theme assets
- `AdminAppsAssetEnqueuer` - For React bundle assets

### 3. Concrete Enqueuers

#### AdminAssetEnqueuer
**Location:** `AdminAssetEnqueuer.php`

Handles assets for the WordPress admin dashboard area.

- Scripts path: `$container->js`
- Styles path: `$container->css`

#### FrontendAssetEnqueuer
**Location:** `FrontendAssetEnqueuer.php`

Handles assets for the public-facing theme/frontend.

- Scripts path: `$container->js`
- Styles path: `$container->css`

#### AdminAppsAssetEnqueuer
**Location:** `AdminAppsAssetEnqueuer.php`

Specialized enqueuer for React applications built with `@wordpress/scripts`.

**Special Features:**
- Automatically loads dependencies from `.asset.php` files
- Sets up WordPress script translations
- Handles module CSS files
- Always loads scripts in footer
- Defaults to `['wp-element']` dependency for React support

## Usage in View Class

The `View` class now uses these asset managers internally:

```php
class View
{
  protected AssetManager $adminAssets;
  protected AssetManager $frontendAssets;
  protected AssetManager $adminAppsAssets;
  
  // ...
}
```

### Adding Admin Assets

```php
$view = $plugin->view('admin.dashboard')
  ->withAdminScript('my-admin-script', ['jquery'], '1.0.0')
  ->withAdminStyle('my-admin-style', [], '1.0.0')
  ->withLocalizeScript('my-admin-script', 'MyData', [
    'ajaxUrl' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('my-nonce')
  ])
  ->withInlineScript('my-admin-script', 'console.log("Ready!");');
```

### Adding Frontend Assets

```php
$view = $plugin->view('public.homepage')
  ->withScript('my-script', ['jquery'], '1.0.0')
  ->withStyle('my-style', [], '1.0.0')
  ->withInlineStyle('my-style', '.custom { color: red; }');
```

### Adding React Bundle Assets

```php
$view = $plugin->view('admin.react-app')
  ->withAdminAppsScript('my-react-app', true, 'MyAppData', [
    'apiUrl' => rest_url('my-plugin/v1'),
    'nonce' => wp_create_nonce('wp_rest')
  ]);
```

This will:
1. Load the script from `/public/apps/my-react-app.js`
2. Read dependencies from `/public/apps/my-react-app.asset.php`
3. Load the CSS from `/public/apps/my-react-app.css` (if `$module = true`)
4. Localize the script with `MyAppData` object
5. Set up WordPress translations for the script

## Benefits of This Architecture

### 1. Separation of Concerns
- Asset collection is separate from WordPress integration
- View rendering is separate from asset management
- Each class has a single, well-defined responsibility

### 2. Testability
- `AssetManager` can be tested without WordPress
- Enqueuers can be tested with mocked WordPress functions
- Easy to verify asset collection logic

### 3. Extensibility
- Easy to create new enqueuer types
- Simple to add new asset types
- Can override enqueueing behavior in subclasses

### 4. Maintainability
- Clear structure with focused classes
- Reduced code duplication
- Easier to locate and fix bugs

### 5. Backward Compatibility
- All existing View methods continue to work
- Legacy array properties are maintained
- No breaking changes for existing code

## Migration Guide

### For Plugin Developers

**No changes required!** The View class API remains exactly the same. All existing code will continue to work:

```php
// This still works exactly as before
$view = $plugin->view('admin.settings')
  ->withAdminScript('settings-script')
  ->withAdminStyle('settings-style');
```

### For Framework Contributors

If you're extending the asset management system:

#### Creating a Custom Enqueuer

```php
use WPKirk\WPBones\View\Assets\AssetEnqueuer;

class CustomAssetEnqueuer extends AssetEnqueuer
{
  protected function getScriptBasePath(): string
  {
    return $this->container->customScriptsPath;
  }
  
  protected function getStyleBasePath(): string
  {
    return $this->container->customStylesPath;
  }
  
  // Override if you need custom enqueue logic
  protected function enqueueScript(array $script): void
  {
    // Custom logic here
    parent::enqueueScript($script);
  }
}
```

#### Using AssetManager Directly

```php
use WPKirk\WPBones\View\Assets\AssetManager;
use WPKirk\WPBones\View\Assets\AdminAssetEnqueuer;

$assetManager = new AssetManager();
$assetManager->addScript('my-script', ['jquery'], '1.0.0');
$assetManager->addStyle('my-style', [], '1.0.0');

$enqueuer = new AdminAssetEnqueuer($container, $assetManager);
$enqueuer->enqueue(); // Enqueues both scripts and styles
```

## Class Diagram

```
┌─────────────────┐
│  AssetManager   │  (Data Container)
├─────────────────┤
│ - scripts       │
│ - styles        │
│ - localize      │
│ - inline        │
├─────────────────┤
│ + addScript()   │
│ + addStyle()    │
│ + getScripts()  │
│ + getStyles()   │
└─────────────────┘
         ▲
         │ uses
         │
┌────────┴────────────┐
│  AssetEnqueuer      │  (Abstract)
├─────────────────────┤
│ # container         │
│ # assetManager      │
├─────────────────────┤
│ # getScriptPath()*  │
│ # getStylePath()*   │
│ + enqueueScripts()  │
│ + enqueueStyles()   │
└─────────────────────┘
         ▲
         │ extends
    ┌────┴────┬──────────────┐
    │         │              │
┌───┴──────┐ ┌┴──────────┐  ┌┴────────────────┐
│  Admin   │ │ Frontend  │  │  AdminApps      │
│ Enqueuer │ │ Enqueuer  │  │  Enqueuer       │
└──────────┘ └───────────┘  └─────────────────┘
```

## Performance Considerations

### Lazy Loading
Assets are only enqueued when `render()` is called on the View, not when they're added via `with*()` methods.

### Conditional Loading
The system checks for empty collections before attempting to enqueue:
```php
if ($this->adminAssets->hasScripts()) {
  $enqueuer->enqueueScripts();
}
```

### Memory Efficiency
The refactored system uses the same amount of memory as the original implementation while providing better organization.

## Future Enhancements

Potential improvements for future versions:

1. **Asset Dependencies Resolution**
   - Automatic dependency ordering
   - Circular dependency detection

2. **Asset Bundling**
   - Combine multiple assets
   - Minification support

3. **Conditional Loading**
   - Load assets only on specific admin pages
   - User capability checks

4. **Asset Versioning**
   - Automatic cache busting
   - File hash-based versioning

5. **CDN Support**
   - External asset sources
   - Fallback mechanisms

## Troubleshooting

### Assets Not Loading

**Check the asset manager has items:**
```php
if ($this->adminAssets->hasScripts()) {
  error_log('Admin scripts count: ' . count($this->adminAssets->getScripts()));
}
```

**Verify the paths:**
```php
error_log('Script path: ' . $this->container->js);
error_log('Style path: ' . $this->container->css);
```

### React Bundle Issues

**Check .asset.php file exists:**
```php
$assetFile = $this->container->basePath . '/public/apps/my-app.asset.php';
if (!file_exists($assetFile)) {
  error_log('Asset file missing: ' . $assetFile);
}
```

**Verify build output:**
Ensure `@wordpress/scripts` build creates both `.js` and `.asset.php` files in `/public/apps/`.

## API Reference

### AssetManager Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addScript()` | `$name, $deps, $ver, $args` | `self` | Add a script to collection |
| `addStyle()` | `$name, $deps, $ver, $media` | `self` | Add a style to collection |
| `addLocalizeScript()` | `$handle, $name, $data` | `self` | Add script localization |
| `addInlineScript()` | `$name, $data, $position` | `self` | Add inline script |
| `addInlineStyle()` | `$name, $data` | `self` | Add inline style |
| `addAppsScript()` | `$name, $deps, $ver, $args` | `self` | Add React bundle script |
| `addAppsStyle()` | `$name, $deps, $ver` | `self` | Add React bundle style |
| `getScripts()` | - | `array` | Get all scripts |
| `getStyles()` | - | `array` | Get all styles |
| `hasScripts()` | - | `bool` | Check if scripts exist |
| `hasStyles()` | - | `bool` | Check if styles exist |
| `clear()` | - | `self` | Clear all assets |

### AssetEnqueuer Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `enqueueScripts()` | - | `void` | Enqueue all scripts |
| `enqueueStyles()` | - | `void` | Enqueue all styles |
| `enqueue()` | - | `void` | Enqueue scripts and styles |

## License

This asset management system is part of WPBones framework and follows the same license terms.
