<p align="center">
  <img src="https://github.com/wpbones/WPBones/assets/432181/13e0e825-9b0d-44c2-a77d-1baad88a1070" alt="WP Bones Logo" />
</p>

<p align="center">

  <a href="https://packagist.org/packages/wpbones/wpbones">
   <img src="https://poser.pugx.org/wpbones/wpbones/v/stable" alt="Latest Stable Version" />
  </a>
  
  <a href="https://packagist.org/packages/wpbones/wpbones">
   <img src="https://poser.pugx.org/wpbones/wpbones/downloads" alt="Total Downloads" />
  </a>

  <a href="https://packagist.org/packages/wpbones/wpbones">
   <img src="https://poser.pugx.org/wpbones/wpbones/license" alt="License" />
  </a>
  
  <a href="https://packagist.org/packages/wpbones/wpbones">
   <img src="https://poser.pugx.org/wpbones/wpbones/d/monthly" alt="Monthly Downloads" />
  </a>

</p>

WP Bones is a framework for WordPress written with Composer. You can use WPKirk repo as a boilerplate to create a plugin.

As you know, WordPress doesn't support Composer. So, I have used a little trick to fix this issue.

## Documentation

You'll find the [complete docs here](https://wpbones.vercel.app/).

## Requirement

### Composer

```sh
$ curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

### Nodes

```sh
$ sudo apt-get update && sudo apt-get install nodejs && sudo apt-get install npm
$ sudo apt-get install nodejs-legacy
```

### Package

In the `package.json`, there are the tools used to compile the assets. You can install them by running:

```sh
$ npm install
```

## I love Laravel

First of all, this framework and the boilerplate plugin are inspired by the [Laravel](http://laravel.com/) framework. Also, you will find a `bones` PHP shell executable like Laravel's `artisan`.
After cloning the repo, you can:

Display help

```sh
$ php bones
```

Change namespace

```sh
$ php bones namespace MyPluginName
```

The last command is very important. You can change the namespace at any time. However, I suggest you do this only the first time when the plugin is inactive.
After changing the namespace, you can start to develop your plugin. Your namespace will be `MyPluginName`.

## Documentation

You'll find the [complete docs here](https://wpbones.vercel.app/docs)
