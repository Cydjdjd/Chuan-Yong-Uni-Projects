from django.contrib import admin
from .models import *
# Register your models here.

class PrimaryInfosAdmin(admin.ModelAdmin):
    list_display = ('rank', 'id', 'name')


class SecondaryInfosAdmin(admin.ModelAdmin):
    list_display = ('platform','genre','year','publisher')


class SalesAdmin(admin.ModelAdmin):
    list_display = ('na_sale','eu_sale','jp_sale','other_sale','global_sale')


admin.site.register(Primary_info, PrimaryInfosAdmin)
admin.site.register(Secondary_info, SecondaryInfosAdmin)
admin.site.register(Sale, SalesAdmin)