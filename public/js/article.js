(function() {
  if (!window.routeParam['id']) {
    Router.jump('/index');
  }
  else {
    $.ajax({
      url: '/api/article/' + window.routeParam['id'] + '/info',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        var time = new Date(res.time);
        $('#maple-info-title').html(res.title);
        $('#maple-info-date').html(time.getFullYear() + '.' + (time.getMonth() + 1) + '.' + time.getDate());
        $('#maple-tags').html(res.tags.join(' '));
      }
    });
    $.ajax({
      url: '/api/article/' + window.routeParam['id'],
      type: 'GET',
      success: function(res) {
        $('#maple-article-content').html(res);
      }
    });
  }
})()