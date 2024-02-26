<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <title>Angular Laravel App</title>
    <base href="/">
</head>
<body>
    <app-root></app-root>
    <script src="{{ asset('frontend/dist/frontend/runtime.js') }}" defer></script>
    <script src="{{ asset('frontend/dist/frontend/polyfills.js') }}" defer></script>
    <script src="{{ asset('frontend/dist/frontend/styles.js') }}" defer></script>
    <script src="{{ asset('frontend/dist/frontend/vendor.js') }}" defer></script>
    <script src="{{ asset('frontend/dist/frontend/main.js') }}" defer></script>
</body>
</html>
