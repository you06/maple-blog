(function() {
  $.ajax({
    url: '/api/article/1',
    type: 'GET',
    success: function(res) {
      $('#maple-article-content').html(res);
    }
  })
})()