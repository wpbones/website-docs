# Asset Management Examples

This document provides practical examples of using the WPBones asset management system.

## Table of Contents

- [Basic Examples](#basic-examples)
- [Admin Area Examples](#admin-area-examples)
- [Frontend Examples](#frontend-examples)
- [React Bundle Examples](#react-bundle-examples)
- [Advanced Examples](#advanced-examples)
- [Real-World Scenarios](#real-world-scenarios)

## Basic Examples

### Simple Admin Page with Script and Style

```php
use WPKirk\Http\Controllers\Controller;

class DashboardController extends Controller
{
  public function index()
  {
    return $this->plugin
      ->view('admin.dashboard')
      ->withAdminScript('dashboard-script')
      ->withAdminStyle('dashboard-style')
      ->with('title', 'My Dashboard');
  }
}
```

This will load:
- `/public/js/dashboard-script.js`
- `/public/css/dashboard-style.css`

### Adding Script Dependencies

```php
return $this->plugin
  ->view('admin.settings')
  ->withAdminScript('settings-script', ['jquery', 'jquery-ui-core'], '1.0.0')
  ->withAdminStyle('settings-style', [], '1.0.0');
```

## Admin Area Examples

### Admin Page with Localized Data

```php
class SettingsController extends Controller
{
  public function index()
  {
    $settings = [
      'ajaxUrl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('my-plugin-settings'),
      'options' => get_option('my_plugin_options', []),
    ];

    return $this->plugin
      ->view('admin.settings')
      ->withAdminScript('settings-script', ['jquery'], '1.0.0')
      ->withLocalizeScript('settings-script', 'MyPluginSettings', $settings)
      ->withAdminStyle('settings-style');
  }
}
```

JavaScript access:
```javascript
console.log(MyPluginSettings.ajaxUrl);
console.log(MyPluginSettings.nonce);
console.log(MyPluginSettings.options);
```

### Admin Page with Inline Script

```php
return $this->plugin
  ->view('admin.dashboard')
  ->withAdminScript('dashboard-script', ['jquery'], '1.0.0')
  ->withInlineScript('dashboard-script', '
    jQuery(document).ready(function($) {
      console.log("Dashboard ready!");
      $("#my-button").on("click", function() {
        alert("Button clicked!");
      });
    });
  ', 'after');
```

### Admin Page with Inline Style

```php
return $this->plugin
  ->view('admin.dashboard')
  ->withAdminStyle('dashboard-style')
  ->withInlineStyle('dashboard-style', '
    .my-custom-class {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 5px;
    }
    .my-button {
      background-color: #0073aa;
      color: white;
    }
  ');
```

### Multiple Scripts and Styles

```php
return $this->plugin
  ->view('admin.complex-page')
  ->withAdminScript('vendor-script', [], '1.0.0')
  ->withAdminScript('utils-script', ['vendor-script'], '1.0.0')
  ->withAdminScript('main-script', ['utils-script', 'jquery'], '1.0.0')
  ->withAdminStyle('vendor-style')
  ->withAdminStyle('main-style', ['vendor-style'])
  ->withLocalizeScript('main-script', 'AppData', [
    'apiUrl' => rest_url('my-plugin/v1'),
  ]);
```

## Frontend Examples

### Public Page with Assets

```php
class PublicController extends Controller
{
  public function homePage()
  {
    return $this->plugin
      ->view('public.home')
      ->withScript('public-script', ['jquery'], '1.0.0', true)
      ->withStyle('public-style', [], '1.0.0')
      ->with('posts', get_posts(['numberposts' => 5]));
  }
}
```

### Frontend Widget with Inline Styles

```php
class WidgetController extends Controller
{
  public function render()
  {
    $backgroundColor = get_option('widget_bg_color', '#ffffff');
    $textColor = get_option('widget_text_color', '#000000');

    return $this->plugin
      ->view('widgets.custom-widget')
      ->withStyle('widget-style')
      ->withInlineStyle('widget-style', "
        .my-widget {
          background-color: {$backgroundColor};
          color: {$textColor};
        }
      ");
  }
}
```

### Conditional Frontend Loading

```php
class ShortcodeController extends Controller
{
  public function gallery($atts)
  {
    $view = $this->plugin->view('shortcodes.gallery');

    // Only load lightbox if needed
    if (isset($atts['lightbox']) && $atts['lightbox'] === 'true') {
      $view->withScript('lightbox-script', ['jquery'], '2.11.3')
           ->withStyle('lightbox-style', [], '2.11.3');
    }

    return $view->with('images', $this->getGalleryImages($atts));
  }
}
```

## React Bundle Examples

### Basic React App

```php
class ReactAppController extends Controller
{
  public function index()
  {
    return $this->plugin
      ->view('admin.react-app')
      ->withAdminAppsScript('my-react-app');
  }
}
```

This will:
1. Load `/public/apps/my-react-app.js`
2. Read dependencies from `/public/apps/my-react-app.asset.php`
3. Load `/public/apps/my-react-app.css`
4. Set up WordPress translations

### React App with Data

```php
class ReactDashboardController extends Controller
{
  public function index()
  {
    $dashboardData = [
      'apiUrl' => rest_url('my-plugin/v1'),
      'nonce' => wp_create_nonce('wp_rest'),
      'user' => [
        'id' => get_current_user_id(),
        'name' => wp_get_current_user()->display_name,
        'capabilities' => wp_get_current_user()->allcaps,
      ],
      'settings' => get_option('my_plugin_settings', []),
    ];

    return $this->plugin
      ->view('admin.react-dashboard')
      ->withAdminAppsScript('react-dashboard', true, 'DashboardData', $dashboardData);
  }
}
```

JavaScript access:
```javascript
// In your React app
const { apiUrl, nonce, user, settings } = window.DashboardData;
```

### React App without CSS Module

```php
// When your React app has its own CSS handling
return $this->plugin
  ->view('admin.react-app')
  ->withAdminAppsScript('my-react-app', false); // false = no CSS module
```

### Multiple React Components

```php
return $this->plugin
  ->view('admin.complex-dashboard')
  ->withAdminAppsScript('header-component', true, 'HeaderData', ['title' => 'Dashboard'])
  ->withAdminAppsScript('sidebar-component', true, 'SidebarData', ['menu' => $menuItems])
  ->withAdminAppsScript('main-component', true, 'MainData', ['content' => $content]);
```

## Advanced Examples

### Combining Admin and Apps Scripts

```php
return $this->plugin
  ->view('admin.hybrid-page')
  // Traditional jQuery script
  ->withAdminScript('legacy-script', ['jquery'], '1.0.0')
  // React app
  ->withAdminAppsScript('modern-app', true, 'AppData', ['key' => 'value'])
  // Shared styles
  ->withAdminStyle('shared-style');
```

### Dynamic Asset Loading Based on User Role

```php
class DashboardController extends Controller
{
  public function index()
  {
    $view = $this->plugin->view('admin.dashboard');

    // Base assets for all users
    $view->withAdminScript('dashboard-base', ['jquery'], '1.0.0')
         ->withAdminStyle('dashboard-base');

    // Admin-only features
    if (current_user_can('manage_options')) {
      $view->withAdminScript('admin-features', ['dashboard-base'], '1.0.0')
           ->withLocalizeScript('admin-features', 'AdminData', [
             'users' => get_users(),
             'settings' => get_option('advanced_settings'),
           ]);
    }

    // Editor-only features
    if (current_user_can('edit_posts')) {
      $view->withAdminScript('editor-features', ['dashboard-base'], '1.0.0');
    }

    return $view;
  }
}
```

### AJAX Handler with Localized Endpoints

```php
class AjaxController extends Controller
{
  public function form()
  {
    $ajaxActions = [
      'saveSettings' => [
        'action' => 'save_settings',
        'nonce' => wp_create_nonce('save_settings'),
      ],
      'loadData' => [
        'action' => 'load_data',
        'nonce' => wp_create_nonce('load_data'),
      ],
      'deleteItem' => [
        'action' => 'delete_item',
        'nonce' => wp_create_nonce('delete_item'),
      ],
    ];

    return $this->plugin
      ->view('admin.ajax-form')
      ->withAdminScript('ajax-handler', ['jquery'], '1.0.0')
      ->withLocalizeScript('ajax-handler', 'AjaxConfig', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'actions' => $ajaxActions,
      ]);
  }
}
```

JavaScript usage:
```javascript
jQuery.ajax({
  url: AjaxConfig.ajaxUrl,
  type: 'POST',
  data: {
    action: AjaxConfig.actions.saveSettings.action,
    nonce: AjaxConfig.actions.saveSettings.nonce,
    settings: mySettings
  },
  success: function(response) {
    console.log('Saved!', response);
  }
});
```

### Versioned Assets with Cache Busting

```php
class AssetsController extends Controller
{
  private function getAssetVersion($file)
  {
    $path = $this->plugin->basePath . '/public/js/' . $file . '.js';
    return file_exists($path) ? filemtime($path) : '1.0.0';
  }

  public function index()
  {
    return $this->plugin
      ->view('admin.versioned')
      ->withAdminScript('my-script', ['jquery'], $this->getAssetVersion('my-script'))
      ->withAdminStyle('my-style', [], $this->getAssetVersion('my-style'));
  }
}
```

## Real-World Scenarios

### E-Commerce Product Page

```php
class ProductController extends Controller
{
  public function edit($productId)
  {
    $product = $this->getProduct($productId);
    
    $productData = [
      'id' => $product->ID,
      'title' => $product->post_title,
      'price' => get_post_meta($product->ID, '_price', true),
      'stock' => get_post_meta($product->ID, '_stock', true),
      'categories' => wp_get_post_terms($product->ID, 'product_category'),
      'currency' => get_option('currency', 'USD'),
      'restUrl' => rest_url('my-shop/v1/products/' . $productId),
      'nonce' => wp_create_nonce('wp_rest'),
    ];

    return $this->plugin
      ->view('admin.product-edit')
      ->withAdminAppsScript('product-editor', true, 'ProductData', $productData)
      ->withAdminScript('image-uploader', ['jquery', 'media-upload'], '1.0.0')
      ->withAdminStyle('product-editor')
      ->with('product', $product);
  }
}
```

### Analytics Dashboard

```php
class AnalyticsController extends Controller
{
  public function dashboard()
  {
    $analyticsData = [
      'charts' => [
        'visits' => $this->getVisitsData(),
        'sales' => $this->getSalesData(),
        'conversions' => $this->getConversionsData(),
      ],
      'dateRange' => [
        'start' => date('Y-m-d', strtotime('-30 days')),
        'end' => date('Y-m-d'),
      ],
      'currency' => get_option('currency', 'USD'),
      'timezone' => wp_timezone_string(),
    ];

    return $this->plugin
      ->view('admin.analytics')
      ->withAdminAppsScript('analytics-dashboard', true, 'AnalyticsData', $analyticsData)
      ->withAdminScript('chart-library', [], '3.9.1')
      ->withAdminStyle('analytics-styles');
  }
}
```

### Settings Page with Tabs

```php
class SettingsPageController extends Controller
{
  public function index()
  {
    $currentTab = $_GET['tab'] ?? 'general';
    
    $view = $this->plugin
      ->view('admin.settings')
      ->withAdminScript('settings-tabs', ['jquery', 'jquery-ui-tabs'], '1.0.0')
      ->withAdminStyle('settings-style')
      ->with('currentTab', $currentTab);

    // Load tab-specific assets
    switch ($currentTab) {
      case 'advanced':
        $view->withAdminScript('advanced-settings', ['settings-tabs'], '1.0.0')
             ->withLocalizeScript('advanced-settings', 'AdvancedData', [
               'options' => $this->getAdvancedOptions(),
             ]);
        break;

      case 'integrations':
        $view->withAdminAppsScript('integrations-panel', true, 'IntegrationsData', [
          'apiKeys' => $this->getApiKeys(),
          'connectedServices' => $this->getConnectedServices(),
        ]);
        break;
    }

    return $view;
  }
}
```

### Form Builder

```php
class FormBuilderController extends Controller
{
  public function builder($formId = null)
  {
    $formData = $formId ? $this->getForm($formId) : $this->getDefaultForm();
    
    $builderConfig = [
      'form' => $formData,
      'fieldTypes' => $this->getAvailableFieldTypes(),
      'saveEndpoint' => rest_url('my-forms/v1/forms/' . $formId),
      'previewUrl' => home_url('form-preview/' . $formId),
      'nonce' => wp_create_nonce('wp_rest'),
      'locale' => get_locale(),
    ];

    return $this->plugin
      ->view('admin.form-builder')
      ->withAdminAppsScript('form-builder', true, 'FormBuilderConfig', $builderConfig)
      ->withAdminScript('drag-drop', ['jquery', 'jquery-ui-draggable', 'jquery-ui-droppable'], '1.0.0')
      ->withAdminStyle('form-builder-style')
      ->withInlineStyle('form-builder-style', '
        .form-builder-container {
          max-width: 1200px;
          margin: 0 auto;
        }
      ');
  }
}
```

### Media Library Extension

```php
class MediaLibraryController extends Controller
{
  public function enhancedUploader()
  {
    wp_enqueue_media(); // WordPress media library

    $uploaderConfig = [
      'allowedTypes' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
      'maxFileSize' => wp_max_upload_size(),
      'uploadUrl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('media-upload'),
      'strings' => [
        'uploading' => __('Uploading...', 'my-plugin'),
        'selectFiles' => __('Select Files', 'my-plugin'),
        'dropFiles' => __('Drop files here', 'my-plugin'),
      ],
    ];

    return $this->plugin
      ->view('admin.media-uploader')
      ->withAdminScript('enhanced-uploader', ['jquery', 'media-upload'], '1.0.0')
      ->withLocalizeScript('enhanced-uploader', 'UploaderConfig', $uploaderConfig)
      ->withAdminStyle('uploader-style')
      ->withInlineScript('enhanced-uploader', '
        jQuery(document).ready(function($) {
          $(".enhanced-uploader").initUploader(UploaderConfig);
        });
      ');
  }
}
```

## Best Practices

### 1. Version Your Assets

```php
// Use plugin version
->withAdminScript('my-script', [], $this->plugin->Version)

// Use file modification time for development
->withAdminScript('my-script', [], filemtime($scriptPath))

// Use false for WordPress version
->withAdminScript('my-script', [], false)
```

### 2. Minimize Dependencies

```php
// Good: Only necessary dependencies
->withAdminScript('my-script', ['jquery'], '1.0.0')

// Bad: Too many dependencies
->withAdminScript('my-script', ['jquery', 'jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-mouse'], '1.0.0')

// Better: Use a single jQuery UI dependency
->withAdminScript('my-script', ['jquery-ui-draggable'], '1.0.0')
```

### 3. Load Scripts in Footer

```php
// Load in footer (default and recommended)
->withScript('my-script', ['jquery'], '1.0.0', true)

// Load in header only if absolutely necessary
->withScript('critical-script', [], '1.0.0', false)
```

### 4. Group Related Assets

```php
// Good: Logical grouping
return $this->plugin
  ->view('admin.dashboard')
  // Vendor scripts
  ->withAdminScript('vendor-chart', [], '3.0.0')
  ->withAdminScript('vendor-datepicker', [], '2.0.0')
  // Plugin scripts
  ->withAdminScript('dashboard-utils', ['vendor-chart'], '1.0.0')
  ->withAdminScript('dashboard-main', ['dashboard-utils', 'vendor-datepicker'], '1.0.0')
  // Styles
  ->withAdminStyle('vendor-styles')
  ->withAdminStyle('dashboard-styles', ['vendor-styles']);
```

### 5. Secure Your Data

```php
// Always use nonces for AJAX
->withLocalizeScript('my-script', 'MyData', [
  'ajaxUrl' => admin_url('admin-ajax.php'),
  'nonce' => wp_create_nonce('my-action'),
  'userId' => get_current_user_id(),
])

// Never expose sensitive data
// Bad:
->withLocalizeScript('my-script', 'MyData', [
  'apiKey' => get_option('secret_api_key'), // Don't do this!
])
```

## Troubleshooting

### Script Not Loading

```php
// Check the path
error_log('Script path: ' . $this->plugin->js . '/my-script.js');

// Verify file exists
$scriptPath = $this->plugin->basePath . '/public/js/my-script.js';
if (!file_exists($scriptPath)) {
  error_log('Script file not found: ' . $scriptPath);
}
```

### React Bundle Not Working

```php
// Verify .asset.php file exists
$assetFile = $this->plugin->basePath . '/public/apps/my-app.asset.php';
if (!file_exists($assetFile)) {
  error_log('Asset file missing. Run: npm run build');
}

// Check the build output
$assetData = include $assetFile;
error_log('Dependencies: ' . print_r($assetData['dependencies'], true));
error_log('Version: ' . $assetData['version']);
```

---

For more information, see the [README.md](README.md) and [REFACTORING.md](../REFACTORING.md) files.
