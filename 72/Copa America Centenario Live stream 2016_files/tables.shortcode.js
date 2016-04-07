(function ($, app) {

    function calculateImages(table) {
        if (table.find('img:first').length > 0 && /firefox|trident|msie/i.test(navigator.userAgent)) {
            $.each(table.find('img'), function(index, el) {
                $img = $(this);
                if ($img.closest('td').width() > $img.width()) {
                    $img.css('max-width', $img.width());
                }
                $img.css('width', '100%');
            });
        }
    }

    $(document).ready(function () {
        $('.supsystic-table').each(function () {
            var table = $(this),
                currency = $.trim(table.data('currency-format')).replace(/^[\d\,\.\s]+|[\d\,\.\s]+$/, '');

            if (table.is(':visible')) {
                // Fix bug in FF and IE wich not supporting max-width 100% for images in td
                calculateImages(table);
            }

            table.css('table-layout', 'auto');
            var dataTableInstance = app.initializeTable(this);

            if (!table.data('head')) {
                table.find('th').removeClass('sorting sorting_asc sorting_desc sorting_disabled');
            }

            table.prevAll('.dataTables_length').appendTo(
                table.closest('.supsystic-tables-wrap')
                    .find('.supsystic-tables-features'));

            table.bind('column-visibility.dt draw.dt', function (e) {

                table.find('td, th').each(function () {
                    var color = /color\-([0-9abcdef]{6})/.exec(this.className),
                        background = /bg\-([0-9abcdef]{6})/.exec(this.className);

                    if (null !== color) {
                        $(this).css({color: '#' + color[1]});
                    }

                    if (null !== background) {
                        $(this).css({backgroundColor: '#' + background[1]});
                    }
                });
            });

            table.find('[data-cell-type="numeric"]').each(function(index, el) {
                $this = $(this);
                $this.text(numeral($this.text()).format($this.data('cell-format'), undefined, currency));
            });

            table.trigger('draw.dt');

            // Custom css
            var $css = $('#' + table.attr('id') + '-css');
            if ($css.length) {
                $('head').append($('<style/>').text($css.text()));
                $css.remove();
            }

            // This is used when table is hidden in tabs and can't calculate itself width to ajust on small screens
            if (!table.is(':visible')) {
                table.data('isVisible', setInterval(function(){
                    if (table.is(':visible')) {
                        clearInterval(table.data('isVisible'));
                        dataTableInstance.api().responsive.recalc();
                        calculateImages(table);
                    }
                }, 250));
            }
        });
    });

}(window.jQuery, window.supsystic.Tables));