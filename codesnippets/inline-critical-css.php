<?php

    $cssupdate             = '20150330';
    $cssCookie             = wire('input')->cookie->csscached;
    $cssPath             = $config->paths->templates . 'assets/styles/';
    $cssFileMain         = $cssPath . 'main.css';
    $cssFileCritical     = $cssPath . 'critical.css';
?>
<?php if(isset($cssCookie) && $cssCookie == $cssupdate) : ?>
    <link rel="stylesheet" href="<?php echo $cssFileMain; ?>" /> <?php else : ?>
    <style>
        <?php include $cssFileCritical; ?>
    </style>
    <noscript>
        <link rel="stylesheet" href="<?php echo $cssFileMain; ?>" />
    </noscript>
    <script>
    (function (win, doc) {
        'use strict';
        function loadCSS(e){function t(){var e,n;for(n=0;n<l.length;n+=1)l[n].href&&l[n].href.indexOf(r.href)>-1&&(e=!0);e?r.media="all":win.setTimeout(t)}var r=doc.createElement("link"),n=doc.getElementsByTagName("script")[0],l=doc.styleSheets;return r.rel="stylesheet",r.href=e,r.media="only x",n.parentNode.insertBefore(r,n),t(),r}
        loadCSS('<?php echo $cssFileMain; ?>');
        doc.cookie = 'csscached=<?php echo $cssupdate; ?>;expires="Tue, 19 Jan 2038 03:14:07 GMT";path=/';
    }(this, this.document));
    </script>
<?php endif; ?>

<script>
  module.exports = function (grunt) {
    grunt.initConfig({
        paths: {
            src: "src/",
            srcAssets: "<%= paths.src %>assets/",
            srcStyles: "<%= paths.srcAssets %>styles/",
            tmpl: "htdocs/site/templates/",
            assets: "<%= paths.tmpl %>assets/",
            styles: "<%= paths.assets %>styles/",
        },

        criticalcss: {
            custom: {
                options: {
                    url: "http://localhost/mycoolproject/htdocs/",
                    ignoreConsole: true,
                    forceInclude: [".classes-that-need-to-be-included"],
                    width: 1200,
                    height: 900,
                    outputfile: "<%= paths.styles %>critical.css",
                    filename: "<%= paths.styles %>main.css",
                    buffer: 900 * 1200,
                },
            },
        },

        copy: {
            assets: {
                expand: true,
                cwd: "<%= paths.srcStyles %>",
                src: "*.{css}",
                dest: "<%= paths.styles %>",
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.registerTask("default", ["criticalcss", "copy:assets"]);
};
</script>
