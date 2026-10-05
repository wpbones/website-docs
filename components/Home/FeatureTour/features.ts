/**
 * The tabs of the home page's feature tour. Every snippet is REAL: copied
 * from a boilerplate (WPKirk-*-Boilerplate, at 2.1.0) or from the docs, and
 * trimmed only by removing lines, each removal marked `// ...`. Nothing here
 * is rewritten, because the page shows it under the framework's name. Where
 * each one comes from is beside it.
 *
 * `command` is the `php bones` command that scaffolds one of the tab's files,
 * as the CLI defines it (WPBones/src/Console/bin/bones, line beside each),
 * and `scaffolds` names which. `say` is what the mascot says over the window.
 */

export type Lang = 'php' | 'blade' | 'tsx';

export interface FeatureFile {
  /** The path the tab shows, as in the plugin. */
  name: string;
  lang: Lang;
  code: string;
}

export interface Feature {
  id: string;
  /** The pill. */
  label: string;
  /** One sentence under the window. */
  blurb: string;
  /** The docs page for it (content/<path>.mdx exists). */
  href: string;
  command: string | null;
  /** What `command` writes, for the caption over it: "the controller". */
  scaffolds: string;
  /** What the mascot says while this tab is open. */
  say: string;
  files: FeatureFile[];
}

export const FEATURES: Feature[] = [
  {
    id: 'routing',
    label: 'Routing',
    blurb:
      'Admin menus are an array in config/menus.php, and each item routes to a controller method, as a Laravel route does.',
    href: '/docs/core-concepts/menus',
    // bones:1791, `make:controller`
    command: 'php bones make:controller MenuRouting/MenuRoutingController',
    scaffolds: 'the controller',
    say: 'A menu item is a route: it points at a controller.',
    files: [
      {
        // WPKirk-Routes-Boilerplate/config/menus.php, lines 1, 17-31 and 65-67
        name: 'config/menus.php',
        lang: 'php',
        code: `<?php
return [
  'wp_kirk_slug_menu' => [
    "page_title" => "WP Kirk Routes",
    "menu_title" => "WP Kirk Routes",
    'capability' => 'read',
    'icon' => 'wpbones-logo-menu.png',
    'items' => [
      [
        "page_title" => __('Menu Routing', 'wp-kirk'),
        "menu_title" => __('Menu Routing', 'wp-kirk'),
        'capability' => 'read',
        'route' => [
          'get' => 'MenuRouting\\MenuRoutingController@index'
        ],
      ],
// ...
    ]
  ]
];`,
      },
      {
        // WPKirk-Routes-Boilerplate/plugin/Http/Controllers/MenuRouting/MenuRoutingController.php,
        // lines 1-5, 11-20 and 48
        name: 'MenuRoutingController.php',
        lang: 'php',
        code: `<?php

namespace WPKirk\\Http\\Controllers\\MenuRouting;

use WPKirk\\Http\\Controllers\\Controller;
// ...
class MenuRoutingController extends Controller
{
  public function index()
  {
    return WPKirk()
      ->view('menu.index')
      ->withAdminStyle('prism')
      ->withAdminScript('prism')
      ->withAdminStyle('wp-kirk-common');
  }
  // ...
}`,
      },
    ],
  },
  {
    id: 'blade',
    label: 'Blade',
    blurb:
      'Views are Blade templates: a controller hands them data, and loops and echoes read the way they do in Laravel.',
    href: '/docs/views-template/blade-template',
    // bones:1791, `make:controller`
    command: 'php bones make:controller Dashboard/DashboardController',
    scaffolds: 'the controller',
    say: 'Data goes in from the controller, markup comes out of Blade.',
    files: [
      {
        // WPKirk-Blade-Boilerplate/resources/views/dashboard/index.blade.php, lines 12, 37-41 and 49
        name: 'dashboard/index.blade.php',
        lang: 'blade',
        code: `<div class="wp-kirk wrap wp-kirk-sample">
{{-- ... --}}
    @foreach ($books as $book)
    <p>Title: {{ $book['title'] }}</p>
    <p>Author: {{ $book['author'] }}</p>
    <p>Year: {{ $book['year'] }}</p>
    @endforeach
{{-- ... --}}
</div>`,
      },
      {
        // WPKirk-Blade-Boilerplate/plugin/Http/Controllers/Dashboard/DashboardController.php,
        // lines 11-14, 16-21 and 42-50; four of the five books removed
        name: 'DashboardController.php',
        lang: 'php',
        code: `class DashboardController extends Controller
{
  public function index()
  {
    $books = [
      [
        'title' => 'The Great Gatsby',
        'author' => 'F. Scott Fitzgerald',
        'year' => 1925
      ],
      // ...
    ];

    return WPKirk()
      ->view('dashboard.index', ['books' => $books])
      ->withAdminStyle('prism')
      ->withAdminScript('prism')
      ->withAdminStyle('wp-kirk-common');
  }
}`,
      },
    ],
  },
  {
    id: 'eloquent',
    label: 'Eloquent',
    blurb:
      'Eloquent models on the WordPress database, with its table prefix: the same queries you would write in Laravel.',
    href: '/docs/database-orm/eloquent-orm',
    // bones:1803, `make:eloquent-model`
    command: 'php bones make:eloquent-model EloquentProduct',
    scaffolds: 'the model',
    say: 'Eloquent, on the same database WordPress uses.',
    files: [
      {
        // WPKirk-Database-Boilerplate/plugin/Models/EloquentProduct.php; two docblocks dropped
        name: 'Models/EloquentProduct.php',
        lang: 'php',
        code: `<?php

namespace WPKirk\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use WPKirk\\WPBones\\Database\\DB;

class EloquentProduct extends Model
{
  public $timestamps = false;

  public function getTable(): string
  {
    return DB::getTableName('MyPluginProducts');
  }
}`,
      },
      {
        // WPKirk-Database-Boilerplate/resources/views/examples/eloquent.php, lines 76-81,
        // as the demo page shows and runs it
        name: 'Usage',
        lang: 'php',
        code: `use WPKirk\\Models\\EloquentProduct as Product;

Product::all()->each(function ($e) {
  var_dump($e->name);
});`,
      },
    ],
  },
  {
    id: 'migrations',
    label: 'Migrations',
    blurb:
      'Tables are created by migrations in database/migrations, with the charset and collation WordPress itself uses.',
    href: '/docs/database-orm/migrations',
    // bones:1765, `migrate:create`
    command: 'php bones migrate:create products',
    scaffolds: 'the migration',
    say: 'Your tables, versioned with your code.',
    files: [
      {
        // WPKirk-Database-Boilerplate/database/migrations/2015_12_12_134527_create_products_table.php,
        // lines 1-15 and 20-25
        name: 'create_products_table.php',
        lang: 'php',
        code: `<?php

use WPKirk\\WPBones\\Database\\Migrations\\Migration;

return new class extends Migration {
  public function up()
  {
    $this->create(
      'my_plugin_products',
      "(
         id bigint(20) unsigned NOT NULL auto_increment,
         user_id bigint(20) unsigned NOT NULL default '0',
         name varchar(20) NOT NULL default '',
         description varchar(20) NOT NULL default '',
         price bigint(20) unsigned NOT NULL default '0',
// ...
         PRIMARY KEY  (id),
         KEY user_id (user_id)
         ) {$this->charsetCollate};"
    );
  }
};`,
      },
    ],
  },
  {
    id: 'rest',
    label: 'REST API',
    blurb:
      'A route file per vendor and version under api/, and each route answers from a closure or a controller method.',
    href: '/docs/services-provider/rest-api',
    // bones:1779, `make:api`
    command: 'php bones make:api WPKirkV1Controller',
    scaffolds: 'the API controller',
    say: 'The folder names the namespace: this one is wpkirk/v1.',
    files: [
      {
        // WPKirk-API-Boilerplate/api/wpkirk/v1/route.php, lines 1-8 and 35-36
        name: 'api/wpkirk/v1/route.php',
        lang: 'php',
        code: `<?php

use WPKirk\\WPBones\\Routing\\API\\Route;

// very simple example
Route::get('/example', function () {
  return 'Hello World!';
});
// ...
// another way to use the same route for different methods
Route::request(['get', 'POST'], '/multiple', '\\WPKirk\\API\\WPKirkV1Controller@multiple');`,
      },
      {
        // WPKirk-API-Boilerplate/plugin/API/WPKirkV1Controller.php, lines 1-3, 11-15, 28-31 and 62
        name: 'API/WPKirkV1Controller.php',
        lang: 'php',
        code: `<?php

namespace WPKirk\\API;
// ...
use WP_REST_Response;
use WPKirk\\WPBones\\Routing\\API\\RestController;

class WPKirkV1Controller extends RestController
{
  // ...
  public function multiple(): WP_REST_Response
  {
    return $this->response(['multiple' => '1.0.0']);
  }
  // ...
}`,
      },
    ],
  },
  {
    id: 'ajax',
    label: 'Ajax',
    blurb:
      'An Ajax handler is a service provider: list its actions, set the capability, and register the class in config/plugin.php.',
    href: '/docs/services-provider/ajax',
    // bones:1775, `make:ajax`
    command: 'php bones make:ajax MyAjax',
    scaffolds: 'the Ajax provider',
    say: 'Each method is an action. The capability guards them all.',
    files: [
      {
        // WPKirk-TypeScript-Boilerplate/plugin/Ajax/MyAjax.php, lines 1-8, 15, 39, 55-60 and 106
        name: 'Ajax/MyAjax.php',
        lang: 'php',
        code: `<?php

namespace WPKirk\\Ajax;

use WPKirk\\WPBones\\Foundation\\WordPressAjaxServiceProvider as ServiceProvider;

class MyAjax extends ServiceProvider
{
  protected $trusted = ['trusted'];
  // ...
  protected $capability = 'manage_options';
  // ...
  public function trusted()
  {
    $response = 'You have clicked Ajax Trusted';

    wp_send_json($response);
  }
  // ...
}`,
      },
      {
        // WPKirk-TypeScript-Boilerplate/config/plugin.php, line 133
        name: 'config/plugin.php',
        lang: 'php',
        code: `  'ajax' => ['\\WPKirk\\Ajax\\MyAjax'],`,
      },
    ],
  },
  {
    id: 'cpt',
    label: 'Post types',
    blurb:
      'A custom post type is one class with its name, plural and supports, and a line in config/plugin.php registers it.',
    href: '/docs/services-provider/custom-post-types',
    // bones:1795, `make:cpt` (it asks for the ID, the name and the plural)
    command: 'php bones make:cpt MyCustomPostType',
    scaffolds: 'the post type',
    say: 'One class, and WordPress has a new post type.',
    files: [
      {
        // WPKirk-CPT-Boilerplate/plugin/CustomPostTypes/MyCustomPostType.php,
        // lines 1-8, 25, 33, 63, 124-128 and 249; docblocks dropped
        name: 'CustomPostTypes/MyCustomPostType.php',
        lang: 'php',
        code: `<?php

namespace WPKirk\\CustomPostTypes;

use WPKirk\\WPBones\\Foundation\\WordPressCustomPostTypeServiceProvider as ServiceProvider;

class MyCustomPostType extends ServiceProvider
{
  // ...
  protected $name = 'Starship';
  protected $plural = 'Starships';
  // ...
  protected $menuIcon = 'dashicons-universal-access-alt';
  // ...
  public function registerSupports($defaults)
  {
    // You may override this method
    return ['title', 'editor'];
  }
  // ...
}`,
      },
      {
        // WPKirk-CPT-Boilerplate/config/plugin.php, line 94
        name: 'config/plugin.php',
        lang: 'php',
        code: `  'custom_post_types' => ['\\WPKirk\\CustomPostTypes\\MyCustomPostType'],`,
      },
    ],
  },
  {
    id: 'react',
    label: 'React',
    blurb:
      'React and TypeScript apps in resources/assets/apps, built with @wordpress/scripts and enqueued by the controller that shows them.',
    href: '/docs/views-template/react-app',
    // bones:1783, `make:app <name> [--flat]`
    command: 'php bones make:app app --flat',
    scaffolds: 'the app',
    say: 'One call enqueues the app, its styles and its translations.',
    files: [
      {
        // WPKirk-Boilerplate/resources/assets/apps/app.tsx, lines 1-11 and 18-25
        name: 'assets/apps/app.tsx',
        lang: 'tsx',
        code: `import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { formatGreeting } from '../js/greet';

const App = () => {
  const greeting = formatGreeting(__('WP Bones', 'wp-kirk'));

  return (
    <section>
      <h2>{greeting}</h2>
      {/* ... */}
    </section>
  );
};

const container = document.getElementById('react-app');
if (container) {
  createRoot(container).render(<App />);
}`,
      },
      {
        // WPKirk-Boilerplate/plugin/Http/Controllers/Dashboard/DashboardController.php, lines 11-22
        name: 'DashboardController.php',
        lang: 'php',
        code: `class DashboardController extends Controller
{
  public function index()
  {
    return WPKirk()
      ->view('dashboard.index')
      ->withAdminStyle('prism')
      ->withAdminScript('prism')
      ->withAdminStyle('wp-kirk-common')
      ->withAdminAppsScript('app');
  }
}`,
      },
    ],
  },
];
