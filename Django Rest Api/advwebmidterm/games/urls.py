from django.urls import include, path
from . import api
from . import views
from django.contrib import admin
from django.urls import path, reverse_lazy
from django.views.generic.base import RedirectView
from django.contrib.auth.decorators import login_required

urlpatterns = [path('admin/', admin.site.urls),
               path('',login_required(views.index)),
               path('games/', login_required(api.gamesListApiView.as_view())),
               path('games/<int:pk>/', login_required(api.gamesDetailApiView.as_view())),
               path('sort_rank/<int:sale_index>',login_required(api.sort_ranks)),
               path('games_range/<int:rank>/<int:range_used>',login_required(api.gamesRangeApiView.as_view())),
               path('get_by_filter/<str:category>/<int:index>',login_required(api.get_by_filter)),
               path('sort_alphabetically/<int:column_number>/<str:ascending>',login_required(api.sort_column_alphabetically))
               ]